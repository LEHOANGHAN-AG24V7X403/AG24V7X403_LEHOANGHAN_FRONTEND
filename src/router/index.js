import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/contacts/add",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem("user");

    if (requiresAuth && !isAuthenticated) {
        // Chưa đăng nhập -> Chuyển về Login
        next({ name: "login" });
    } else if (to.name === "login" && isAuthenticated) {
        // Đã đăng nhập  -> Chuyển về Danh bạ
        next({ name: "contactbook" });
    } else {
        next();
    }
});

export default router;