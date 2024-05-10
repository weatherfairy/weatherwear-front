import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {Signin, Signup} from '../screens';
import {TitleBar} from '../components';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';

const Stack = createStackNavigator();

const Sign = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                //headerLeft: () => null,
                //headerBackTitleVisible: false
            }}
        >
            <Stack.Screen 
                name="Signin" 
                component={Signin} 
            />
            <Stack.Screen 
                name="Signup" 
                component={Signup} 
            />
        </Stack.Navigator>
    )
}

export default Sign;