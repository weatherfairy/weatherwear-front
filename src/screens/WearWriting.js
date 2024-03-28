import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.wearBackground};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const TestText = styled.Text`
    flex: 1;
    color: ${({theme}) => theme.wearText};
`;
const WearWriting = () => {
    return (
        <Container>
            <TestText>글작성 페이지</TestText>
        </Container>
    );
};

export default WearWriting;