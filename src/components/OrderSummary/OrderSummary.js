import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {

 
    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(IEkey => {
            return (
                <li key={IEkey}><span style={{textTransform: 'capitalize'}}>{IEkey}</span> : {this.props.ingredients[IEkey]}</li>
            );
        });
    
       return (
           <Aux>
               <h3>Your Order </h3>
               <p>A delicious burger with the following ingredients: </p>
                <ul>
                  {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalprice.toFixed(2)}$</strong></p>
               <p>You want to continue to cheakout ?</p>
                 <Button typebutton="Success" clicked={this.props.clickBackdrop}>CANCEL</Button>
                 <Button typebutton="Danger"  clicked={this.props.clickContinueOrder}>CONTINUE</Button>
           </Aux>
       );
    }
};

export default OrderSummary;