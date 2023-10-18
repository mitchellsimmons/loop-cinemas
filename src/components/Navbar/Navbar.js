import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { GoTriangleUp } from 'react-icons/go';
import { toast } from 'react-toastify';

import Wrapper from './Navbar.styles';
import { logoImage } from '@/assets/images';
import { NavLinkButton, SearchSection, UserModalContainer } from 'components';
import { useLogout } from '@/api/auth';
import { useUserContext } from '@/context/UserProvider';
import { useMediaContext } from '@/context/MediaProvider';

const Navbar = () => {
    const { user } = useUserContext();
    const logout = useLogout();
    const { isDesktop } = useMediaContext();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isDropdownSelected, setIsDropdownSelected] = useState(false);
    const profileMenu = useRef(null);

    const [isSignUpPageOpen, setIsSignUpPageOpen] = useState(false);
    const [isSignInPageOpen, setIsSignInPageOpen] = useState(false);

    const toggleSignUpPage = () => {
        setIsSignUpPageOpen((prev) => !prev);
    };

    const toggleSignInPage = () => {
        setIsSignInPageOpen((prev) => !prev);
    };

    // Toggle class to prevent body from scrolling when sidebar is visible
    useEffect(() => {
        if (isSidebarVisible) {
            document.body.classList.add('sidebar-visible');
        } else {
            document.body.classList.remove('sidebar-visible');
        }
    }, [isSidebarVisible]);

    // Toggle sidebar visibility when hamburger button is clicked
    const handleHamburgerButtonClick = () => {
        setIsSidebarVisible((previous) => {
            return !previous;
        });
    };

    // Close sidebar when sidebar link is clicked
    const handleSidebarLinkClick = () => {
        setIsSidebarVisible(false);
    };

    // When div is clicked, toggle visibility and update focus
    const handleProfileMenuClick = (e) => {
        setIsDropdownSelected((previous) => {
            if (!previous) {
                profileMenu.current.focus();
            }

            return !previous;
        });
    };

    const handleProfileMenuMouseDown = (event) => {
        // Prevent the menu from losing focus when the dropdown is clicked
        // Otherwise button click events will not propagate
        event.preventDefault();
    };

    // When div loses focus, set visibility to hidden
    const handleProfileMenuBlur = (e) => {
        setIsDropdownSelected(false);
    };

    // Log-out current user
    const handleLogout = async () => {
        await logout();
        handleSidebarLinkClick();
        toast(`Goodbye!`);
    };

    return (
        <Wrapper>
            <div className='nav'>
                <div className='nav-logo'>
                    <NavLink to='/'>
                        <img src={logoImage} alt='logo' />
                    </NavLink>
                </div>
                {isDesktop ? (
                    user !== null ? (
                        // Display profile menu if a user is logged-in
                        <div
                            className='profile-menu'
                            tabIndex='0'
                            ref={profileMenu}
                            onClick={handleProfileMenuClick}
                            onMouseDown={handleProfileMenuMouseDown}
                            onBlur={handleProfileMenuBlur}
                        >
                            <p>Welcome, {user.firstName}</p>
                            <FaUserCircle />
                            <div
                                className={`profile-dropdown ${
                                    isDropdownSelected && 'selected'
                                }`}
                            >
                                <GoTriangleUp />
                                <NavLink to='/profile'>profile</NavLink>
                                <div className='line'></div>
                                <NavLink to='/' onClick={handleLogout}>
                                    logout
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        <div className='nav-links'>
                            <NavLinkButton onClick={toggleSignUpPage}>
                                join now
                            </NavLinkButton>
                            <NavLinkButton onClick={toggleSignInPage}>
                                sign in
                            </NavLinkButton>
                        </div>
                    )
                ) : (
                    // Display hamburger menu on mobile display
                    <div className='sidebar-container'>
                        <button
                            className={`hamburger-btn ${
                                isSidebarVisible && 'selected'
                            }`}
                            onClick={handleHamburgerButtonClick}
                        >
                            <div className='hamburger-line' />
                            <div className='hamburger-line' />
                            <div className='hamburger-line' />
                        </button>
                        <aside
                            className={`sidebar ${
                                isSidebarVisible && 'visible'
                            }`}
                        >
                            <div className='nav-logo'>
                                <NavLink to='/'>
                                    <img src={logoImage} alt='logo' />
                                </NavLink>
                            </div>
                            <SearchSection />
                            {user !== null ? (
                                <div className='links-container'>
                                    <NavLink
                                        to='/profile'
                                        onClick={handleSidebarLinkClick}
                                    >
                                        profile
                                    </NavLink>
                                    <NavLink to='/' onClick={handleLogout}>
                                        logout
                                    </NavLink>
                                </div>
                            ) : (
                                <div className='links-container'>
                                    <NavLink
                                        to='/sign-up'
                                        onClick={handleSidebarLinkClick}
                                    >
                                        join now
                                    </NavLink>
                                    <NavLink
                                        to='/sign-in'
                                        onClick={handleSidebarLinkClick}
                                    >
                                        sign in
                                    </NavLink>
                                </div>
                            )}
                        </aside>
                    </div>
                )}
            </div>
            {isDesktop && (
                <UserModalContainer
                    isSignInPageOpen={isSignInPageOpen}
                    isSignUpPageOpen={isSignUpPageOpen}
                    toggleSignInPage={toggleSignInPage}
                    toggleSignUpPage={toggleSignUpPage}
                />
            )}
        </Wrapper>
    );
};

export default Navbar;
