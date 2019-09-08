
var state = {};

function next(model) {
    state = { 
        ...state, 
        ...model 
    };
}


export default {
    state,
    next   
};