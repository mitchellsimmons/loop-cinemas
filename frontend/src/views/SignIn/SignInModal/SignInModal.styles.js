import { styled } from 'styled-components';

const Wrapper = styled.div`
    display: none;

    &.visible {
        display: block !important;
    }
`;

export default Wrapper;
