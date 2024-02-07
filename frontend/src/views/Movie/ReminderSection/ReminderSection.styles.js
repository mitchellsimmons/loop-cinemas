import { styled } from 'styled-components';

const Wrapper = styled.section`
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        /* background-color: var(--light-color); */
        /* padding: 90px 0; */
        text-align: center;
    }

    h3 {
        /* display: inline; */
        font-size: 28px;
        text-transform: capitalize;
        margin-right: 20px;
    }

    h4 {
        display: inline;
        font-size: 20px;
        color: var(--text-color);
        text-transform: capitalize;
    }
`;

export default Wrapper;
