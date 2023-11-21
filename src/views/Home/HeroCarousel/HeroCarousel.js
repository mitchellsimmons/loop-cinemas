import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { InView } from 'react-intersection-observer';

import { getQualifiedResource, useFetchShowing } from '@/api/movies';
import Wrapper from './HeroCarousel.styles';

const CARD_COUNT = 6;

const HeroCarousel = () => {
    const [cardIndex, setCardIndex] = useState(CARD_COUNT);
    const { isLoading, isError, data } = useFetchShowing();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [carouselItemsContainer, setCarouselItemsContainer] = useState(null);

    // useEffect(() => {
    //     if (data) {
    //         setMovies(
    //             data
    //                 .slice(0, CARD_COUNT)
    //                 .concat(data.slice(0, CARD_COUNT))
    //                 .map((movie, index) => [movie, index])
    //         );
    //     }
    // }, [data]);

    const handleScroll = (event) => {
        let cards = carouselItemsContainer.querySelectorAll('.carousel-card');

        const minScroll =
            cards[CARD_COUNT - 3].offsetLeft +
            cards[CARD_COUNT - 3].clientWidth / 2 -
            document.documentElement.clientWidth / 2;

        const maxScroll =
            cards[CARD_COUNT + 3].offsetLeft +
            cards[CARD_COUNT + 3].clientWidth / 2 -
            document.documentElement.clientWidth / 2;

        // const maxScroll =
        //     cards[CARD_COUNT + 3].offsetLeft -
        //     document.documentElement.clientWidth / 2;

        console.log(minScroll);
        console.log(maxScroll);
        console.log(carouselItemsContainer.scrollLeft);

        if (carouselItemsContainer.scrollLeft < minScroll) {
            event.preventDefault();

            const scrollDelta =
                cards[CARD_COUNT + 3].offsetLeft -
                document.documentElement.clientWidth / 2;

            carouselItemsContainer.scroll({
                left: scrollDelta,
            });
        } else if (carouselItemsContainer.scrollLeft > maxScroll) {
            event.preventDefault();

            const scrollDelta =
                cards[CARD_COUNT - 3].offsetLeft -
                document.documentElement.clientWidth / 2;

            carouselItemsContainer.scroll({
                left: scrollDelta,
            });
        }
    };

    useEffect(() => {
        // Unmounted
        if (!carouselItemsContainer) {
            return;
        }

        // On mount scroll the carousel to the initial card
        let cards = carouselItemsContainer.querySelectorAll('.carousel-card');

        const scrollDelta =
            cards[cardIndex].offsetLeft -
            document.documentElement.clientWidth / 2;

        carouselItemsContainer.scrollTo({
            left: scrollDelta,
        });

        setTimeout(() => {
            setHasLoaded(true);
        }, 100);

        carouselItemsContainer.addEventListener('scroll', handleScroll);
    }, [carouselItemsContainer]);

    useEffect(() => {
        if (!carouselItemsContainer) {
            return;
        }

        let cards = carouselItemsContainer.querySelectorAll('.carousel-card');

        for (let i = 0; i < cards.length; ++i) {
            const card = cards[i];
            let span = card.querySelector('.movie-name');

            if (i === cardIndex) {
                span.classList.add('show');
            } else {
                span.classList.remove('show');
            }
        }
        // cards[CARD_COUNT + 3].classList.add('no-animate');
        // cards[CARD_COUNT - 3].classList.add('no-animate');

        // if (cardIndex < CARD_COUNT) {
        //     cards[CARD_COUNT + 3].classList.add('no-animate');
        //     setTimeout(() => {
        //         cards[CARD_COUNT - 3].classList.remove('no-animate');
        //     }, 2000);
        // } else if (cardIndex > CARD_COUNT) {
        //     cards[CARD_COUNT - 3].classList.add('no-animate');
        //     setTimeout(() => {
        //         cards[CARD_COUNT + 3].classList.remove('no-animate');
        //     }, 2000);
        // }
    }, [cardIndex]);

    if (isLoading || isError) {
        return;
    }

    const movies = data.slice(0, CARD_COUNT).concat(data.slice(0, CARD_COUNT));

    const getButtons = () => {
        let buttons = [];

        for (let i = 0; i < CARD_COUNT; ++i) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`carousel-btn ${
                        i === cardIndex && 'active-btn'
                    }`}
                ></button>
            );
        }

        return buttons;
    };

    // Update card index when a card is scrolled into view
    const handleInView = (inView, entry, index) => {
        // If the screen is wide enough, it is possible there are multiple cards in view
        // Therefore we will check for the central card
        const viewportCenter = document.documentElement.clientWidth / 2;

        const centerImage = document.elementFromPoint(
            viewportCenter,
            entry.boundingClientRect.y +
                entry.boundingClientRect.height * 0.9999
        );

        console.log(index);
        console.log(centerImage);
        if (!(centerImage instanceof HTMLImageElement)) {
            return;
        }

        if (hasLoaded && centerImage) {
            setCardIndex(Number(centerImage.dataset.index));
        }
    };

    return (
        <Wrapper id='hero-carousel'>
            {/* <div className='carousel-container'>
                <div
                    className='prev-image'
                    onClick={prevImage}
                    style={{
                        backgroundImage: `url(${getQualifiedResource(
                            data[(currentImage - 1 + data.length) % data.length]
                                .resource
                        )})`,
                    }}
                ></div>
                <div className='main-image-container'>
                    <div
                        className='main-image'
                        style={{
                            backgroundImage: `url(${getQualifiedResource(
                                data[currentImage].resource
                            )})`,
                        }}
                    >
                        <span className='movie-name'>
                            {data[currentImage].title}
                        </span>
                    </div>
                </div>
                <div
                    className='next-image'
                    onClick={nextImage}
                    style={{
                        backgroundImage: `url(${getQualifiedResource(
                            data[(currentImage + 1) % data.length].resource
                        )})`,
                    }}
                ></div>
            </div> */}
            <div className='carousel-container' ref={setCarouselItemsContainer}>
                {movies.map(({ title, titleShort, resource }, index) => {
                    return (
                        <Link
                            key={index}
                            to={`/movies/${encodeURIComponent(titleShort)}`}
                            className={`carousel-card ${
                                cardIndex === index ? 'main-card' : ''
                            } ${cardIndex - 1 === index ? 'prev-card' : ''} ${
                                cardIndex + 1 === index ? 'next-card' : ''
                            } ${
                                index < CARD_COUNT - 3 || index > CARD_COUNT + 3
                                    ? 'no-snap'
                                    : ''
                            } ${
                                (cardIndex === CARD_COUNT - 3 ||
                                    cardIndex === CARD_COUNT + 3) &&
                                (index === CARD_COUNT - 3 ||
                                    index === CARD_COUNT + 3)
                                    ? 'force-scale'
                                    : ''
                            } ${
                                cardIndex === CARD_COUNT - 3 ||
                                cardIndex === CARD_COUNT + 3
                                    ? 'force-opacity'
                                    : ''
                            }`}
                        >
                            <InView
                                as='div'
                                // The entire bounding rect must be intersecting the viewport
                                // threshold={1}
                                // Shrink the bounding rect so that only the bottom needs to be visible
                                // The observer should still be triggered if the top is cut off (ie. as long as the entire width is visible)
                                rootMargin='99.99% 0% 0% 0%'
                                onChange={(inView, entry) =>
                                    handleInView(inView, entry, index)
                                }
                                className='image-container'
                            >
                                <img
                                    src={getQualifiedResource(resource)}
                                    alt={titleShort}
                                    data-index={index}
                                />
                                <span className='movie-name'>{title}</span>
                            </InView>
                        </Link>
                    );
                })}
            </div>
            <div className='carousel-selector'>{getButtons()}</div>
        </Wrapper>
    );
};

export default HeroCarousel;
