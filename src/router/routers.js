import Layout from '../layout/_Layout.vue';
import Login from '../components/login/Login.vue';
import Members from '../components/member/members.vue';

// 各個路由的網址及代號以及要顯示的內容
const routes = [
  {
    path: '/Layout',
    name: 'Layout',
    component: Layout,
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      { path: 'members', components: { meunArea: Members } }

    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }
];
export default routes;
