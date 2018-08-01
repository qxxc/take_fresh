import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
import land from "./../components/pages/land.vue";
import home from "./../components/pages/home.vue";
import interViewInfo from "./../components/common/interview_info.vue";

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { name: '/', path: '/', component: land },
    { name: '/home', path: '/home', component: home,children:[
      
    ]}
  ]
})

export default router