import { styled } from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 60px;

    &.editable {
        border-radius: var(--large-border-radius);
        padding: 15px;
        background-color: var(--form-color);
    }

    &::last-child {
        margin-bottom: 0;
    }

    .top-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;

        .actions-container {
            display: flex;
            gap: 15px;

            svg {
                cursor: pointer;
            }

            svg:first-child {
                font-size: 24px;
            }

            svg:last-child {
                font-size: 20px;
                position: relative;
                top: 2px;
            }
        }
    }

    .review-container {
        margin-bottom: 30px;

        div {
            color: white;
            overflow-wrap: break-word;
        }
    }

    .critic-container {
        p {
            font-size: 16px;
            font-weight: 600;
        }
    }
`;

export default Wrapper;
