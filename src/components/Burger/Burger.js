
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (prop) => {
    const price = prop.totalPrice;
    let transfromIngredient = Object.keys(prop.ingredients).map(Ikey => {
        return [...Array(prop.ingredients[Ikey])].map((_,indexKey) => {
            return <BurgerIngredient type={Ikey} key={Ikey+indexKey}/>
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    },[]);;
    if(transfromIngredient.length === 0)
    transfromIngredient = <p>Plaese start to add ingredient</p>
   return(
       <div className={classes.Burger}>
           <BurgerIngredient type="bread-top"/>
            {transfromIngredient}
           <BurgerIngredient type="bread-buttom"/>
           <p>Total Price: {price.toFixed(2)} $</p>
       </div>
   );
}

export default Burger;