import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import Sign from './Sign';
import React, {useContext} from 'react';
import {AuthContext, AuthProvider} from '../contexts/Auth';

const Navigation = () => {
    const {userToken} = useContext(AuthContext);

    return (
        <NavigationContainer>
            {userToken ? <Main /> : <Sign />}
        </NavigationContainer>
    )
}

export default Navigation;