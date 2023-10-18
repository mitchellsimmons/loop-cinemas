import { NavLink } from 'react-router-dom';

import Wrapper from './NavLinkButton.styles';

const NavLinkButton = ({ to, children, onClick, ghost, ...restProps }) => {
    const handleClick = (event) => {
        if (onClick) {
            event.preventDefault();
            onClick(event);
        }
    };

    return (
        <Wrapper className={`btn ${ghost && 'ghost-btn'}`}>
            <NavLink to={to} onClick={handleClick} {...restProps}>
                {children}
            </NavLink>
        </Wrapper>
    );
};

export default NavLinkButton;
