import { SignInModal } from 'views/SignIn';
import { SignUpModal } from 'views/SignUp';

const UserModalContainer = ({
    isSignInPageOpen,
    isSignUpPageOpen,
    toggleSignInPage,
    toggleSignUpPage,
}) => {
    const toggleBoth = () => {
        toggleSignUpPage();
        toggleSignInPage();
    };

    return (
        <>
            <SignUpModal
                isOpen={isSignUpPageOpen}
                onClose={toggleSignUpPage}
                onSwitch={toggleBoth}
            />
            <SignInModal
                isOpen={isSignInPageOpen}
                onClose={toggleSignInPage}
                onSwitch={toggleBoth}
            />
        </>
    );
};
export default UserModalContainer;
