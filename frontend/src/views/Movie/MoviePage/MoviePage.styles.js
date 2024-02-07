import { styled } from 'styled-components';

const Wrapper = styled.div`
    #search-section {
        margin-bottom: 60px;
    }

    #hero-section {
        margin-bottom: 75px;
    }

    #booking-section {
        margin-bottom: 75px;
    }

    #reminder-section {
        margin-bottom: 75px;
    }

    #synopsis-section {
        margin-bottom: 75px;
    }

    #details-section {
        margin-bottom: 75px;
    }

    #reviews-section {
        margin-bottom: 75px;
    }

    @media (min-width: 1024px) {
        #hero-section {
            margin-bottom: 90px;
        }
    }
`;

export default Wrapper;
