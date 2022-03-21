
const Main = resolve => require(["@/view/Main.vue"], resolve);
const A404 = resolve => require(["@/components/404.vue"], resolve);


const Home = resolve => require(["@/view/Home.vue"], resolve);

const router = [
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/404',
        name: '404',
        component: A404,
        meta: {
        }
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                }
            },

        ]
    },
]
export default router;