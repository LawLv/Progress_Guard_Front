import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/project',
    children: [
      {
        path: 'project',
        component: () => import('@/views/Project/index'),
        name: 'project',
        meta: { title: 'Project', icon: 'el-icon-s-management', affix: true }
      },
      {
        path: 'project/oneproject',
        component: () => import('@/views/Project/oneproject'),
        name: 'oneproject',
        meta: { title: 'Project', noCache: true, activeMenu: '/project' },
        hidden: true
      },
      {
        path: 'project/create',
        component: () => import('@/views/Project/create'),
        name: 'create',
        meta: { title: 'Project', noCache: true, activeMenu: '/project' },
        hidden: true
      },
      {
        path: 'project/edit',
        component: () => import('@/views/Project/edit'),
        name: 'edit',
        meta: { title: 'Project', noCache: true, activeMenu: '/project' },
        hidden: true
      },
      {
        path: 'project/chatbot',
        component: () => import('@/views/Project/chatbot'),
        name: 'chatbot',
        meta: { title: 'Project', noCache: true, activeMenu: '/project' },
        hidden: true
      }
    ]
  },
  {
    path: '/Test',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Test/index'),
        name: 'Test',
        meta: { title: 'Test', icon: 'list', affix: true }
      }
    ]
  },
  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   redirect: '/dashboard/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'dashboard',
  //       meta: { title: 'dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/chatroom',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/chatroom/index'),
        name: 'chatroom',
        meta: { title: 'Chat room', icon: 'message', affix: true }
      }
    ]
  },
  
  // {
  //   path: '/Task',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/Task/index'),
  //       name: 'Task',
  //       meta: { title: 'Task', icon: 'list', affix: true }
  //     }
  //   ]
  // },

  {
    path: '/Task',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Task/index'),
        name: 'Task',
        meta: { title: 'Task', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
