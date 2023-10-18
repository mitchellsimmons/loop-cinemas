import styled from 'styled-components';

const Wrapper = styled.nav`
    .nav {
        width: var(--view-width);
        max-width: var(--max-width);
        margin: 0 auto;
        margin-top: 45px;
        margin-bottom: 25px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-items: center;
    }

    .nav-logo {
        width: 122px;
        margin: auto 0;
    }

    .nav-links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
    }

    .btn {
        width: 138px;
        height: 52px;
        background-color: var(--primary-color);
        border-radius: 26px;
    }

    .ghost-btn {
        background-color: var(--background-color);
        border: solid 2px var(--primary-color);

        .nav-link {
            color: var(--primary-color);
        }
    }

    .nav-link {
        color: white;
        text-decoration: none;
        text-transform: capitalize;
        font-weight: 600;
        font-size: 16px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100%;
    }

    .profile-menu {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        height: 52px;

        &:focus {
            outline: none;
        }

        svg {
            width: 30px;
            height: 30px;
        }

        p {
            font-weight: 400;
        }

        // Fill in the space between the menu and the dropdown
        // so that hover does not lose focus
        /* &::after {
            content: '';
            position: absolute;
            bottom: -20px;
            width: 100%;
            height: 40px;
        } */

        /* &:hover .profile-dropdown {
            opacity: 1;
            visibility: visible;
            transition: visibility 0s opacity ease-in-out 200ms;
        } */

        .profile-dropdown.selected {
            opacity: 1;
            visibility: visible;
        }

        .profile-dropdown {
            display: flex;
            visibility: hidden;
            opacity: 0;
            transition: opacity ease-in-out 200ms;
            position: absolute;
            bottom: 0;
            transform: translateY(116%);
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            width: 100%;
            padding: 15px;
            border-radius: var(--small-border-radius);
            z-index: 100;
            background-color: var(--text-color);

            svg {
                position: absolute;
                top: -18px;
                right: 0px;
            }

            a {
                display: block;
                color: var(--background-color);
                text-decoration: none;
                text-transform: capitalize;
                font-size: 15px;
                font-weight: 400;
                width: 100%;

                &:hover {
                    font-weight: 500;
                }
            }

            .line {
                position: absolute;
                top: 50%;
                left: 0px;
                height: 1px;
                width: 100%;
                background-color: var(--form-text-color);
            }
        }
    }

    .sidebar-container {
        --gap: 6.5px;
        --line-width: 27px;
        --line-height: 2px;
        --height: calc(var(--gap) * 2 + var(--line-height) * 3);
        --diagonal: calc(var(--height) * 1.41421356237);

        margin: auto 0;
        position: relative;

        .hamburger-btn {
            // Display on top of fixed sidebar
            position: absolute;
            top: 0;
            right: 0;
            // transform used to recenter
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: var(--gap);
            background: none;
            border: none;
            z-index: 200;

            &.selected {
                .hamburger-line {
                    background-color: white;

                    &:nth-child(1) {
                        rotate: 45deg;
                        translate: 0 calc(var(--line-height) / -2);
                        width: var(--diagonal);
                        transition: rotate ease-in-out 200ms,
                            translate ease-in-out 200ms, width ease-in-out 200ms;
                    }

                    &:nth-child(2) {
                        opacity: 0;
                        transition: opacity ease-in-out 200ms;
                    }

                    &:nth-child(3) {
                        rotate: -45deg;
                        translate: 0 calc(var(--line-height) / 2);
                        width: var(--diagonal);
                        transition: rotate ease-in-out 200ms,
                            translate ease-in-out 200ms, width ease-in-out 200ms;
                    }
                }
            }

            .hamburger-line {
                width: var(--line-width);
                height: var(--line-height);
                background-color: var(--text-color);
                border-radius: 20px;
                opacity: 1;
                transform-origin: left center;
                transition: rotate ease-in-out 200ms;

                &:nth-child(1),
                &:nth-child(3) {
                    transition: rotate ease-in-out 200ms,
                        translate ease-in-out 200ms, width ease-in-out 200ms;
                }

                &:nth-child(2) {
                    opacity: 1;
                    transition: opacity ease-in-out 200ms;
                }
            }
        }

        .sidebar {
            // Display on top of everything
            position: fixed;
            top: 0;
            right: -100%;
            width: 100vw;
            height: 100vh;
            background-color: var(--dark-color);
            z-index: 100;
            padding: 45px 30px 45px 30px;
            transition: right ease-in-out 200ms;

            #search-section {
                padding: 30px 0 60px 0;
                width: 100%;

                // Make search results fit within screen height and scrollable
                .results {
                    max-height: calc(100vh - 200px);
                    overflow-y: auto;
                }
            }

            .links-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 30px;

                a {
                    text-decoration: none;
                    text-transform: uppercase;
                    color: white;
                    font-weight: 400;
                    font-size: 22px;
                    letter-spacing: 0.2em;
                }
            }
        }

        .sidebar.visible {
            right: 0;
            transition: right ease-in-out 200ms;
        }
    }

    // --- DESKTOP ---
    @media (min-width: 1024px) {
        .nav {
            margin-top: 70px;
        }

        .nav-logo {
            width: 173px;
        }

        .profile-menu {
            .profile-dropdown {
                width: 120%;
                left: -10%;
                transform: translateY(110%);

                svg {
                    right: 17px;
                }
            }
        }
    }
`;

export default Wrapper;
