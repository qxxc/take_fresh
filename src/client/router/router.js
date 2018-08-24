import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
import land from "./../components/pages/admin/land.vue";
import home from "./../components/pages/admin/home.vue";
import interViewInfo from "./../components/common/admin/interview_info.vue";
import createAction from "./../components/common/admin/create_action.vue";
import actionInfo from "./../components/common/admin/action_info.vue";
import a from "./../components/common/admin/a.vue";
import interview_apply from "./../components/common/admin/interview_apply.vue";
import next from "./../components/common/admin/next.vue";
import _info from "./../components/common/admin/_info.vue";

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { path: '/admin', component: land, children:[
      
    ]},
    {  path: '/admin/home', component: home,children:[
      { path: '/', component: actionInfo},
      { path: '/admin/home/createAction', component: createAction},
      { path: '/admin/home/interview', component:interViewInfo },
      { path: '/admin/home/a', component:a },
      { path: '/admin/home/interview_apply', component: interview_apply },
      { path: '/admin/home/next', component: next },
      { path: '/admin/home/_info', component: _info },
    ]},
  ]
})

export default router