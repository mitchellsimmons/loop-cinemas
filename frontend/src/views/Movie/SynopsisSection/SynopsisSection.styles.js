import { styled } from 'styled-components';

const Wrapper = styled.section`
    h2 {
        margin-bottom: 30px;
    }

    p {
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 300;
        color: white;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export default Wrapper;
