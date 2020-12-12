<template>
    <div v-if="this.smoothie" class="edit-smoothie container">
        <h2>Edit {{ smoothie.title }} smoothie</h2>

        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>

            <div class="field" v-for="(ing, i) in smoothie.ingredients" :key="i">
                <label for="ingredient">Add Ingredients</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[i]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="editIng" v-model="another">
            </div>

            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        editIng() {
            if(this.another) {
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
            
        },
        editSmoothie() {
            if(this.smoothie.title) {
                this.feedback = null
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => console.log(err))
            } else {
                this.smoothie.feedback = 'You must enter a Title'
            }
        },
        deleteIng(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient !== ing
            })
        }
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {  // snapshot is array of objects!
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>

.edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
}
.edit-smoothie .field {
    margin: 20px auto;
    position: relative;
}
.delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
}
/* 
- Remember how could i got router_parameters:
    this.$route.params.some_parameter
- we store quered database with (where) in variable (ref), to deal with it later
  - then use (.get()) to get all (documents) from (firestore)
  - then (forEach) in all of them for (data()) which have all needed_data
- whatever comes from (firestore), we will (foreEach) in it, for (data())
- doc.data() -> here is an object! <= Notice
- (id) isn't in (data()), but in (doc) itself
- use (v-if="this.smoothie"), cz {{ this.smoothie }} in <template> will executed before (let ref = db.collection('smoothies')....) <= it take some time
 - so, some error occured, and we use (v-if)
- notice: (@keydown) need one (tab) to display last item inserted!
- we can use [.doc(id)] to grab single_record (document in firestore)

 */
</style>