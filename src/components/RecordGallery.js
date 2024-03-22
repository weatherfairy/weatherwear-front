import styled from 'styled-components/native';
import {Dimensions, FlatList} from 'react-native';
import {useEffect, useState} from 'react';

const data = [
    {id: '1', value: '1', date: '1/25', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '2', value: '2', date: '1/26', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '3', value: '3', date: '1/27', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '4', value: '4', date: '1/29', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '5', value: '5', date: '1/28', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '6', value: '6', date: '1/30', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '7', value: '7', date: '2/2', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '8', value: '8', date: '2/4', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '9', value: '9', date: '2/1', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '10', value: '10', date: '2/5', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '1', value: '1', date: '1/25', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '2', value: '2', date: '1/26', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '3', value: '3', date: '1/27', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '4', value: '4', date: '1/29', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '5', value: '5', date: '1/28', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '6', value: '6', date: '1/30', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '7', value: '7', date: '2/2', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '8', value: '8', date: '2/4', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '9', value: '9', date: '2/1', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '10', value: '10', date: '2/5', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1},
    {id: '1', value: '1', date: '1/25', minTemp: -1, maxTemp: 5, weather: 1, satisfy: 1}
];
const Container = styled.View`
    background-color: ${({theme}) => theme.wearBackground};
`;
const ImageContainer = styled.View`
    position: relative;
    width: ${Dimensions.get('window').width/3}px;
    height: ${Dimensions.get('window').height/4.5}px;
    background-color: ${({theme}) => theme.grey};
    border-width: 1px;
    border-color: ${({theme}) => theme.wearBackground};
`;
const TestImage = styled.Image`
    width: 100%;
    height: 100%;
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
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                /*const requestBody = {
                    page: 0,
                    size: 24,
                    filters: {
                        month: [1, 2],
                        tempRange: {
                            min: 20,
                            max: 30
                        },
                    emoji: 1
                    }
                };*/
    
                const response = await fetch('http://223.194.158.167:8080/api/v1/closet/lists', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify(requestBody),
            });
    
                const jsonResponse = await response.json();
                console.log('Response.content');
                if (jsonResponse && jsonResponse.content) {
                setImageData(jsonResponse.content);
                console.log('ImageData set: ', jsonResponse.content);
                }
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };
    
        fetchImageData();
}, []);

    return (
        <Container>
            <FlatList
                data={imageData}
                renderItem={({item}) => (
                    
                    <ImageContainer>
                        <TestImage source={{ uri: item.imageUrl }} />
                        <DateContainer><DateText>{item.date}</DateText></DateContainer>
                    </ImageContainer>
                )}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 45 }} />
        </Container>
    )
}

export default RecordGallery;