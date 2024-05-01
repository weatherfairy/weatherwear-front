import * as React from 'react';
import styled from 'styled-components/native';
import {Dimensions, Platform, StatusBar, Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TempFilter from './TempFilter';
import WeatherFilter from './WeatherFilter';
import SatisfyFilter from './SatisfyFilter';
import DateFilter from './DateFilter';

const modalHeight = Dimensions.get('window').height*0.65;
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
    height: ${modalHeight/9}px;
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
    font-family: GmarketSansTTFBold;
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
    font-family: GmarketSansTTFMedium;
    font-size: ${modalHeight/19}px;
    color: #000;
`;
const ApplyButtonContainer = styled.View`
    height: ${modalHeight/9}px;
    width: ${modalWidth}px;
    flex-direction: row-reverse;
    //background-color: #3165F6;
`;
const ApplyButton = styled.TouchableOpacity`
    height: ${modalHeight/15}px;
    width: ${modalWidth/5}px;
    border-radius: ${modalHeight/30}px;
    margin-right: ${modalWidth/20}px;
    background-color: #3165F6;
    justify-content: center;
    align-items: center;
    elevation: 7;
    shadow-color: #000;
    shadow-opacity: 0.3;
    shadow-radius: 3px;
`;
const ApplyText = styled.Text`
    color: #fff;
    font-family: GmarketSansTTFMedium;
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
    {korName: '뇌우', engName: 'thuderstorm', keyNum: 2},
    {korName: '이슬비', engName: 'drizzle', keyNum: 3},
    {korName: '비', engName: 'rain', keyNum: 5},
    {korName: '눈', engName: 'snow', keyNum: 6},
    {korName: '흐림', engName: 'overcast', keyNum: 7},
    {korName: '맑음', engName: 'clear', keyNum: 8},
];

const FilterModal = ({isVisible, onClose, activeFilterType, onApply}) => {
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

    const applyFilters = () => {
        // 기온 필터 파라미터
        const tempParams = `min=${tempValues.min}&max=${tempValues.max}`;
    
        // 날씨 필터 파라미터
        const weatherParams = Object.entries(selectedOptions.weather)
            .filter(([key, value]) => value)
            .map(([key]) => {
                const option = weatherOptions.find(option => option.engName === key);
                return `sky=${option.keyNum}`;
            })
            .join('&');
    
        // 날짜 필터 파라미터
        const dateParams = Object.entries(selectedOptions.date)
            .filter(([key, value]) => value)
            .map(([key]) => `month=${monthOptions.find(option => option.engName === key).korName.replace('월', '')}`)
            .join('&');
    
        // 만족도 필터 파라미터
        const satisfyParams = Object.entries(selectedOptions.satisfy)
            .filter(([key, value]) => value)
            .map(([key]) => `emoji=${satisfyOptions.findIndex(option => option.engName === key)}`)
            .join('&');
    
        // 전체 URL 파라미터 조합
        const allParams = [tempParams, weatherParams, dateParams, satisfyParams].filter(param => param).join('&');
    
        // URL 생성
        const apiUrl = allParams;
    
        console.log('API URL:', apiUrl); // 실제 요청 대신 콘솔에 출력
        // 실제 네트워크 요청을 여기서 실행하세요. 예: fetch(apiUrl)...

        onApply(apiUrl);
        onClose();
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
                    <ApplyButtonContainer>
                        <ApplyButton onPress={applyFilters}>
                            <ApplyText>적용하기</ApplyText>
                        </ApplyButton>
                    </ApplyButtonContainer>
                </ModalContainer>
            </ModalBackScreen>
        </Modal>
    )
}

export default FilterModal;