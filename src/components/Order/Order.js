import React from 'react';

import classes from './Order.css';


const Order = (props) => {
    const ingredientsArry = []
    for(let nameIngredient in props.ingredients) {
        ingredientsArry.push({
            name: nameIngredient,
            amount: props.ingredients[nameIngredient]
        })
    }

    const ingredientsJsx = ingredientsArry.map(ingredient => {
        return (
            <span key={ingredient.name} style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'

            }}>{ingredient.name} ({ingredient.amount})</span>
        )
    })
    return(
        <div className={classes.Order}>
            <p>Ingridents: {ingredientsJsx}</p>
            <p>Toal price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default Order;