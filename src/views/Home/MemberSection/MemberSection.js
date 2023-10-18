import Wrapper from './MemberSection.styles';
import { LinkButton, UserModalContainer } from 'components';
import { useState } from 'react';
import { useMediaContext } from 'context/MediaProvider';

const MemberSection = () => {
    const { isDesktop } = useMediaContext();
    const [isSignUpPageOpen, setIsSignUpPageOpen] = useState(false);
    const [isSignInPageOpen, setIsSignInPageOpen] = useState(false);

    const toggleSignUpPage = () => {
        setIsSignUpPageOpen((prev) => !prev);
    };

    const toggleSignInPage = () => {
        setIsSignInPageOpen((prev) => !prev);
    };

    return (
        <>
            <Wrapper>
                <div className='container'>
                    <h2>become a member</h2>
                    <p>
                        Join the Loop Movie Club to receive exclusive offers and
                        never pay full price on a ticket again.
                    </p>
                    {isDesktop ? (
                        <LinkButton onClick={toggleSignUpPage}>
                            join now
                        </LinkButton>
                    ) : (
                        <LinkButton to='/sign-up'>join now</LinkButton>
                    )}
                </div>
            </Wrapper>
            <UserModalContainer
                isSignInPageOpen={isSignInPageOpen}
                isSignUpPageOpen={isSignUpPageOpen}
                toggleSignInPage={toggleSignInPage}
                toggleSignUpPage={toggleSignUpPage}
            />
        </>
    );
};

export default MemberSection;
