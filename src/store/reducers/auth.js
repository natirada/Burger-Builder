import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility';



const intialState = {
    token: null,
    userId: null,
    error: false,
    errorMessage: null,
    loading: false,
    redirectAuthPath: '/'
}

const authStart = (state) => {
    return updateObject(state,{loading: true,error: false });
}

const authSuccess = (state ,action) => {
    return updateObject(state, {token: action.token , userId: action.userId, loading: false});
}

const authFail = (state, action) => {
    return updateObject(state, {errorMessage: action.error,error: true, loading: false});
}

const authLogout = (state) => {
    return updateObject(state,{token: null,userId: null})
}
const redirectAuthPath = (state, action) => {
    return updateObject(state, {redirectAuthPath: action.path})
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
           return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return  authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state);
        case actionTypes.REDIRECT_AUTH_PATH:
            return redirectAuthPath(state, action);
        default:
            return state;
    }
}

export default reducer;