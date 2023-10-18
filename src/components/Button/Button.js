import Wrapper from './Button.styles';

const Button = ({ children, ghost, onClick }) => {
    return (
        <Wrapper className={`btn ${ghost && 'ghost-btn'}`} onClick={onClick}>
            {children}
        </Wrapper>
    );
};

export default Button;
