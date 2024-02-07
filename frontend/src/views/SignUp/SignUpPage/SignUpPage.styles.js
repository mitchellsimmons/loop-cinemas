import { styled } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    height: 100%;

    .content-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto 8%;

        h2 {
            margin-bottom: 21px;
            text-align: center;
        }

        p {
            color: var(--form-text-color);
            font-weight: 500;

            a {
                color: var(--primary-color);
            }
        }

        .form-container {
            margin-top: 41px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            width: 100%;

            input {
                width: 100%;
            }

            .name-container {
                display: flex;
                flex-direction: column;
                gap: 30px;
                justify-content: space-between;
                max-width: 500px;
                width: 100%;
            }

            .first-name-container,
            .last-name-container {
                position: relative;
                width: 100%;
            }

            .email-container,
            .password-container {
                position: relative;
                max-width: 500px;
                width: 100%;

                svg {
                    color: var(--form-text-color);
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
            }
        }

        p.error {
            position: absolute;
            bottom: -22px;
            color: var(--error-color);
            font-size: 14px;
            font-weight: 400;
        }

        .form-container + p.error {
            display: block;
            position: initial;
            margin-top: 7px;
        }

        .btn {
            margin-top: 30px;
        }
    }

    .img-container {
        display: none;
    }

    // --- TABLET ---
    @media (min-width: 640px) {
        .content-container {
            .form-container {
                .name-container {
                    flex-direction: row;
                }
            }
        }
    }

    // --- DESKTOP ---
    @media (min-width: 1024px) {
        .content-container {
            display: block;

            h2 {
                text-align: left;
            }

            .form-container {
                align-items: start;
            }
        }

        .img-container {
            display: block;
            flex: 1;
            position: relative;
            overflow: hidden;

            &::after {
                // Gradient overlay
                content: '';
                position: absolute;
                display: inline-block;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to left, transparent, #292c2f 100%);
            }

            img {
                height: 100%;
                object-fit: cover;
                /* background: linear-gradient(to right, transparent, #292c2f 100%);
                background-size: 100% 110%, cover; */
                transform: scaleX(-1);
            }
        }
    }
`;

export default Wrapper;
