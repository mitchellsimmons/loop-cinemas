import styled from 'styled-components';

const Wrapper = styled.footer`
    background-color: var(--dark-color);

    .container {
        width: var(--view-width);
        max-width: var(--max-width);
        margin: 0 auto;
        padding-top: 90px;
        padding-bottom: 100px;
    }

    #footer-logo {
        width: 110px;
        margin-bottom: 30px;
    }

    #footer-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: 45px;
    }

    .footer-links-section {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 200px;

        a {
            display: block;
            text-decoration: none;
            text-transform: capitalize;
            font-size: 15px;
            font-weight: 400;
            color: var(--text-color);
        }

        #footer-contact-icons {
            display: flex;
            gap: 12px;

            svg {
                width: 22px;
                height: 22px;
            }
        }
    }
`;

export default Wrapper;
