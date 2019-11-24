import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
//import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return(
        <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h3 >I hope it's tasty: </h3>
            <Burger ingredients={props.ingredients} totalPrice={props.price}/>
            <Button typebutton="Danger" clicked={props.clickCancel}>CANCEL</Button>
            <Button typebutton="Success" clicked={props.clickContinue}>CONTINUE</Button>
        </div>
    )
};

export default checkoutSummary;