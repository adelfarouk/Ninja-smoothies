<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>

            <div class="field" v-for="(ing, i) in ingredients" :key="i">
                <label for="ingredient">Add Ingredients</label>
                <input type="text" name="ingredient" v-model="ingredients[i]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>

            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        addSmoothie() {
            if(this.title) {
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => console.log(err))
            } else {
                this.feedback = 'You must enter a Title'
            }
        },
        addIng() {
            if(this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
            
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient !== ing
            })
        }
    }
}
</script>
}
<style>

.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
}
.add-smoothie .field {
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
- use (null) as initial value of variable (notice: not undefined :)
- don't forget naming (input)
- clever way in using (v-model="ingredients[i]"), can use v-model only with [prop in data()], but we need to display (actual ingredient), so we use (ingredients) in data(), and index from (v-for) :)
- use (tab.prevent) to prevent tab from moving to the next label, also use (submit.prevent) to prevent (form) from refreshing the page
- we displayed user ingredients in (input) to be able to edit it
- first thing when dealing with (DataBase) to import it where we need
- use npm_package (slugify) to create (slug), without needing to manual create it with JS
- slugify('string_to_slug', {object_with_some_slug_option})
$ npm install --save slugify
- any (delete_fn) must take pointer refers to thing to delete
- 

 */
</style>