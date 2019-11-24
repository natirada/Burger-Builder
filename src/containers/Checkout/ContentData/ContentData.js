import React, {useState, useEffect} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContentData.css';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as OrderActions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../../shared/utility';

const contentData = props => {
   const [state, setState] = useState ( { 
        orderform: {
            name: {
                elementType: 'input',
                label: 'Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validtion: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                label: 'E-mail',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validtion: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                label: 'Street',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validtion: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postCode: {
                elementType: 'input',
                label: 'Zip Code',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validtion: {
                    required: true,
                    minLength: 4,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                label: 'Select Delivery Method:',
                elementConfig: {
                    options:[
                        {value: 'fastest' , display: 'Fastest'},
                        {value: 'cheapest' , display: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },  
        loading: false,
        ingredients: null,
        totalPrice: 0,
        formIsValid: false
    })

   
   
    useEffect(() => {
        setState(preState => {
            return { ...preState,ingredients: props.ingredients, totalPrice: props.price}
        });
    },[])

    const clickOrderHandler = (event) => {
        event.preventDefault();
        setState( preState => {
            return {...preState, loading: true}
        } );
        const orderForm = {};
        for(let key in state.orderform) {
            orderForm[key] = state.orderform[key].value;
        }

        const order = {
            price: state.totalPrice,
            ingredients: state.ingredients,
            orderData: orderForm,
            userId: props.userId
        }
        props.purchaseBurgerStart(order, props.token);
        // axios.post('/orders.json',order)
        //   .then(response => {
        //       setState({loading: false, clickorder:false});
        //       props.history.push('/');
        //   })
        //   .catch(error => console.log(error));
    }


   const onChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...state.orderform
        };
        const updateInput = {
            ...updateOrderForm[inputIdentifier]
        }
        updateInput.value = event.target.value;
        updateInput.valid = checkValidity(updateInput.validtion, updateInput.value);
        updateInput.touched = true;
        updateOrderForm[inputIdentifier] = updateInput;
        
        let isValidForm = true;
        for(let key in state.orderform)
        {
           // console.log(key);
            isValidForm = state.orderform[key].valid && isValidForm && updateInput.valid;
        }


     
        setState(preSatate =>  {
            return {...preSatate, orderform: updateOrderForm, formIsValid: isValidForm}
        });

    }

    
 
        const orderFormArray = [];
        for(let key in state.orderform) {
            orderFormArray.push({
                id:key,
                elementType: state.orderform[key].elementType,
                label: state.orderform[key].label,
                elementConfig: state.orderform[key].elementConfig,
                value: state.orderform[key].value,
                valid: state.orderform[key].valid,
                validtion: state.orderform[key].validtion,
                touched: state.orderform[key].touched
            });
        }
        let contentData = <Spinner />
        if(!props.loading) {
            contentData = (
                <div className={classes.ContentData}>
                <h3>Enter your content data:</h3>
                <form onSubmit={clickOrderHandler}>
                     {
                         orderFormArray.map(orderform => {
                             return <Input 
                                        key={orderform.id} 
                                        elementType={orderform.elementType} 
                                        label={orderform.label} 
                                        elementConfig={orderform.elementConfig}
                                        value={orderform.value}
                                        valid={!orderform.valid}
                                        validtion={orderform.validtion}
                                        touched={orderform.touched}
                                        changed={(event) => onChangedHandler(event, orderform.id)}/>
                         })
                     } 
                    <Button typebutton="Success" disabled={!state.formIsValid}>ORDER</Button>
                </form>
            </div>
            )
        }

        return(
            contentData
        )
    
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDisptachToProps = dispatch => {
    return {
        purchaseBurgerStart: (order, token) => dispatch(OrderActions.purchaseBurger(order, token))
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(contentData);