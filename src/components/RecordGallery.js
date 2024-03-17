import styled from 'styled-components/native';
import {Dimensions, FlatList} from 'react-native';

const data = [
    {id: '1', value: '1', date: '1/25'},
    {id: '2', value: '2', date: '1/26'},
    {id: '3', value: '3', date: '1/27'},
    {id: '4', value: '4', date: '1/29'},
    {id: '5', value: '5', date: '1/28'},
    {id: '6', value: '6', date: '1/30'},
    {id: '7', value: '7', date: '2/2'},
    {id: '8', value: '8', date: '2/4'},
    {id: '9', value: '9', date: '2/1'},
    {id: '10', value: '10', date: '2/5'},
    {id: '1', value: '1', date: '1/25'},
    {id: '2', value: '2', date: '1/26'},
    {id: '3', value: '3', date: '1/27'},
    {id: '4', value: '4', date: '1/29'},
    {id: '5', value: '5', date: '1/28'},
    {id: '6', value: '6', date: '1/30'},
    {id: '7', value: '7', date: '2/2'},
    {id: '8', value: '8', date: '2/4'},
    {id: '9', value: '9', date: '2/1'},
    {id: '10', value: '10', date: '2/5'},
    {id: '1', value: '1', date: '1/25'}
];
const Container = styled.View`
    background-color: ${({theme}) => theme.background};
`;
const ImageContainer = styled.View`
    position: relative;
    width: ${Dimensions.get('window').width/3}px;
    height: ${Dimensions.get('window').height/4.5}px;
    background-color: ${({theme}) => theme.grey};
    border-width: 1px;
    border-color: ${({theme}) => theme.wearBackground};
`;
const DateContainer = styled.View`
    position: absolute;
    bottom: 3px;
    right: 3px;
    justify-content: center;
    align-items: center;
    width: ${Dimensions.get('window').width/12}px;
    height: ${Dimensions.get('window').height/60}px;
    background-color: ${({theme}) => theme.wearText};
    border-radius: ${Dimensions.get('window').height/120}px;
`;
const DateText = styled.Text`
    color: ${({theme}) => theme.wearBackground};
    font-size: ${Dimensions.get('window').height/70}px;
`;

const RecordGallery = (props) => {
    return (
        <Container>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <ImageContainer>
                        <DateContainer><DateText>{item.date}</DateText></DateContainer>
                    </ImageContainer>
                )}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 45 }} />
        </Container>
    )
}

export default RecordGallery;