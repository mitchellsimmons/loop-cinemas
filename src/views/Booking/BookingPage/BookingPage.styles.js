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

    h4 {
        font-size: 18px;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 50px 0;
    }

    .row {
        display: flex;
        gap: 10px;
        justify-content: center;
        position: relative;
        left: -10px;

        p {
            color: var(--primary-color);
            height: 100%;
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
        transition: background-color ease-in-out 200ms;

        &:hover,
        &.selected {
            background-color: var(--primary-color);
            transition: background-color ease-in-out 200ms;
        }

        &.reserved {
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
`;

export default Wrapper;
