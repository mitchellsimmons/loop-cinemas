import { styled } from 'styled-components';

const Wrapper = styled.div`
    position: relative;

    input[type='text'] {
        width: 100%;
        z-index: 200;
    }

    .overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        z-index: 100;
    }

    .results {
        display: none;
        position: absolute;
        top: 61px;
        padding: 15px;
        width: 100%;
        background-color: var(--background-color);
        border-radius: var(--large-border-radius);
        z-index: 200;

        @media (min-width: 640px) {
            padding: 33px;
        }

        article {
            padding: 15px 0;
            border-bottom: 1px solid var(--form-color);

            &:hover h3,
            &:hover p {
                color: white;
                transition: color ease-in-out 200ms;
            }

            &:hover img {
                transform: scale(1.1);
                transition: transform ease-in-out 300ms;
            }
        }

        article:first-child {
            padding-top: 0;
        }

        article:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }

        a {
            display: flex;
            flex-direction: column;
            gap: 15px;
            text-decoration: none;
            color: var(--text-color);

            @media (min-width: 640px) {
                flex-direction: row;
            }
        }

        .img-container {
            width: 100%;
            height: 180px;
            border-radius: var(--large-border-radius);
            overflow: hidden;
            flex-shrink: 0;
            /* This solves issue in Safari, where border radius does not apply when transforming img*/
            transform: translate3d(0, 0, 0);

            @media (min-width: 640px) {
                width: 240px;
                height: 140px;
            }
        }

        img {
            object-fit: cover;
            height: 100%;
            transition: transform ease-in-out 300ms;
        }

        h3 {
            margin-bottom: 5px;
            font-size: 22px;
            font-weight: 500;
            letter-spacing: 0.04em;
            transition: color ease-in-out 200ms;

            @media (min-width: 1024px) {
                font-size: 30px;
                margin-bottom: 10px;
            }
        }

        #rating-container {
            display: flex;
            gap: 20px;

            h4 {
                margin-bottom: 5px;

                @media (min-width: 1024px) {
                    margin-bottom: 10px;
                }
            }
        }

        p {
            font-size: 16px;
            font-weight: 400;
            color: var(--form-text-color);
            transition: color ease-in-out 200ms;

            // Truncate description after 3 lines
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }

    /* Displays the overlay when the input is clicked */
    .show {
        display: block;
    }

    /* In order for the input to be displayed above the overlay, it must be taken out of the document flow */
    input[type='text']:focus {
        position: absolute;
    }

    /* When the input is removed from the document flow, we must fill in the space left behind */
    .show ~ .spacer {
        height: 51px;
    }
`;

export default Wrapper;
