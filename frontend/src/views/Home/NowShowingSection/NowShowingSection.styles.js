import styled from 'styled-components';

const Wrapper = styled.section`
    h2 {
        margin-bottom: 20px;
    }

    #day-selector {
        margin-bottom: 30px;
    }

    @media (min-width: 1024px) {
        h2 {
            margin-bottom: 50px;
        }
    }
`;

export default Wrapper;
