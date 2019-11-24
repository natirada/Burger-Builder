import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Drawback/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {

    let stateSideDrawer = [classes.SideDrawer, classes.Close];
    if(props.show) {
        stateSideDrawer = [classes.SideDrawer, classes.Open];
    }

    return(
        
        <Aux>
            <Backdrop show={props.show} clickBackdrop={props.closeBackdrop}/>
            <div className={stateSideDrawer.join(" ")}>  
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;