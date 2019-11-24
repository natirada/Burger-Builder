import React from 'react';
import ImageLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.css';

const logo = () => {
    return(
    <div className={classes.Logo}>
         <img src={ImageLogo} alt="MyLogo"/>
    </div>
    )
}

export default logo;