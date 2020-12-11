<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">

                <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>

                <h2 class="indigo-text">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                        <span class="chip">{{ ing }}</span>
                    </li>
                </ul>
            </div>
            
            <!-- Edit button -->
            <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug }}">
                    <i class="material-icons edit">edit</i>
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'index',
    data () {
        return {
            smoothies: []
        }
    },
    methods: {
        deleteSmoothie(id) {
            db.collection('smoothies').doc(id).delete()
            .then(() => {
                this.smoothies = this.smoothies.filter(smoothie => {
                return smoothie.id !== id
                })
            })
        }
    },
    created() {
        db.collection('smoothies').get()
        .then(snapshots => {
            snapshots.forEach(doc => {
                let smoothie = doc.data()
                smoothie.id = doc.id
                this.smoothies.push(smoothie)
                
            })
        })
    }
}




</script>

<style>
.index {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin-top: 60px;
}
.index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
}
.index .ingredients {
    margin: 30px auto;
}
.index .ingredients li {
    display: inline-block;
}
.delete {
    position: absolute;
    top: 7px;
    right: 7px;
    color: #aaa;
    cursor: pointer;
}

/*
- slug: will use as (URL)version of (title)
- almost of classes here is from (materialize)
- i loop through (smoothies), then use each (smoothie) info to display in proper way.
- to add google-icons, must add class="material-icons" in <i>, and word inside it!
- when i forget (return) in (deleteSmoothie), all items deleted!
- the problem here with array_as_database is the deleted items back again when refresh the page
  but i don't want this, so we need (firebase)
- create new-project in (firebase) easily, down to (admin-panel)

- we connect to (firebase) by making firebase_dir inside (src):
 - init.js: contain firebase_variable from firebase_project to configure App
 - may need (--save), if i don't have (npm_version) which save automatically

- this approach will del item from front first, cz (db) return promise,
    and take sometimes!
deleteSmoothie(id) {
    db.collection('smoothies').doc(id).delete()
    this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.id !== id
    })
}
-> but in better way we can do this:
deleteSmoothie(id) {
    db.collection('smoothies').doc(id).delete()
    .then(() => {
        this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.id !== id
        })
})
- if (firestore) has multiple (documents), he back them in array, so can use (forEach)
- 
*/
</style>