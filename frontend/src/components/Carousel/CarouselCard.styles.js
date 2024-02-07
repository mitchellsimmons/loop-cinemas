import styled from 'styled-components';

const Wrapper = styled.article`
    flex: 1 0 calc(var(--card-width-1) + 2 * var(--padding));
    padding: var(--padding);
    top: calc(-1 * var(--padding));
    left: calc(-1 * var(--padding));

    // If we have 10 items in a list and we are snapping to every 3rd item,
    // then the 10th item will not display by itself but instead the 8th, 9th, and 10th items
    // will be displayed. By making the last child take up all remaining space,
    // we can ensure it takes up the full page.
    &:last-child {
        flex: 1 0 100%;
    }

    @media (max-width: 639px) {
        scroll-snap-align: start;
    }

    @media (min-width: 640px) and (max-width: 1024px) {
        flex: 1 0 calc(var(--card-width-2) + 2 * var(--padding));

        &:nth-child(2n + 1) {
            scroll-snap-align: start;
        }

        &:last-child .container {
            width: var(--card-width-2);
        }
    }

    @media (min-width: 1024px) {
        flex: 1 0 calc(var(--card-width-3) + 2 * var(--padding));

        &:nth-child(3n + 1) {
            scroll-snap-align: start;
        }

        &:last-child .container {
            width: var(--card-width-3);
        }
    }
`;

export default Wrapper;
