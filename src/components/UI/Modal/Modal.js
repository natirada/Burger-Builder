import React, {useEffect} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Dropback from '../Drawback/Backdrop';
const modal = props => {
    
    // shouldComponentUpdate(nextProps, nextState) {
    //    return (nextProps.show !== props.show || nextProps.children !== props.children);

    // }

    useEffect(() => {
       console.log('now');
    })
        return (
            <Aux>
             
             <Dropback show={props.show} clickBackdrop={props.clickBackdrop}/>
            <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)':'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
            </Aux>
        );
    

};

export default React.memo(modal, (preProps, nextProps) => {
   return (nextProps.show === preProps.show )
});