import styled from 'styled-components';

const Wrapper = styled.section`
    width: auto;
    max-width: 200%;
    position: relative;

    .carousel-container {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        left: -10%;
        max-width: none;
        margin: 0 auto;
        height: 35vw;
        max-height: 520px;
        padding: 15px;
        margin-bottom: 30px;

        .prev-image,
        .next-image,
        .main-image {
            background-size: cover;
            background-position: center;
            transition: transform 0.3s ease-in-out;
            border-radius: 15px;
            margin: 0;
        }

        .main-image:hover {
            transform: translateX(-50%) scale(1.05);
        }

        .prev-image,
        .next-image {
            min-width: 800px;
            height: 90%;
            cursor: pointer;
            z-index: 1;
        }

        .main-image-container {
            position: relative;
            max-width: 1000px;
            height: 100%;
            flex-basis: 60%;
            flex-shrink: 0;
        }

        .main-image {
            width: 100%;
            height: 100%;
            z-index: 2;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }

        .movie-name {
            position: absolute;
            bottom: 15%;
            left: -100%;
            padding: 10px 00px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 1.5rem;
            border-radius: 5px;
            transition: all 0.3s ease-in-out;
        }

        &:hover .movie-name {
            left: 10px;
            opacity: 1;
        }
    }

    .carousel-selector {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .carousel-btn {
        width: 9px;
        height: 9px;
        border: none;
        border-radius: 5px;
        background-color: var(--form-text-color);
        cursor: pointer;
    }

    .active-btn {
        background-color: var(--primary-color);
    }
`;

export default Wrapper;
