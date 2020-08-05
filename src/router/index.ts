import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Template.vue"),
    children: [
      {
        path: "",
        name: "Usuarios ID",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Usuarios.vue"),
      },
      {
        path: ":id",
        name: "Usuarios ID",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/UsuariosID.vue"),
      },
    ],
  },

  {
    path: "/produtos",
    name: "Produtos",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Produtos.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
