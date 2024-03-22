import * as React from 'react';
import styled from 'styled-components/native';
import {Dimensions, Platform, StatusBar, Modal} from 'react-native';
import {useFonts} from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import {TempFilter, WeatherFilter, SatisfyFilter, DateFilter} from './';

const modalHeight = Dimensions.get('window').height*0.6;
const modalWidth = Dimensions.get('window').width;

const ModalBackScreen = styled.View`
    flex: 1;
    justify-content: flex-end;
    background-color: rgba(0,0,0,0.5);
`;
const ModalContainer = styled.View`
    height: ${modalHeight}px;
    width: ${modalWidth}px;
    border-radius: 15px;
    background-color: #fff;
    flex-direction: column;
`;
const TopContainer = styled.View`
    height: ${modalHeight/8}px;
    width: ${modalWidth}px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    flex-direction: row;
`;
const CloseIconButton = styled.TouchableOpacity`
    height: ${modalHeight/10}px;
    justify-content: center;
    align-items: center;
    margin-top: 1px;
    margin-left: 1px;
`;
const CloseIcon = styled(AntDesign).attrs(({theme}) => ({
    name: 'close',
    size: 35,
    color: '#000'
}))``;
const FilterTitle = styled.Text`
    font-size: ${modalHeight/14}px;
    color: #000;
    margin-left: ${modalWidth/2-36-modalHeight/13}px;
    margin-top: ${Platform.OS === 'android' ? modalHeight/45 : (modalHeight-StatusBar.currentHeight)/30}px;
`;
const FilterContainer = styled.View`
    height: ${modalHeight/9}px;
    flex-direction: row;
`;
const FilterButton = styled.TouchableOpacity`
    width: ${modalWidth/4}px;
    border-bottom-width: 5px;
    border-color: ${(props) => (props.isActive ? '#3165F6' : '#dadada')};
    align-items: center;
    justify-content: center;
`;
const FilterOption = styled.Text`
    font-size: ${modalHeight/19}px;
    color: #000;
`;
const tempValues = {
    min: -50,
    max: 50
};
const monthOptions = [
    {korName: '1월', engName: 'jan'},
    {korName: '2월', engName: 'feb'},
    {korName: '3월', engName: 'mar'},
    {korName: '4월', engName: 'apr'},
    {korName: '5월', engName: 'may'},
    {korName: '6월', engName: 'jun'},
    {korName: '7월', engName: 'jul'},
    {korName: '8월', engName: 'aug'},
    {korName: '9월', engName: 'sep'},
    {korName: '10월', engName: 'oct'},
    {korName: '11월', engName: 'nov'},
    {korName: '12월', engName: 'dec'}
];
const satisfyOptions = [
    {korName: '만족', engName: 'best'},
    {korName: '보통', engName: 'good'},
    {korName: '불만족', engName: 'bad'}
];
const weatherOptions = [
    {korName: '맑음', engName: 'clear'},
    {korName: '흐림', engName: 'cloudy'},
    {korName: '구름많음', engName: 'overcast'},
    {korName: '비', engName: 'rain'},
    {korName: '비_눈', engName: 'sleet'},
    {korName: '눈', engName: 'snow'},
    {korName: '바람', engName: 'windy'}
];

const FilterModal = ({isVisible, onClose, activeFilterType}) => {
    const [tempValues, setTempValues] = React.useState({ min: -50, max: 50 });
    const [selectedOptions, setSelectedOptions] = React.useState({
        weather: weatherOptions.reduce((acc, option) => ({ ...acc, [option.engName]: true }), {}),
        date: monthOptions.reduce((acc, option) => ({ ...acc, [option.engName]: true }), {}),
        satisfy: satisfyOptions.reduce((acc, option) => ({ ...acc, [option.engName]: true }), {})
    });
    const [activeFilter, setActiveFilter] = React.useState(activeFilterType); // Default active filter

    React.useEffect(() => {
        setActiveFilter(activeFilterType);
    }, [activeFilterType]);

    const handleTempValuesChange = (values) => {
        setTempValues(values);
    };
    const toggleOption = (filterType, option) => {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [filterType]: {
                    ...prevSelectedOptions[filterType],
                    [option.engName]: !prevSelectedOptions[filterType][option.engName],
                },
            }));
    };

    const renderActiveFilter = () => {
        switch (activeFilter) {
            case 'temp':
                return <TempFilter values={tempValues} onValuesChange={handleTempValuesChange} />;
            case 'weather':
                return <WeatherFilter options={weatherOptions} selectedOptions={selectedOptions.weather} onToggleOption={(option) => toggleOption('weather', option)} />;
            case 'date':
                return <DateFilter options={monthOptions} selectedOptions={selectedOptions.date} onToggleOption={(option) => toggleOption('date', option)} />;
            case 'satisfy':
                return <SatisfyFilter options={satisfyOptions} selectedOptions={selectedOptions.satisfy} onToggleOption={(option) => toggleOption('satisfy', option)} />;
            default:
                return null;
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            onShow={() => setActiveFilter(activeFilterType)}
        >
            <ModalBackScreen>
                <ModalContainer>
                    <TopContainer>
                        <CloseIconButton onPress={onClose}><CloseIcon/></CloseIconButton>
                        <FilterTitle>필터</FilterTitle>
                    </TopContainer>
                    <FilterContainer>
                        <FilterButton 
                            onPress={() => setActiveFilter('temp')}
                            isActive={activeFilter === 'temp'}
                        >
                            <FilterOption style={{color: activeFilter === 'temp' ? '#3165F6' : '#000'}}>기온</FilterOption>
                        </FilterButton>
                        <FilterButton 
                            onPress={() => setActiveFilter('weather')}
                            isActive={activeFilter === 'weather'}
                        >
                            <FilterOption style={{color: activeFilter === 'weather' ? '#3165F6' : '#000'}}>날씨</FilterOption>
                        </FilterButton>
                        <FilterButton 
                            onPress={() => setActiveFilter('date')}
                            isActive={activeFilter === 'date'}
                        >
                            <FilterOption style={{color: activeFilter === 'date' ? '#3165F6' : '#000'}}>날짜</FilterOption>
                        </FilterButton>
                        <FilterButton 
                            onPress={() => setActiveFilter('satisfy')}
                            isActive={activeFilter === 'satisfy'}
                        >
                            <FilterOption style={{color: activeFilter === 'satisfy' ? '#3165F6' : '#000'}}>만족</FilterOption>
                        </FilterButton>
                    </FilterContainer>
                    {renderActiveFilter()}
                </ModalContainer>
            </ModalBackScreen>
        </Modal>
    )
}

export default FilterModal;