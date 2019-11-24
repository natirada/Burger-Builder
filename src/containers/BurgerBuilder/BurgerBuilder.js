import React, {useState, useEffect} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';


const burgerBuilder = props => {


    const [clickorder, setclickorder] = useState(false);

    const dispatch = useDispatch();

    const onAddedIngredient = (ingName) => dispatch(actions.addIngriedent(ingName));
    const onRemocvedIngredient = (ingName) => dispatch(actions.removeIngriedent(ingName));
    const setIngredients = () => dispatch(actions.initIngriedents());
    //const fetchIngredients = () => dispatch(actions.initIngredientsFailed());
    //const onInitPurchase = () => dispatch(actions.initPurchased());
    const onAuthRedirectPath = (path) => dispatch(actions.redirectAuthPath(path));

    const ingredients = useSelector(state => state.burgerBuilder.ingredients) ;
    const totalPrice =  useSelector(state => state.burgerBuilder.totalPrice) ;
    const loading =  useSelector(state => state.burgerBuilder.loading) ;
    const isAuth =  useSelector(state => state.auth.token !== null);

    
    useEffect(() => {
        setIngredients();
       console.log(props);
       ;
    
    }, [])




    const ClickOrderHandle = () => {
        if(isAuth) {
            setclickorder(true);
        }
        else {
            onAuthRedirectPath('/checkout');
            props.children.history.push('/auth');
        }
             
    }

    const ClickBackdrop = () => {
      //  props.children.history.goBack();
        setclickorder(false);
    }

    


    const ContinueOrderHandler = () => {
        props.children.history.push('/checkout');
    }

    
        const ingredientsInfo = {
            ...ingredients
        };
        for(let ingredient in ingredientsInfo)
        {
            ingredientsInfo[ingredient] = ingredientsInfo[ingredient]  > 0 ? false: true ; 
        }

        let orderSummary = <Spinner />
        if(loading) {
            orderSummary = <Spinner />
        }
        let burger = <Spinner />
        if(ingredients) {
            orderSummary = (<OrderSummary 
                ingredients={ingredients} 
                clickBackdrop={ClickBackdrop} 
                totalprice={totalPrice} 
                clickContinueOrder={ContinueOrderHandler}>
               </OrderSummary>);
            burger = (
                <Aux>
                    <Burger totalPrice={totalPrice} ingredients={ingredients} />
                    <BuildControls 
                        addIngredient={onAddedIngredient} 
                        removeIngredient={onRemocvedIngredient}
                        display={ingredientsInfo}
                        purchaseable={totalPrice > 5}
                        clickorder={ClickOrderHandle}
                        isAuth={isAuth}/>
                </Aux>
            )
        }

        return(
            <Aux>
                <Modal show={clickorder} clickBackdrop={ClickBackdrop}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    
}



export default withErrorHandler(burgerBuilder, axios);