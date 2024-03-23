import { createRouter,createWebHistory } from "vue-router";
// import Home from "../pages/Home.vue";
import Home from "../pages/Home.vue";

const routes=[
    {
        path:'/',
        component:Home
    }
]

const Router=createRouter({
    history:createWebHistory(),
    routes
}
)

export default Router;