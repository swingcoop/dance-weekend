import store from 'store2';

const storeKey = 'corvallis-swing-weekend-2020-rsvp-state'
var state = store(storeKey) || {};
var router = null;

/* eslint-disable */
function next(model) {
    state = { 
        ...state, 
        ...model 
    };

    store(storeKey, state);
    // console.log(state);
    
    // Navigate based on route + state
    var route = router.currentRoute;
    switch (route.name) {
        case 'rsvp':
            to('rsvp-who');
            break;
        case 'rsvp-who':
            to('rsvp-food');
            break;
        case 'rsvp-food':
            to('rsvp-choose');
            break;
        case 'rsvp-choose':
            if (state.residency === 'no') {
                to('rsvp-travel');
            }
            else if (state.hostingInterest) {
                to('rsvp-host');
            }
            else {
                to('rsvp-payment');
            }
            break;
        case 'rsvp-travel':
        case 'rsvp-host':
            to('rsvp-payment');
            break;
        case 'rsvp-payment':
            to('rsvp-thanks');
            break;
    }
}

function to(routeName) {
    router.push({ name: routeName, params: state});
}

function use(vueRouter) {
    router = vueRouter;
}

function finish() {
    // Clear out storage
    store(storeKey, {});
}

export default {
    finish,
    next,
    state() {
        return store(storeKey);
    },
    use
};