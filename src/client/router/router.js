import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
import land from "./../components/pages/land.vue";
import home from "./../components/pages/home.vue";
import interViewInfo from "./../components/common/interview_info.vue";
import createAction from "./../components/common/create_action.vue";
import actionInfo from "./../components/common/action_info.vue";
import a from "./../components/common/a.vue";

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { name: '/', path: '/', component: land },
    {  path: '/home', component: home,children:[
      { path: '/', component: actionInfo},
      { path: '/createAction', component: createAction},
      { path: '/interview', component:interViewInfo },
      { path: '/a', component:a }
    ]}
  ]
})

export default router