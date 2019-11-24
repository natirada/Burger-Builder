import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label: 'Meat' , type: 'meat'},
    {label: 'Cheese' , type: 'cheese'},
    {label: 'Saled' , type: 'saled'},
    {label: 'Bacon' , type: 'bacon'}
]
const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            {
                controls.map( control => (
                    <BuildControl 
                       key={control.label} 
                       label={control.label} 
                       type={control.type} 
                       clickMore={props.addIngredient} 
                       clickLess={props.removeIngredient}
                       view={props.display[control.type]}/>
                ))
            }
            <button 
               className={classes.OrderButton} 
               disabled={!props.purchaseable}
               onClick={props.clickorder}>{props.isAuth ? 'ORDER NOW': 'SIGN IN TO ORDER'}</button>
        </div>
    );
}

export default buildControls;