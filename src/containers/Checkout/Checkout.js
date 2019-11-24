import React, {} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContentData from './ContentData/ContentData';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
const checkout = props => {

    const clickCancelHandler = ()=> {
        props.history.goBack();
    }
 
    const clickContinueHandler = () => {
        props.history.replace('/checkout/content');
    }

        let summary = <Redirect to="/"/>
        if(props.ingredients) {
            const purchaseRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = 
            (
                <div>
                  {purchaseRedirect}  
                <CheckoutSummary  
                        price={props.price} 
                        ingredients={props.ingredients} 
                        clickCancel={clickCancelHandler} 
                        clickContinue={clickContinueHandler}/>
                <Route 
                    path={props.match.path + '/content'}  
                     component= {ContentData} 
                    />
            </div>
            )
        }
        return(
            summary
        )
    
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(withRouter(checkout));