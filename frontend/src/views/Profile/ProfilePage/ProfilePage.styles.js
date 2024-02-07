import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10vh 0;
    align-content: stretch;

    .vertical-container {
        display: flex;
        flex-direction: column;
        gap: 50px;
        max-width: 600px;
        flex-grow: 1;
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: var(--form-color);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        margin: 0 30px;

        @media (min-width: 640px) {
            flex-grow: 0;
        }
    }

    .input-container {
        position: relative;

        input[type='text'],
        input[type='password'] {
            background-color: #fff;
            color: var(--form-color);
            padding: 10px;
            padding-left: 15px;
            padding-right: 50px;
            border-radius: 4px;
            border: 1px solid #ddd;
            font-size: 15px;
            width: 100%;
        }

        svg {
            color: var(--form-color);
            position: absolute;
            top: 25px;
            right: 20px;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        p.error {
            color: var(--error-color);
            font-size: 14px;
            font-weight: 400;
            position: relative;
            /* height: 2px; */
            top: 5px;
        }
    }

    h2 {
        font-size: 28px;
        margin-bottom: 5px;
    }

    .info {
        display: flex;
        gap: 15px;

        span {
            font-size: 18px;

            &:first-of-type {
                font-weight: 500;
                margin-right: 10px;
            }
        }
    }

    .info + .info {
        margin-bottom: 15px;
    }

    .button-container {
        display: flex;
        gap: 15px;
        flex-direction: column;
        flex-wrap: wrap;

        @media (min-width: 640px) {
            flex-direction: row;
        }
    }

    button {
        display: inline-block;
        padding: 15px 25px;
        background-color: #349eff;
        color: #ffffff;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.3s ease, transform 0.3s ease;
        cursor: pointer;
        flex-grow: 1;
        flex-basis: min-content;

        &.cancel {
            background-color: var(--form-text-color);

            &:hover {
                background-color: #595f6e;
            }
        }

        &.delete {
            background-color: var(--error-color);
            flex-basis: 100%;

            &:hover {
                background-color: #a93728;
            }
        }

        &:hover {
            background-color: #2980b9;
        }
    }

    .reservations {
        display: flex;
        flex-direction: column;
        gap: 30px;

        h3 {
            font-size: 22px;
        }

        h5 {
            font-size: 16px;
        }
    }
`;

export default Wrapper;
