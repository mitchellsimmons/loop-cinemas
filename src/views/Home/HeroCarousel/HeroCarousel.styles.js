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
        height: 50vh;
        max-height: 600px;

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
            min-width: 600px;
            height: 90%;
            cursor: pointer;
            z-index: 1;
        }

        .main-image-container {
            min-width: 60%;
            height: 10px;
        }

        .main-image {
            min-width: 60%;
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
`;

export default Wrapper;
