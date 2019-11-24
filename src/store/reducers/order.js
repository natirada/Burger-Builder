import * as actionTypes from '../actions/actionTypes';


const initState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
    
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat({
                    ...action.orderdata,
                    id: action.id,
                   
                })
            }
        case actionTypes.PURCHASE_BURGER_START:
           return {
                ...state,
                loading: true
            }
        case actionTypes.INIT_PURCHASED:
            return {
                ...state,
                purchased:false
            }
        case actionTypes.INIT_ORDERS:
            return {
                ...state,
                orders: [
                    ...action.intOrders
                ]
            }            
        default:
            return state;
    }
}

export default reducer;