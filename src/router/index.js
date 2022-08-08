import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/music'
    },
    {
        path: '/music',
        // component: () => import('../pages/Music'),
        component: () => import('../pages/Common'),
        redirect: '/music/playList',
        children: [
            {
                name: 'playList',
                path: '/music/playList',
                component: () => import('../pages/PlayList'),
                meta: {
                    keepAlive:true
                }
            },
            {
                name: 'topList',
                path: '/music/topList',
                component: () => import('../pages/TopList'),
                meta: {
                    keepAlive:false
                }
            },
            {
                name: 'search',
                path: '/music/search',
                component: () => import('../pages/Search'),
                meta: {
                    keepAlive:true
                }
            },
            // 我的歌单
            {
                name: 'myList',
                path: '/music/myList',
                component: () => import('../pages/MyList'),
                meta: {
                    keepAlive:true
                }
            },
            {
                name: 'historyList',
                path: '/music/historyList',
                component: () => import('../pages/HistoryList'),
                meta: {
                    keepAlive:true
                }
            },
            {
                name: 'comment',
                path: '/music/comment/:id',
                component: () => import('../pages/Comment'),
                meta: {
                    keepAlive:true
                }
            },
            {
                //歌单详情
                path: '/music/details/:id',
                component: () => import('../pages/Details'),
                meta: {
                    // keepAlive:false
                }
            },
            {
                //建站日志
                path: '/music/log',
                component: () => import('../pages/Log'),
                meta: {
                    // keepAlive:false
                }
            }
        ]
    }
]
export default new Router({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes
})