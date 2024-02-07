import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    gap: 10px;

    // Allow the selector to be scrolled
    position: relative;
    overflow: scroll;

    // Hide scrollbars
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }

    .day-btn {
        padding: 12px 28px;
        background-color: var(--form-color);
        color: var(--form-text-color);
        border: none;
        border-radius: var(--large-border-radius);
        font-size: 14px;
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
        text-transform: uppercase;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: white;
            transition: color 0.3s ease-in-out;
        }
    }

    .active-btn {
        background-color: var(--primary-color);
        color: white;
    }
`;

export default Wrapper;
