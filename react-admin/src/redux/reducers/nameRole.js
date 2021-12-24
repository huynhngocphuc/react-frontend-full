import * as Types from './../../constants/ActionType';
let initialState = [];

const nameRole = (state = initialState, action) => {
    console.log(action.role);
    switch (action.type) {
        case Types.GET_NAMEROLE:
            state = action.role;
            return state;
        default: return state;
    }
};

export default nameRole;