import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
//import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useState} from 'react';
import FilterModal from './FilterModal';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BarContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: ${screenHeight*0.055}px;
    background-color: ${({theme}) => theme.wearBackground};
`;
const FilterIconButton = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.grey};
    height: ${screenHeight*0.035}px;
    width: ${screenWidth*0.13}px;
    border-radius: ${screenHeight*0.008}px;
    align-items: center;
    justify-content: center;
`;
const FilterButton = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.grey};
    height: ${screenHeight*0.035}px;
    width: ${screenWidth*0.16}px;
    border-radius: ${screenHeight*0.008}px;
    align-items: center;
    justify-content: center;
`;
const FilterIcon = styled(FontAwesome).attrs(({theme}) => ({
    name: 'sliders',
    size: screenHeight*0.03
}))`
    //color: ${({theme}) => theme.wearText};
`;
const NameContainer = styled.View`
    background-color: ${({theme}) => theme.wearBackground};
    height: ${screenHeight*0.025}px;
    width: ${screenWidth*0.14}px;
    border-radius: ${screenHeight*0.003}px;
    align-items: center;
    justify-content: center;
`;
const FilterName = styled.Text`
    color: ${({theme}) => theme.wearText};
    font-size: ${screenHeight*0.02}px;
    font-family: GmarketSansTTFLight;
`;

const FilterBar = ({ onApplyFilter }) => {
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [activeFilterType, setActiveFilterType] = useState('temp');

    const openModal = (filterType) => {
        setActiveFilterType(filterType);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <BarContainer>
                <FilterIconButton onPress={() => openModal('temp')}><FilterIcon /></FilterIconButton>
                <FilterButton onPress={() => openModal('temp')}>
                    <NameContainer>
                        <FilterName>기온</FilterName>
                    </NameContainer>
                </FilterButton>
                <FilterButton onPress={() => openModal('weather')}>
                    <NameContainer>
                        <FilterName>날씨</FilterName>
                    </NameContainer>
                </FilterButton>
                <FilterButton onPress={() => openModal('date')}>
                    <NameContainer>
                        <FilterName>날짜</FilterName>
                    </NameContainer>
                </FilterButton>
                <FilterButton onPress={() => openModal('satisfy')}>
                    <NameContainer>
                        <FilterName>만족</FilterName>
                    </NameContainer>
                </FilterButton>
            </BarContainer>
            <FilterModal 
                isVisible={isModalVisible} 
                onClose={closeModal} 
                onApply={onApplyFilter}
                activeFilterType={activeFilterType}
            />
        </>
    )
}

export default FilterBar;