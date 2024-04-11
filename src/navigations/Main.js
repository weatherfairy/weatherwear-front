import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {WeatherMain, WearWriting, Login} from '../screens';
import Wear from './Wear';
import {TitleBar} from '../components';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const Stack = createStackNavigator();

const screenHeight = Dimensions.get('window').height;

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
            {/* <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerbackVisible: false, 
                    headerShown: false
                }}
            /> */}
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
                            page="WearMain"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: theme.wearBackground
                    }
                })}
            />
            <Stack.Screen 
                name="WearWriting" 
                component={WearWriting} 
                options={{
                    headerTitle: 'Post',
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: theme.wearText,
                    headerStyle: {
                        backgroundColor: theme.wearBackground,
                        height: (screenHeight/35)*3.9,
                    },
                    headerTitleStyle: {
                        fontSize: screenHeight/35,
                        fontFamily: 'GmarketSansTTFBold'
                    },
                    headerLeft: ({onPress, tintColor}) => (<MaterialIcons
                        name="keyboard-arrow-left"
                        size={screenHeight/22}
                        color={tintColor}
                        onPress={onPress}
                    />)
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerbackVisible: false, 
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default Main;