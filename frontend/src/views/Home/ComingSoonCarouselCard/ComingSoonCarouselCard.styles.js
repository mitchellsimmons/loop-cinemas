import styled from 'styled-components';

const Wrapper = styled.div`
    a {
        text-decoration: none;
        color: var(--text-color);
    }

    img {
        height: 202px;
        object-fit: cover;
        border-radius: var(--large-border-radius);
        transition: transform ease-in-out 300ms;
    }

    h3 {
        font-size: 32px;
        font-weight: 500;
        letter-spacing: 0.04em;
        transition: color ease-in-out 200ms;
    }

    .img-container {
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
