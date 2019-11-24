import React, { useEffect, Suspense } from 'react';
import Layout from  './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route ,Switch, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const Checkout = React.lazy(() => {
    return import('../src/containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
})

const app = props => {

  const {onAuthCheck} = props;
  useEffect(() => {
    console.log(props);
    props.onAuthCheck();
  }, [onAuthCheck])

    let route = (
      <Switch>
              <Route path="/auth" render={() => <Auth/>}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/" />
        </Switch>
    )

    if(props.isAuth) {
      route = (
        <Switch>
              <Route path="/checkout" render={() => <Checkout/>}/>
              <Route path="/orders" render={() => <Orders/>}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/" />
            </Switch>
      )
    }

    return (
      <div >
          <Layout>
            <Suspense fallback={<Spinner/>}>{route}</Suspense>  
          </Layout>
      </div>
    );  
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
   return {
     onAuthCheck: () => dispatch(actions.authCheckState())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(app);
