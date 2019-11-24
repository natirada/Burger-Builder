import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngriedent = (name) => {
    return {
        type: actionTypes.ADD_INGRIEDENT,
        ingriedentName: name
    }
}

export const removeIngriedent = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIEDENT,
        ingriedentName: name
    }
}

export const initIngriedents = () => {
    return dispatch => {
        
         axios.get('/Ingredients.json')
        .then(response => {
           dispatch(setIngredients(response.data)); 
        }).catch(() => {
            dispatch(initIngredientsFailed());
        })
    }
}



const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGRIEDENT,
        initIngredients: ingredients
    }
}
export const initIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGRIEDENT_FAILED
    }
}