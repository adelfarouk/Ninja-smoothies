import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
})

/*
- notice: path should starts with (/) => /add-smoothie
- Once i create new_comp, and give it a path in (router/index.js), it will be displayed automatically in (App.vue) by <router-view>
- NOTICE: can't use (-) in parameters in (router/index.js)
  like (:smoothie-slug) this will not work!

*/