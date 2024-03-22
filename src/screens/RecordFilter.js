import styled from 'styled-components/native';
import {Modal} from 'react-native';
import {FilterModal} from '../componenets';

const ModalBackScreen = styled.View`
    flex: 1;
    justify-content: flex-end;
    background-color: rgba(0,0,0,0.5);
`;

const RecordFilter = ({isVisible, onClose}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <ModalBackScreen>
                <FilterModal/>
            </ModalBackScreen>
        </Modal>
    )
};

export default RecordFilter;