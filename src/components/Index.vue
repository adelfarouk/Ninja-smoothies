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
            this.smoothies = this.smoothies.filter(smoothie => {
                return smoothie.id !== id
            })
        }
    },
    created() {
        db.collection('smoothies').get()
        .then(snapshots => {
            snapshots.forEach(doc => {
                this.smoothies.push(doc.data());
                this.smoothies.id = doc.id;
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
 - install (firebase) by (npm): $ npm install firebase@4.13   [version of course]
 - may need (--save), if i don't have (npm_version) which save automatically


<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCHlwR0Hgbngfb3L48totQGnOq_mJCN_iQ",
    authDomain: "vue-firestore-34145.firebaseapp.com",
    projectId: "vue-firestore-34145",
    storageBucket: "vue-firestore-34145.appspot.com",
    messagingSenderId: "128538759283",
    appId: "1:128538759283:web:af521ec2a32cfca3235a06"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


*/
</style>