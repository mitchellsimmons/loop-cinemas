import { InView } from 'react-intersection-observer';

import Wrapper from './CarouselCard.styles';

const CarouselCard = ({ lastOnPage, handleInView, children }) => {
    // The InView component wraps the last card on each page
    // It tells an IntersectionObserver to monitor the element
    // When the intersection state changes, we call a function to update the page index
    return (
        <Wrapper className='carousel-card'>
            {lastOnPage ? (
                <InView
                    as='div'
                    onChange={(inView, entry) => handleInView(inView, entry)}
                    className='container'
                >
                    {children}
                </InView>
            ) : (
                <div className='container'>{children}</div>
            )}
        </Wrapper>
    );
};

export default CarouselCard;
