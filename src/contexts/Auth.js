import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    userToken: null,
    setUserToken: () => {}
});

const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('userToken').then(token => {
            if (token) {
                setUserToken(token);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{userToken, setUserToken}}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;