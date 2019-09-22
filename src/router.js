import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RsvpStart from './views/rsvp/RsvpStart.vue'
import RsvpWho from './views/rsvp/RsvpWho.vue'
import RsvpFood from './views/rsvp/RsvpFood.vue'
import RsvpChoose from './views/rsvp/RsvpChoose.vue'
import RsvpPayment from './views/rsvp/RsvpPayment.vue'
import RsvpThanks from './views/rsvp/RsvpThanks.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rsvp',
      name: 'rsvp',
      component: RsvpStart
    },
    {
      path: '/rsvp/who',
      name: 'rsvp-who',
      component: RsvpWho,
      props: true
    },
    {
      path: '/rsvp/food',
      name: 'rsvp-food',
      component: RsvpFood,
      props: true
    },
    {
      path: '/rsvp/choose-your-adventure',
      name: 'rsvp-choose',
      component: RsvpChoose,
      props: true
    },
    {
      path: '/rsvp/payment',
      name: 'rsvp-payment',
      component: RsvpPayment,
      props: true
    },
    {
      path: '/rsvp/thanks',
      name: 'rsvp-thanks',
      component: RsvpThanks,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
