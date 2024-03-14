import styled from 'styled-components/native';
import {useFonts} from 'expo-font';
import { FilterBar, RecordGallery } from '../components';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../themes/theme';

const Container = styled.SafeAreaView`
    flex: 1;
`;

const WearRecord = () => {
    return (
        <ThemeProvider theme={theme}>
                <FilterBar />
                <RecordGallery />
        </ThemeProvider>
    )
}

export default WearRecord;