import styled from 'styled-components';

const Wrapper = styled.div`
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: #292c2f;
        height: 90vh;
        width: 90vw;
        max-width: 1200px;
        border-radius: var(--large-border-radius);
        position: relative;
        overflow: hidden;

        @media (min-height: 700px) {
            height: 70vh;
        }
    }

    .modal-close {
        position: absolute;
        right: 30px;
        top: 30px;
        background-color: #292c2f;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        color: #f2f2f2;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        z-index: 2;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s;

        &:hover {
            background-color: #f2f2f2;
            color: #292c2f;
        }
    }
`;

export default Wrapper;
