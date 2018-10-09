import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
import admin_land from "./../components/pages/admin/land.vue";
import admin_home from "./../components/pages/admin/home.vue";
import admin_interViewInfo from "./../components/common/admin/interview_info.vue";
import admin_createAction from "./../components/common/admin/create_action.vue";
import admin_actionInfo from "./../components/common/admin/action_info.vue";
import admin_a from "./../components/common/admin/a.vue";
import admin_interview_apply from "./../components/common/admin/interview_apply.vue";
import admin_next from "./../components/common/admin/next.vue";
import admin__info from "./../components/common/admin/_info.vue";

import interviewer_land from "./../components/pages/interviewer/land.vue";
import inter_wait from "./../components/common/interviewer/inter_wait.vue";
import interview from "./../components/common/interviewer/interview.vue";
import interviewing from "./../components/common/interviewer/interviewing.vue";
import interview_result from "./../components/common/interviewer/interview_result.vue";

import user_land from "./../components/pages/user/land.vue";
import user_login from "./../components/common/user/login";
import user_resgiter from "./../components/common/user/resgiter";
import user_enter from "./../components/common/user/enter";
import user_information from "./../components/common/user/information";
Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { path: '/admin', component: admin_land,},
    {  path: '/admin/home', component:admin_home,children:[
      { path: '/', component: admin_actionInfo},
      { path: '/admin/home/createAction', component: admin_createAction},
      { path: '/admin/home/interview', component:admin_interViewInfo },
      { path: '/admin/home/a', component:admin_a },
      { path: '/admin/home/interview_apply', component: admin_interview_apply },
      { path: '/admin/home/next', component: admin_next },
      { path: '/admin/home/_info', component:admin__info },
    ]},
    {
      path: '/inter', component: interviewer_land,children:[
        { path: '/' ,component:inter_wait},
        { path: '/inter/interview', component: interview},
        { path: '/inter/interviewing',name:'interviewing', component: interviewing},
        { path: '/inter/interview_result', component: interview_result},
      ]
    },
    {
      path: '/user', component: user_land,children:[
        {path: '/', component: user_login},
        { path: '/user/resgiter', component: user_resgiter},
        { path: '/user/enter', component: user_enter},
        { path: '/user/information', component: user_information}
      ]
    }
  ]
})

export default router