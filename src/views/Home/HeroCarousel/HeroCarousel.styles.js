import styled from 'styled-components';

const Wrapper = styled.section`
    width: auto;
    max-width: 200%;
    position: relative;

    .carousel-container {
        overflow: scroll;
        scroll-snap-type: x mandatory;
        display: flex;
        align-items: center;
        justify-content: left;
        gap: 70px;
        /* left: -10%; */
        /* max-width: none; */
        /* margin: 0 auto; */
        height: 35vw;
        max-height: 520px;
        /* padding: 15px; */
        margin-bottom: 30px;

        // Hide scrollbars
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
        }

        img {
            border-radius: 15px;
            height: 100%;
            object-fit: cover;
        }

        .carousel-card {
            min-width: 800px;
            height: 90%;
            cursor: pointer;
            z-index: 1;
            scroll-snap-align: center;

            opacity: 0;
            scale: 1;
            transition: scale ease-in-out 200ms, opacity ease-in-out 200ms;
        }

        .main-card {
            scale: 1.1;
            /* transition: scale ease-in-out 200ms; */
            z-index: 2;
        }

        .main-card,
        .prev-card,
        .next-card {
            opacity: 1;
            transition: scale ease-in-out 200ms, opacity ease-in-out 200ms;
        }

        .image-container {
            height: 100%;
            position: relative;
        }

        .movie-name {
            left: 10px;
            /* opacity: 1; */
            /* transition: opacity ease-in-out 200ms; */
        }

        .movie-name {
            /* display: none; */
            opacity: 0;
            position: fixed;
            bottom: 15%;
            left: -100%;
            left: 10px;
            padding: 10px 00px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 1.5rem;
            border-radius: 5px;
            /* transition: all 0.3s ease-in-out; */
            /* transition: opacity ease-in-out 200ms; */
        }

        .show {
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
