import {Platform, Dimensions} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {WearRecommend, WearRecord} from '../screens';
import {FontAwesome5} from '@expo/vector-icons';
import {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';

const tabBarHeight = Dimensions.get('window').height*0.08;

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.wearBackground};
`;
const TabIconContainer = styled.View`
    width: ${tabBarHeight*0.6}px;
    height: ${tabBarHeight*1.1}px;
`;
const RecommendIcon = ({focused, size}) => {
    const theme = useContext(ThemeContext);

    return (
        <TabIconContainer>
            <FontAwesome5
            name='thumbs-up'
            size={size}
            color={focused ? theme.wearHighlight : theme.wearText}
            />
        </TabIconContainer>
    )
}
const RecordIcon = ({focused, size}) => {
    const theme = useContext(ThemeContext);

    return (
        <TabIconContainer>
            <FontAwesome5
            name='edit'
            size={size}
            color={focused ? theme.wearHighlight : theme.wearText}
            />
        </TabIconContainer>
    )
}
const Tab = createMaterialTopTabNavigator();

const Wear = ({ navigation }) => {
    const theme = useContext(ThemeContext);

    return (
            <Container>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: theme.wearHighlight,
                        tabBarInactiveTintColor: theme.wearText
                    }}
                >
                    <Tab.Screen
                        name="추천"
                        component={WearRecommend}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => 
                                <RecommendIcon focused={focused} size={tabBarHeight*0.4} />
                        }}
                    />
                    <Tab.Screen
                        name="내 기록"
                        children={() => <WearRecord navigation={navigation} />}
                        //component={WearRecord}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => 
                                <RecordIcon focused={focused} size={tabBarHeight*0.4} />
                        }}
                    />
                </Tab.Navigator>
            </Container>
    )
}
export default Wear;