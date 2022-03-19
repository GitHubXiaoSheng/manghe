
const Main = resolve => require(["@/view/Main.vue"], resolve);
const HelloWorld = resolve => require(["@/components/HelloWorld.vue"], resolve);
const test = resolve => require(["@/view/test.vue"], resolve);
const testB = resolve => require(["@/view/B.vue"], resolve);

const router = [
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/404',
        name: '404',
        component: HelloWorld,
        meta: {
        }
    },
    {
        path: '/test',
        name: 'test',
        component: test,
        children: [
            {
                name: 'A',
                path: '/testA',
                component: test,
                meta: {
                    title: 'A页面',
                    guard: false
                }
            },
            {
                name: 'B',
                path: '/testB',
                component: testB,
                meta: {
                    title: 'A页面',
                    guard: false
                }
            }
        ]
    },
]
export default router;