import styled from 'styled-components';

const Wrapper = styled.section`
    background-color: var(--light-color);
    margin: 0;
    /* Override global width values */
    width: 100%;
    max-width: 100%;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        background-color: var(--light-color);
        padding: 90px 0;
        text-align: center;
    }

    h2 {
        color: var(--background-color);
    }

    h2::before {
        display: none;
    }

    p {
        color: var(--background-color);
        max-width: 531px;
        font-weight: 400;
    }
`;

export default Wrapper;
