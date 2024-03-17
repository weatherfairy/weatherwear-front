import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {WeatherMain} from '../screens';
import Wear from './Wear';
import {TitleBar} from '../components';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';

const Stack = createStackNavigator();

const Main = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            screenOptions={{
                //headerTitleAlign: 'left',
                headerLeft: () => null,
                headerBackTitleVisible: false
            }}
        >
            <Stack.Screen 
                name="WeatherMain" 
                component={WeatherMain} 
                options={({navigation}) => ({
                    headerTitle: () => (
                        <TitleBar 
                            navigation={navigation} 
                            backgroundColor={theme.background}
                            textColor={theme.text}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: theme.background
                    }
                })}
            />
            <Stack.Screen 
                name="WearMain" 
                component={Wear} 
                options={({navigation}) => ({
                    headerTitle: () => (
                        <TitleBar 
                            navigation={navigation} 
                            backgroundColor={theme.wearBackground}
                            textColor={theme.wearText}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: theme.wearBackground
                    }
                })}
            />
        </Stack.Navigator>
    )
}

export default Main;