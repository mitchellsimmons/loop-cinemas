import styled from 'styled-components';

const Wrapper = styled.div`
    --flex-gap: 30px;
    --card-width-1: 100%;
    --card-width-2: calc((100% - var(--flex-gap)) / 2);
    --card-width-3: calc((100% - var(--flex-gap) * 2) / 3);

    .carousel-items {
        margin-bottom: 60px;
        display: flex;
        gap: 30px;
        overflow: scroll;
        position: relative;
        scroll-snap-type: x mandatory;

        // Hide scrollbars
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
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
