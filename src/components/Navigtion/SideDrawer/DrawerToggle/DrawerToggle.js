import React from 'react';

import classes from './DrawerToggle.css';

const drwerToggle = (props) => {
    return(
      <div className={classes.DrawerToggle} onClick={props.clickMenu}>
            <div></div>
            <div></div>
            <div></div>
      </div>
      ) 
};

export default drwerToggle;