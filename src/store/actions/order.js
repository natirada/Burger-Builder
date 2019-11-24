import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

const purchaseBurgerSuccess = (id, order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderdata: order,
        id: id
    }

}
const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
        
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASED
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => dispatch(purchaseBurgerFail(error)) );
    }
}


export const initPurchased = () => {
    return dispatch => {
        dispatch(initPurchase()) 
    }
}

export const intialOrders = (token, userId) => {
    return dispatch => {
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParam)
        .then(response => {
            const orderFetchingData = [];
            for(let key in response.data) {
                orderFetchingData.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(initOrders(orderFetchingData));
        }).catch(error => console.log(error))
    }
}


const initOrders = (orders) => {
    return {
        type: actionTypes.INIT_ORDERS,
        intOrders: orders
    }
}