import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {WeatherMain} from '../screens';
import Wear from './Wear';

const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="WeatherMain" component={WeatherMain} />
            <Stack.Screen name="WearMain" component={Wear} />
        </Stack.Navigator>
    )
}

export default Main;