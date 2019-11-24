import React from 'react';
import classes from './Button.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const button = (props) => {
    return(
        <Aux>
           <button 
              className={[classes.Button, classes[props.typebutton]].join(" ")} 
              onClick={props.clicked}
              disabled={props.disabled}
              type={props.type}
              >
              {props.children} </button>
        </Aux>
    )
};

export default button;