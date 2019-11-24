import React from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

const brgerIngredient = props => {

    
        let ingredient = null;
        switch(props.type)
        {
            case('bread-buttom'):
               ingredient = <div className={classes.BreadBottom}></div>;
               break;
            case('bread-top'):
               ingredient = (
                       <div className={classes.BreadTop}>
                           <div className={classes.Seeds1}></div>
                           <div className={classes.Seeds2}></div>
                       </div>);
               break;
            case('meat'):
              ingredient = <div className={classes.Meat}></div>;
              break;
            case('cheese'):
              ingredient = <div className={classes.Cheese}></div>;
              break;
            case('saled'):
              ingredient = <div className={classes.Salad}></div>;
              break;
            case('bacon'):
              ingredient = <div className={classes.Bacon}></div>;
              break;
            default:
                  ingredient = null;
                  break;
        }
        return ingredient;
    

}

brgerIngredient.props = {
    type: PropTypes.string.isRequired
}

export default brgerIngredient;