import styled from 'styled-components/native';
import {useFonts} from 'expo-font';
import { FilterBar, RecordGallery } from '../components';

const Container = styled.SafeAreaView`
    flex: 1;
`;

const WearRecord = () => {
    return (
        <Container>
                <FilterBar />
                <RecordGallery />
        </Container>
    )
}

export default WearRecord;