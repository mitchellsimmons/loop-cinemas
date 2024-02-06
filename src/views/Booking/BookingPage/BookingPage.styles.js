import styled from 'styled-components';

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        margin-top: 100px;
        text-align: center;

        &::before {
            margin: 0 auto;
        }
    }

    h3 {
        font-size: 26px;
    }

    h4 {
        font-size: 18px;
    }

    h5 {
        font-size: 18px;
    }

    .main-container {
        display: flex;
        flex-direction: column;
        gap: 0px;
    }

    .select-seats-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .screen-container {
        height: 130px;

        img {
            display: block;
            object-fit: cover;
            margin-top: 5px;
            min-width: 280px;
            width: 60vw;
            height: 160px;
            background: green;
            transform: perspective(400px) rotateX(-60deg);
        }
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
    }

    .seat-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 35px 0px 50px 0px;
    }

    .row {
        display: flex;
        gap: 10px;
        justify-content: center;
        position: relative;
        left: -10px;

        p {
            color: var(--primary-color);
            margin: auto 5px;
        }
    }

    .seat {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: white;
        border-radius: 10px;
        color: var(--background-color);
        font-weight: 500;
        font-size: 15px;
        cursor: pointer;
        transition: background-color ease-in-out 200ms;

        &:hover,
        &.selected {
            background-color: var(--primary-color);
            transition: background-color ease-in-out 200ms;
        }

        &.reserved {
            cursor: default;
            transform: scale(0.7);
            background-color: var(--form-color);

            &:hover {
                background-color: var(--form-color);
            }
        }
    }

    .btn {
        margin-bottom: 200px;
    }

    @media (min-width: 640px) {
        .screen-container {
            img {
                width: 400px;
            }
        }
    }

    @media (min-width: 1024px) {
        .main-container {
            flex-direction: row;
            gap: 150px;
        }
    }
`;

export default Wrapper;
