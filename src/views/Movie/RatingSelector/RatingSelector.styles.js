import { styled } from 'styled-components';

const Wrapper = styled.div`
    --star-size: 22px;
    display: flex;

    // Highlight all stars when container is hovered
    &:hover .half-star,
    &:hover .star {
        color: var(--primary-color);
    }

    .star-container {
        position: relative;

        // Make all proceeding stars grey when hovered
        &:hover ~ .star-container .half-star,
        &:hover ~ .star-container .star {
            color: var(--form-text-color);
        }

        svg {
            display: block;
            box-sizing: content-box;
            padding: 0 3px;
            font-size: var(--star-size);
            color: var(--form-text-color);
            cursor: pointer;

            &.selected {
                color: var(--primary-color);
            }

            // Display half star on top of full star
            // Must make width half then scale twice as large
            &.half-star {
                position: absolute;
                top: 0;
                left: 0;
                width: calc(var(--star-size) / 2);
                padding-right: 0;

                path {
                    transform: scale(2);
                    transform-origin: left;
                }

                // Make full star grey (right side) when half star hovered (left side)
                &:hover + .star {
                    color: var(--form-text-color);
                }
            }
        }
    }
`;

export default Wrapper;
