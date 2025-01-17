import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// import LoginView from '@/views/LoginView.vue'
import FreightCompanies from '@/views/FreightCompanies.vue'
import FreightOrders from '@/components/FreightOrders.vue'
import Warehouses from '@/components/Warehouses.vue'
import FreightTracking from '@/components/FreightTracking.vue'
// import SignUpForm from '@/components/SignUpForm.vue'
// import Users from '@/components/Users.vue'
import Billing from '@/components/Billing.vue'
import Files from '@/components/Files.vue'
import RealTime from '@/components/RealTime.vue'
import Orders from '@/components/Orders.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/freight_companies',
          name: 'Freight Companies',
          component: FreightCompanies
        },
        {
          path: '/freight',
          name: 'Freight Orders',
          component: FreightOrders
        },
        {
          path: '/warehouses',
          name: 'Warehouses',
          component: Warehouses
        },
        {
          path: '/freight_tracking',
          name: 'Freight Tracking',
          component: FreightTracking
        },
        {
          path: '/billing',
          name: 'billing',
          component: Billing
        },
        //{
        //  path: '/users',
        //  name: 'users',
        //  component: Users
        //},
        {
          path: '/files',
          name: 'files',
          component: Files
        },
        {
          path: '/realtime',
          name: 'Realtime data',
          component: RealTime
        },
        {
          path: '/orders',
          name: 'ordering',
          component: Orders
        }
      ]
    },
    //{
    //  path: '/login',
    //  name: 'login',
    //  component: LoginView,
    //},
    //{
    //  path: '/sign-up',
    //  name: 'sign-up',
    //  component: SignUpForm,
    //}
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
  ],
})

export default router
