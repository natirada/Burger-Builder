import React ,{useState, useEffect} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/utility';
const auth = props => {
    const [controls, setcontrols] = useState({ 
        email: {
                elementType: 'input',
                label: 'E-mail',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validtion: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
        password: {
                elementType: 'input',
                label: 'Password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Pssword'
                },
                value: '',
                validtion: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            },
        })
    const [formIsValid, setformIsValid] = useState(false);
    const [isSignup, setisSignup] = useState(true);

    useEffect(() => {
        if(!props.building && props.redirectAuthPath !== '/') 
        {
            props.onAuthRedirectPath('/');
        }
    }, [])

   const onChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = {
        ...controls
    };
    const updateInput = {
        ...updateOrderForm[inputIdentifier]
    }
    updateInput.value = event.target.value;
    updateInput.valid = checkValidity(updateInput.validtion, updateInput.value);
    updateInput.touched = true;
    updateOrderForm[inputIdentifier] = updateInput;
    
    let isValidForm = true;
    for(let key in controls)
    {
       // console.log(key);
        isValidForm = controls[key].valid && isValidForm && updateInput.valid;
    }

    setcontrols(updateOrderForm);
    setformIsValid(isValidForm);

}


const onClickSubmit = (event) => {
    event.preventDefault();
    const email = controls.email.value;
    const password = controls.password.value;
    const issignup = isSignup;
    props.onAuth(email, password, issignup);
}

const switchHandler = () => {
    setisSignup(preState => {
        return !preState;
    })
}

        let arryControls = [];
        for(let key in controls) {
                arryControls.push({
                    id:key,
                    elementType: controls[key].elementType,
                    label: controls[key].label,
                    elementConfig: controls[key].elementConfig,
                    value: controls[key].value,
                    valid: controls[key].valid,
                    validtion: controls[key].validtion,
                    touched: controls[key].touched
            })
        }
        let contentFrom  = <Spinner />
        if(!props.loading) {
           contentFrom = (
               <div>
                {
                    arryControls.map(controls => {
                        return <Input 
                                   key={controls.id} 
                                   elementType={controls.elementType} 
                                   label={controls.label} 
                                   elementConfig={controls.elementConfig}
                                   value={controls.value}
                                   valid={!controls.valid}
                                   validtion={controls.validtion}
                                   touched={controls.touched}
                                   changed={(event) => onChangedHandler(event, controls.id)}/>
                    })
                }
                <Button  typebutton="Success" disabled={!formIsValid} >Submit</Button>
            
               </div>
           );
        }
        let header =  (
            <h2>Sign {isSignup? 'Up': 'In'}</h2>
        )
        if(props.error) {
            header = props.errorMessage;
        }   

        let redirect = null;
        if(props.isAuth){
           redirect = <Redirect to={props.redirectAuthPath} />
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                {header}
                <form onSubmit={onClickSubmit}>
                {contentFrom}
                </form>
                    <Button clicked={switchHandler} typebutton="Danger">Switch to {isSignup ? 'Sign In' : 'Sign Up'}</Button>
            </div>
        )
    
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        errorMessage: state.auth.errorMessage,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        redirectAuthPath: state.auth.redirectAuthPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onAuthRedirectPath: (path) => dispatch(actions.redirectAuthPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(auth);