import { styled } from 'styled-components';

const Wrapper = styled.section`
    h2 {
        margin-bottom: 30px;
    }

    .post-container {
        position: relative;

        .quill {
            position: relative;
            width: 100%;
            margin-bottom: 30px;
        }

        p.char-counter {
            position: absolute;
            top: 23px;
            right: 23px;
            color: var(--form-text-color);
            font-size: 14px;
        }

        p.error {
            position: absolute;
            bottom: -23px;
            left: 0;
            color: var(--error-color);
            font-size: 15px;
        }
    }

    .button-rating-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;

        button {
            width: 100%;
        }
    }

    // --- DESKTOP ---
    @media (min-width: 640px) {
        .button-rating-container {
            flex-direction: row-reverse;
            align-items: center;
            justify-content: left;

            button {
                width: 267px !important;
            }
        }
    }
`;

export default Wrapper;
