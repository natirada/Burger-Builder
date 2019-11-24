import React from 'react';
import classes from './BuildControl.css';

const buildControl = (prop) => {
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{prop.label}</div>
            <button className={classes.Less} onClick={() => prop.clickLess(prop.type)} disabled={prop.view}>Less</button>
            <button className={classes.More} onClick={() => prop.clickMore(prop.type)} >More</button>
        </div>
    );
}

export default buildControl;