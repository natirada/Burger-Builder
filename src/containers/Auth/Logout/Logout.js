import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom'


const logout = props => {
    useEffect(() => {
        props.onLogout();
    }, [])

    return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout:() => dispatch(actions.authLogut())
    }
}

export default connect(null, mapDispatchToProps)(logout);

