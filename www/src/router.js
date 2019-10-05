import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RsvpStart from './views/rsvp/RsvpStart.vue'
import RsvpWho from './views/rsvp/RsvpWho.vue'
import RsvpFood from './views/rsvp/RsvpFood.vue'
import RsvpChoose from './views/rsvp/RsvpChoose.vue'
import RsvpHost from './views/rsvp/RsvpHost.vue'
import RsvpTravel from './views/rsvp/RsvpTravel.vue'
import RsvpPayment from './views/rsvp/RsvpPayment.vue'
import RsvpThanks from './views/rsvp/RsvpThanks.vue'

Vue.use(Router)

var router = new Router({
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
      path: '/rsvp/travel',
      name: 'rsvp-travel',
      component: RsvpTravel,
      props: true
    },
    {
      path: '/rsvp/host',
      name: 'rsvp-host',
      component: RsvpHost,
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
  ],

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// router.beforeEach((to, from, next) => {
//   // to.params = from.params;
//   // eslint-disable-next-line
//   // console.log(from);
//   // eslint-disable-next-line
//   console.log('ok');
//   next({ name: to.name, params: from.params });
// });

export default router;
