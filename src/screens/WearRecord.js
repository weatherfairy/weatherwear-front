import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FilterBar, RecordGallery } from '../components';

const Container = styled.SafeAreaView`
    flex: 1;
`;

const WearRecord = ({ navigation }) => {
    const [filterParams, setFilterParams] = useState("");

    const applyFilter = (params) => {
        setFilterParams(params);
    };

    return (
        <Container>
                <FilterBar onApplyFilter={applyFilter} />
                <RecordGallery navigation={navigation} filterParams={filterParams} />
        </Container>
    )
}

export default WearRecord;