import React, {useEffect} from 'react';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
const orders = props => {

    useEffect(() => {
        props.onIntialOrder(props.token,props.userId);
    }, [])

        return (
            <div>
                {
                    props.orders.map(order => {
                        return <Order ingredients={order.ingredients}  price={order.price.toFixed(2)} key={order.id}/>
                    })
                }
            </div>
        )
    
}

const mapDisptchToProps = dispatch => {
    return {
        onIntialOrder : (token, userId) => dispatch(actions.intialOrders(token, userId))
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
export default connect(mapStateToProps, mapDisptchToProps)(orders);