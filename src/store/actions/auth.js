import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogut =() => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiresDate')
    localStorage.removeItem('localId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
const logout= (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogut());
        }, expiresIn*1000)
    }
}
export const auth = (email, password, isSingup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWhu05pZL2iCvIcGVEqsAN1N6Hsvs8uo4';
        if(!isSingup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWhu05pZL2iCvIcGVEqsAN1N6Hsvs8uo4'
        }
        axios.post(url,authData)
        .then(response => {
            const expiresDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expiresDate',expiresDate);
            localStorage.setItem('localId', response.data.localId)

            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(logout(+response.data.expiresIn))
        }).catch(error => {
            dispatch(authFail(error.response.data.error.message))
        })
    }
}



export const redirectAuthPath = (path) => {
    return {
        type: actionTypes.REDIRECT_AUTH_PATH,
        path: path
    }
}


export const authCheckState = () => {
   return dispatch => {
         const token = localStorage.getItem('token');
         if(token !== null)
         {
            const expiresDate = new Date(localStorage.getItem('expiresDate'));
            const cuurentDate = new Date();
            if(expiresDate > cuurentDate) {
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(token, localId))
                dispatch(logout( (expiresDate.getTime() - new Date().getTime())/1000 ))
            } else {
                dispatch(authLogut());
            }           
         } else {
            dispatch(authLogut());
         } 
         
    }
}