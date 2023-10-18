import styled from 'styled-components';

const Wrapper = styled.section`
    width: 100%;
    max-width: 100%;
    margin: 0;

    .img-container {
        position: relative;
        max-height: 527px;
        height: 50vw;
        overflow: hidden;
    }

    img {
        height: 100%;
        object-fit: cover;
    }

    .img-container::after {
        // Gradient overlay
        content: '';
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.9) 100%
        );
    }

    h2 {
        position: absolute;
        bottom: 10%;
        left: 5%;
        z-index: 10;
        width: 80%;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0;
        text-transform: none;
    }

    h2::before {
        display: none;
    }

    /* TABLET */
    @media (min-width: 640px) {
        h2 {
            font-size: 37px;
        }
    }

    /* DESKTOP */
    @media (min-width: 1024px) {
        width: var(--view-width);
        max-width: var(--max-width);
        margin: 0 auto;

        .img-container {
            border-radius: var(--large-border-radius);
        }

        h2 {
            font-size: 43px;
        }
    }
`;

export default Wrapper;
