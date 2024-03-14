import {Platform, Dimensions} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {WearRecommend, WearRecord} from '../screens';
import {TitleBar} from '../components';
import {FontAwesome5} from '@expo/vector-icons';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../themes/theme';
import styled from 'styled-components/native';

const tabBarHeight = Dimensions.get('window').height*0.08;

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;
const TabIconContainer = styled.View`
    width: ${tabBarHeight*0.6}px;
    height: ${tabBarHeight*1.1}px;
`;
const RecommendIcon = ({focused, size}) => {
    return (
        <TabIconContainer>
            <FontAwesome5
            name='thumbs-up'
            size={size}
            color={focused ? theme.highlight : theme.text}
            />
        </TabIconContainer>
    )
}
const RecordIcon = ({focused, size}) => {
    return (
        <TabIconContainer>
            <FontAwesome5
            name='edit'
            size={size}
            color={focused ? theme.highlight : theme.text}
            />
        </TabIconContainer>
    )
}
const Tab = createMaterialTopTabNavigator();

const Wear = ({ navigation }) => {

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TitleBar navigation={navigation}/>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: theme.highlight,
                        tabBarInactiveTintColor: theme.text
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
                        component={WearRecord}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => 
                                <RecordIcon focused={focused} size={tabBarHeight*0.4} />
                        }}
                    />
                </Tab.Navigator>
            </Container>
        </ThemeProvider>
    )
}
export default Wear;