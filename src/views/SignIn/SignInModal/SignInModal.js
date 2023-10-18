import { Modal } from 'components';
import { SignInPage } from 'views/SignIn';
import Wrapper from './SignInModal.styles';

const SignInModal = ({ onClose, isOpen, onSwitch }) => {
    return (
        <Wrapper className={isOpen && 'visible'}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <SignInPage onSuccess={onClose} onNotMember={onSwitch} />
            </Modal>
        </Wrapper>
    );
};
export default SignInModal;
