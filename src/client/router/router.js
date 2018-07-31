import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
import land from "./../components/land.vue";

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { name: '/', path: '/', component: land }
  ]
})

export default router