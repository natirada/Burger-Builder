import React, {useState, useEffect} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WarrpedComponent ,axios) => {
    return props => {
        
        const [error, setError] = useState(null);

       
        const ClickBackdrop = () => {
            setError(null);
        }
        
        const reqInterceptor = axios.interceptors.request.use(res => res, err => {
            setError(null);
            return err;
        });
        const resInterceptor =axios.interceptors.response.use(res => res, err => {
            setError(err);
            return err;
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
     }, [reqInterceptor, resInterceptor])
            return(
                <Aux>
                    <Modal show={error} clickBackdrop={ClickBackdrop}>
                        {error ? error.message: null}
                    </Modal>
                    <WarrpedComponent>
                        {props}
                    </WarrpedComponent>
                </Aux>
            )
        }
};

export default withErrorHandler;