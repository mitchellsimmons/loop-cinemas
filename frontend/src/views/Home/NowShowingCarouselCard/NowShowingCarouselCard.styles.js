import styled from 'styled-components';

const Wrapper = styled.div`
    a {
        text-decoration: none;
        color: var(--text-color);
    }

    img {
        height: 202px;
        object-fit: cover;
        transition: transform ease-in-out 300ms;
    }

    h3 {
        margin-bottom: 15px;
        font-size: 32px;
        font-weight: 500;
        letter-spacing: 0.04em;
        transition: color ease-in-out 200ms;
    }

    #rating-container {
        display: flex;
        gap: 20px;

        svg {
            font-size: 14px;
        }
    }

    #times-container {
        position: relative;

        #absolute-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        a {
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 500;
            color: var(--form-text-color);
            background-color: var(--form-color);
            padding: 6px 12px;
            border-radius: var(--small-border-radius);
            transition: color ease-in-out 200ms, transform ease-in-out 200ms;

            &:hover {
                color: white;
                transition: color ease-in-out 200ms, transform ease-in-out 200ms;
                transform: scale(1.1);
            }
        }
    }

    #img-container {
        margin-bottom: 15px;
        /* Allow child to scale within bounds */
        overflow: hidden;
        border-radius: var(--large-border-radius);
        /* This solves issue in Safari, where border radius does not apply when transforming img */
        transform: translate3d(0, 0, 0);
    }

    &:hover h3 {
        color: white;
        transition: color ease-in-out 200ms;
    }

    &:hover img {
        transform: scale(1.1);
        transition: transform ease-in-out 300ms;
    }
`;

export default Wrapper;
