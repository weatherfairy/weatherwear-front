import styled, {css} from 'styled-components/native';
import {Dimensions, Platform, StatusBar, Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {useState, useEffect} from 'react';

const modalHeight = Dimensions.get('window').height*0.75;
const modalWidth = Dimensions.get('window').width;

const regions = [
    { id: 1, name: '강원특별자치도', 
        subRegions: ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', 
                    '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'] },
    { id: 2, name: '경기도', 
        subRegions: ['가평군', '고양시덕양구', '고양시일산동구', '고양시일산서구', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시',
                    '남양주시', '동두천시', '부천시소사구', '부천시오정구', '부천시원미구', '성남시분당구', '성남시수정구', '성남시중원구', '수원시권선구', '수원시영통구',
                    '수원시장안구', '수원시팔달구', '시흥시', '안산시단원구', '안산시상록구', '안성시', '안양시동안구', '안양시만안구', '양주시', '양평군',
                    '여주시', '연천군', '오산시', '용인시기흥구', '용인시수지구', '용인시처인구', '의왕시', '의정부시', '이천시', '파주시',
                    '평택시', '포천시', '하남시', '화성시'] },
    { id: 3, name: '경상남도', 
        subRegions: ['거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군',
                    '진주시', '창녕군', '창원시마산합포구', '창원시마산회원구', '창원시성산구', '창원시의창구', '창원시진해구', '통영시', '하동군', '함안군',
                    '함양군', '합천군'] },
    { id: 4, name: '경상북도', 
        subRegions: ['경산시', '경주시', '고령군', '구미시', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시',
                    '영덕군', '영양군', '영주시', '영천시', '예천군', '울진군', '의성군', '청도군', '청송군', '칠곡군',
                    '포항시남구', '포항시북구'] },
    { id: 5, name: '광주광역시', 
        subRegions: ['광산구', '남구', '동구', '북구', '서구'] },
    { id: 6, name: '대구광역시', 
        subRegions: ['군위군', '남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'] },
    { id: 7, name: '대전광역시', 
        subRegions: ['대덕구', '동구', '서구', '유성구', '중구'] },
    { id: 8, name: '부산광역시', 
        subRegions: ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구',
                    '서구', '수영구', '연제구', '영도구', '중구', '해운대구'] },
    { id: 9, name: '서울특별시', 
        subRegions: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구',
                    '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구',
                    '용산구', '은평구', '종로구', '중구', '중랑구'] },
    { id: 10, name: '세종특별자치시', subRegions: [] },
    { id: 11, name: '울산광역시', 
        subRegions: ['남구', '동구', '북구', '울주군', '중구'] },
    { id: 12, name: '이어도', subRegions: [] },
    { id: 13, name: '인천광역시', 
        subRegions: ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구'] },
    { id: 14, name: '전라남도', 
        subRegions: ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군',
                    '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군',
                    '해남군', '화순군'] },
    { id: 15, name: '전라북도', 
        subRegions: ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군',
                    '장수군', '전주시덕진구', '전주시완산구', '정읍시', '진안군'] },
    { id: 16, name: '제주특별자치도', subRegions: ['서귀포시', '제주시'] },
    { id: 17, name: '충청남도', 
        subRegions: ['계롱시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시',
                    '예산군', '천안시동남구', '천안시서북구', '청양군', '태안군', '홍성군'] },
    { id: 18, name: '충청북도', 
        subRegions: ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청주시상당구',
                    '청주시서원구' ,'청주시청원구', '청주시흥덕구', '충주시'] }
];
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
    height: ${modalHeight*0.1}px;
    width: ${modalWidth}px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-width: 2px;
    border-color: #dadada;
    flex-direction: row;
    align-items: center;
`;
const CloseIconButton = styled.TouchableOpacity`
    height: ${modalHeight*0.07}px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${modalHeight*0.02}px;
    margin-left: 1px;
`;
const CloseIcon = styled(AntDesign).attrs(({theme}) => ({
    name: 'close',
    size: 35,
    color: '#000'
}))``;
const FilterTitle = styled.Text`
    font-family: GmarketSansTTFBold;
    font-size: ${modalHeight*0.05}px;
    color: #000;
    margin-left: ${modalWidth/2-36-modalHeight*0.1}px;
    margin-top: ${modalHeight*0.01}px;
`;
const SelectContainer = styled.View`
    height: ${modalHeight*0.8}px;
    flex-direction: row;
`;
const MainRegion = styled.ScrollView`
    width: ${modalWidth*0.35}px;
    border-right-width: 1px;
    border-color: #dadada;
`;
const SubRegion = styled.ScrollView`
    width: ${modalWidth*0.65}px;
`;
const MainRegionButton = styled.TouchableOpacity`
    height: ${modalHeight*0.07}px;
    //background-color: #eeeeee;
    ${props => props.isSelected ? selectedMainRegionButtonStyle : unselectedMainRegionButtonStyle}
    justify-content: center;
`;
const RegionText = styled.Text`
    font-size: ${modalWidth*0.045}px;
    font-family: GmarketSansTTFMedium;
    margin-left: ${modalWidth*0.025}px;
    ${props => props.isSelected ? selectedRegionTextStyle : unselectedRegionTextStyle}
`;
const SubRegionButton = styled.TouchableOpacity`
    height: ${modalHeight*0.07}px;
    justify-content: center;
`;
const BottomContainer = styled.View`
    height: ${modalHeight*0.1}px;
    width: ${modalWidth}px;
    justify-content: center;
    align-items: center;
`;
const FinishButton = styled.TouchableOpacity`
    height: ${modalHeight*0.07}px;
    width: ${modalWidth*0.7}px;
    border-radius: 7px;
    background-color: #dadada;
    justify-content: center;
    align-items: center;
`;
const FinishText = styled.Text`
    font-size: ${modalWidth*0.05}px;
    font-family: GmarketSansTTFMedium;
    color: ${props => props.disabled ? '#999999' : '#000000'};
`;

const selectedMainRegionButtonStyle = css`
    background-color: #fff;
`;
const unselectedMainRegionButtonStyle = css`
    background-color: #eeeeee;
`;
// 선택된 RegionText 스타일
const selectedRegionTextStyle = css`
    color: #3165F6;
`;

// 선택되지 않은 RegionText 스타일
const unselectedRegionTextStyle = css`
    color: #000;
`;

const Location = ({
    onClose, 
    onFinish,
    selectedMainRegion,
    setSelectedMainRegion,
    selectedSubRegion,
    setSelectedSubRegion
}) => {
    const [selectedRegionName, setSelectedRegionName] = useState("");
    const isLocationSelected = selectedMainRegion !== null && (selectedMainRegion.subRegions.length === 0 || selectedSubRegion !== null);

    const handleMainRegionSelect = (region) => () => {
        setSelectedMainRegion(region);
        setSelectedSubRegion(null);
        setSelectedRegionName(region.name);
    };
    const handleSubRegionSelect = (region) => () => {
        setSelectedSubRegion(region);
        setSelectedRegionName(`${selectedMainRegion.name} ${region}`);
    }

    useEffect(() => {
        if (selectedMainRegion && selectedSubRegion) {
            setSelectedRegionName(`${selectedMainRegion.name} ${selectedSubRegion}`);
        } else if (selectedMainRegion) {
            setSelectedRegionName(selectedMainRegion.name);
        }
        console.log('selectedMainRegion:', selectedMainRegion);
        console.log('selectedSubRegion: ', selectedSubRegion);
    }, [selectedMainRegion, selectedSubRegion]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <ModalBackScreen>
                <ModalContainer>
                    <TopContainer>
                        <CloseIconButton onPress={onClose}><CloseIcon/></CloseIconButton>
                        <FilterTitle>지역설정</FilterTitle>
                    </TopContainer>
                    <SelectContainer>
                        <MainRegion>
                            {regions.map((region) => (
                                <MainRegionButton key={region.id} onPress={handleMainRegionSelect(region)} isSelected={selectedMainRegion === region}>
                                    <RegionText isSelected={selectedMainRegion === region}>{region.name}</RegionText>
                                </MainRegionButton>
                            ))}
                        </MainRegion>
                        <SubRegion>
                            {selectedMainRegion && selectedMainRegion.subRegions.map((subRegion, index) => (
                                <SubRegionButton key={index} onPress={handleSubRegionSelect(subRegion)}>
                                    <RegionText isSelected={selectedSubRegion === subRegion}>{subRegion}</RegionText>
                                </SubRegionButton>
                            ))}
                        </SubRegion>
                    </SelectContainer>
                    <BottomContainer>
                        <FinishButton disabled={!isLocationSelected} onPress={() => {
                            if (isLocationSelected) {
                                onFinish(selectedRegionName);
                                onClose();
                            }
                        }}>
                            <FinishText disabled={!isLocationSelected}>지역설정 완료</FinishText>
                        </FinishButton>
                    </BottomContainer>
                </ModalContainer>
            </ModalBackScreen>
        </Modal>
    )
}

export default Location;