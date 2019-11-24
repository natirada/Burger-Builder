import * as actionTypes from '../actions/actionTypes';

const intialState = {
    ingredients: null,
    totalPrice: 5,
    loading: false,
    building: false
}


const INGREDIENTS_PRICE = {
    meat: 3.7,
    saled: 0.5,
    bacon: 1.5,
    cheese: 2.2
};


const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGRIEDENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingriedentName]:  state.ingredients[action.ingriedentName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingriedentName],
                building: true
            }
        case actionTypes.REMOVE_INGRIEDENT:
                return{
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingriedentName]:  state.ingredients[action.ingriedentName] - 1
                    },
                    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingriedentName],
                    building: true
                }
        case actionTypes.SET_INGRIEDENT:
            return {
                ...state,
                ingredients: {
                    ...action.initIngredients
                },
                loading: true,
                totalPrice: 5,
                building: false
            }        
        default:
            break;
    }
    return state;
}


export default reducer;