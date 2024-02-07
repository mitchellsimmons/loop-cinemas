import { useEffect, useRef, useState } from 'react';

import { CarouselCard } from 'components';
import { useMediaContext } from '@/context/MediaProvider';
import Wrapper from './Carousel.styles';

const Carousel = ({ children }) => {
    const { isTablet, isDesktop } = useMediaContext();
    const [pageIndex, setPageIndex] = useState(0);
    const carouselItemsContainer = useRef();

    // Reset the page index when the media changes
    useEffect(() => setPageIndex(0), [isTablet, isDesktop]);

    let cardsPerPage;
    // Display selector button for every three cards
    if (isDesktop) cardsPerPage = 3;
    // Display selector button for every two cards
    else if (isTablet) cardsPerPage = 2;
    // Display selector button for every card
    else cardsPerPage = 1;
    let cardCount = children.length;
    let pageCount = Math.ceil(cardCount / cardsPerPage);

    // Update page index when page button is clicked
    const handleClick = (index) => {
        // setPageIndex(index);

        // Scroll to the first card on the current page
        let firstCardIndex = index * cardsPerPage;
        let cards =
            carouselItemsContainer.current.querySelectorAll('.carousel-card');

        carouselItemsContainer.current.scrollTo({
            left: cards[firstCardIndex].offsetLeft,
            behavior: 'smooth',
        });
    };

    // Update page index when the last card on the the page is scrolled into view
    const handleInView = (inView, entry, cardIndex) => {
        if (inView) {
            setPageIndex(Math.ceil((cardIndex + 1) / cardsPerPage) - 1);
        }
    };

    const getButtons = () => {
        let buttons = [];

        for (let i = 0; i < pageCount; ++i) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`carousel-btn ${
                        i === pageIndex && 'active-btn'
                    }`}
                ></button>
            );
        }

        return buttons;
    };

    return (
        <Wrapper>
            <div className='carousel-items' ref={carouselItemsContainer}>
                {children.map((child, index) => {
                    return (
                        <CarouselCard
                            key={index}
                            lastOnPage={
                                (index + 1) % cardsPerPage === 0 ||
                                index === children.length - 1
                            }
                            handleInView={(inView, entry) =>
                                handleInView(inView, entry, index)
                            }
                        >
                            {child}
                        </CarouselCard>
                    );
                })}
            </div>
            <div className='carousel-selector'>{getButtons()}</div>
        </Wrapper>
    );
};

export default Carousel;
