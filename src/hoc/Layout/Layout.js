import React, {useState} from 'react'
import Aux from '../Auxiliary/Auxiliary';
import ToolBar from '../../components/Navigtion/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigtion/SideDrawer/SideDrawer';
import {connect} from 'react-redux'
const layout = (props) => {
   
    const [state, setState] = useState({ show: false})
    const CloseHendlerkBackdrop = () => {
      setState({ show: false});
    }
    
    const OpenHendlerkBackdrop = () => {
      console.log('app');
      
      setState({ show: true});
    }

 
        return(
            <Aux>
                <ToolBar 
                  auth
                  isAuth={props.isAuth} clickMenu={OpenHendlerkBackdrop}/>
                <SideDrawer 
                  isAuth={props.isAuth} show={state.show} closeBackdrop={CloseHendlerkBackdrop}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );

    
};


const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(layout);