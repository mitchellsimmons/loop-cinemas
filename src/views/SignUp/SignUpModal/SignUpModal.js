import { Modal } from 'components';
import { SignUpPage } from 'views/SignUp';
import Wrapper from './SignUpModal.styles';

const SignUpPageModal = ({ onClose, isOpen, onSwitch }) => {
    return (
        <Wrapper className={isOpen && 'visible'}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <SignUpPage onSuccess={onClose} onAlreadyMember={onSwitch} />
            </Modal>
        </Wrapper>
    );
};
export default SignUpPageModal;
