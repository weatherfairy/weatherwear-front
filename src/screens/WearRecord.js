import styled from 'styled-components/native';
import { FilterBar, RecordGallery } from '../components';

const Container = styled.SafeAreaView`
    flex: 1;
`;

const WearRecord = ({ navigation }) => {
    return (
        <Container>
                <FilterBar />
                <RecordGallery navigation={navigation} />
        </Container>
    )
}

export default WearRecord;