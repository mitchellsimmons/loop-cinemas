import { Link } from 'react-router-dom';

import Wrapper from './LinkButton.styles';

const LinkButton = ({ children, to, ghost, onClick }) => {
    return (
        <Wrapper className={`btn ${ghost && 'ghost-btn'}`}>
            <Link to={to} onClick={onClick}>
                {children}
            </Link>
        </Wrapper>
    );
};

export default LinkButton;
