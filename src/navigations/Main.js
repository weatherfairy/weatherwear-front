import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {WeatherMain} from '../screens';
import Wear from './Wear';

const Stack = createNativeStackNavigator();

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