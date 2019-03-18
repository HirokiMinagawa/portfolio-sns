import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import UserInfo from "./views/UserInfo.vue";
import UserInfoEdit from "./views/UserInfoEdit.vue";
import PortfolioCreate from "./views/PortfolioCreate.vue"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/user/:userId",
      name: "UserInfo",
      component: UserInfo
    },
    {
      path: "/user/:userId/edit",
      name: "UserInfoEdit",
      component: UserInfoEdit
    },
    {
      path: "/portfolio/new",
      name: "PortfolioCreate",
      component: PortfolioCreate
    }
  ]
});
