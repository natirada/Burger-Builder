import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrwaerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

 const toolbar = (props) => {
    return (
    <header className={classes.Toolbar}>
         <DrwaerToggle clickMenu={props.clickMenu}/>
          <div className={classes.Logo}> 
             <Logo /> 
          </div>  
         <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} ></NavigationItems>
         </nav>
    </header>
     )
 };

export default toolbar;