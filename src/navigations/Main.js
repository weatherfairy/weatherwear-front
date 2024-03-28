import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {WeatherMain, WearWriting} from '../screens';
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
            <Stack.Screen 
                name="WearWriting" 
                component={WearWriting} 
                options={{
                    headerTitle: 'Posting',
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: theme.wearText,
                    headerStyle: {
                        backgroundColor: theme.wearBackground,
                        height: (screenHeight/35)*3.5,
                    },
                    headerTitleStyle: {
                        fontSize: screenHeight/35,
                        fontFamily: 'GmarketSansTTFBold', // 커스텀 폰트 가족 설정 (예시)
                        // 커스텀 폰트를 사용하려면 해당 폰트 파일을 프로젝트에 포함시키고, react-native.config.js 등에서 선언해야 할 수 있습니다.
                    },
                    headerLeft: ({onPress, tintColor}) => (<MaterialIcons
                        name="keyboard-arrow-left"
                        size={screenHeight/20}
                        color={tintColor}
                        onPress={onPress}
                    />)
                }}
            />
        </Stack.Navigator>
    )
}

export default Main;