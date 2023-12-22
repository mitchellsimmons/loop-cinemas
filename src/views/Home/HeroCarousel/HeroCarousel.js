import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
    getAverageRatingFromReviews,
    getQualifiedResource,
    useFetchShowing,
} from '@/api/movies';
import Wrapper from './HeroCarousel.styles';

// Must be even number for looping transition to work
const CARD_COUNT = 6;
const HALF_CARD_COUNT = CARD_COUNT / 2;

const HeroCarousel = () => {
    // Initial card index is minimum card
    const [cardIndex, setCardIndex] = useState(HALF_CARD_COUNT);
    const { isLoading, isError, data } = useFetchShowing(
        false,
        false,
        true,
        true
    );
    const [carouselItemsContainer, setCarouselItemsContainer] = useState(null);
    const scrollInterval = useRef(null);

    const handleClick = (index) => {
        let cards = carouselItemsContainer.querySelectorAll('.carousel-card');
        const scrollDelta =
            cards[index + HALF_CARD_COUNT].offsetLeft -
            document.documentElement.clientWidth / 2;

        carouselItemsContainer.scroll({
            left: scrollDelta,
            behavior: 'smooth',
        });
    };

    // If user scrolls past min or max, then scroll position is cycled
    const handleScroll = (event) => {
        let cards = carouselItemsContainer.querySelectorAll('.carousel-card');

        const minScroll =
            cards[HALF_CARD_COUNT].offsetLeft +
            cards[HALF_CARD_COUNT].clientWidth / 2 -
            document.documentElement.clientWidth / 2;

        const maxScroll =
            cards[CARD_COUNT + HALF_CARD_COUNT].offsetLeft +
            cards[CARD_COUNT + HALF_CARD_COUNT].clientWidth / 2 -
            document.documentElement.clientWidth / 2;

        if (carouselItemsContainer.scrollLeft < minScroll) {
            event.preventDefault();

            const scrollDelta =
                cards[CARD_COUNT + HALF_CARD_COUNT].offsetLeft -
                document.documentElement.clientWidth / 2;

            carouselItemsContainer.scroll({
                left: scrollDelta,
            });
        } else if (carouselItemsContainer.scrollLeft > maxScroll) {
            event.preventDefault();

            const scrollDelta =
                cards[HALF_CARD_COUNT].offsetLeft -
                document.documentElement.clientWidth / 2;

            carouselItemsContainer.scroll({
                left: scrollDelta,
            });
        }

        if (scrollInterval?.current) {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }

        scrollInterval.current = setInterval(handleScrollInterval, 4000);

        let centerCardIndex = null;
        let smallestOffsetDistance = Number.MAX_VALUE;
        const carouselCenter =
            carouselItemsContainer.getBoundingClientRect().width / 2;

        for (const card of cards) {
            if (window.getComputedStyle(card).opacity) {
                const rect = card.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const centerOffsetDistance = Math.abs(carouselCenter - center);

                if (centerOffsetDistance < smallestOffsetDistance) {
                    smallestOffsetDistance = centerOffsetDistance;
                    centerCardIndex = Number(card.dataset.index);
                }
            }
        }

        if (centerCardIndex !== null && centerCardIndex !== cardIndex) {
            setCardIndex(centerCardIndex);
        }
    };

    const handleScrollInterval = useCallback(() => {
        if (!carouselItemsContainer) {
            return;
        }

        let cards = carouselItemsContainer.querySelectorAll('.carousel-card');
        const clientRect = carouselItemsContainer.getBoundingClientRect();

        // If the carousel is not completely visible, do nothing
        if (clientRect.top < 0) {
            return;
        }

        if (cardIndex < CARD_COUNT + HALF_CARD_COUNT) {
            const scrollDelta =
                cards[cardIndex + 1].offsetLeft -
                document.documentElement.clientWidth / 2;

            carouselItemsContainer.scroll({
                left: scrollDelta,
                behavior: 'smooth',
            });
        } else {
            let scrollDelta =
                cards[HALF_CARD_COUNT].offsetLeft -
                document.documentElement.clientWidth / 2;

            carouselItemsContainer.scroll({
                left: scrollDelta,
            });

            scrollDelta =
                cards[HALF_CARD_COUNT + 1].offsetLeft -
                document.documentElement.clientWidth / 2;

            carouselItemsContainer.scroll({
                left: scrollDelta,
                behavior: 'smooth',
            });
        }
    }, [carouselItemsContainer, cardIndex]);

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
    }, [carouselItemsContainer]);

    // useEffect(() => {
    //     if (!carouselItemsContainer) {
    //         return;
    //     }

    //     let cards = carouselItemsContainer.querySelectorAll('.carousel-card');

    //     for (let i = 0; i < cards.length; ++i) {
    //         const card = cards[i];
    //         let span = card.querySelector('.movie-name');

    //         if (i === cardIndex) {
    //             span.classList.add('show');
    //         } else {
    //             span.classList.remove('show');
    //         }
    //     }
    // }, [cardIndex]);

    useEffect(() => {
        if (!carouselItemsContainer) {
            return;
        }

        carouselItemsContainer.addEventListener('scroll', handleScroll);

        return () => {
            carouselItemsContainer.removeEventListener('scroll', handleScroll);
        };
    }, [carouselItemsContainer, cardIndex]);

    if (isLoading || isError) {
        return;
    }

    const getMovies = () => {
        const movies = [...data];

        for (const movie of movies) {
            const starRating = getAverageRatingFromReviews([
                ...movie.criticReviews,
                ...movie.userReviews,
            ]);
            movie.starRating = starRating;
        }

        // Sort movies in descending order
        movies.sort((movie1, movie2) => {
            return movie2.starRating - movie1.starRating;
        });

        // We want the first image to be at the minimum card index (ie. HALF_CARD_COUNT)
        // This way large scrolls will always snap to this image
        return movies
            .slice(HALF_CARD_COUNT, CARD_COUNT)
            .concat(movies.slice(0, CARD_COUNT))
            .concat(movies.slice(0, HALF_CARD_COUNT));
    };

    const getButtons = () => {
        let buttons = [];

        for (let i = 0; i < CARD_COUNT; ++i) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`carousel-btn ${
                        i === cardIndex - HALF_CARD_COUNT ||
                        (i === 0 && cardIndex === CARD_COUNT + HALF_CARD_COUNT)
                            ? 'active-btn'
                            : ''
                    }`}
                ></button>
            );
        }

        return buttons;
    };

    return (
        <Wrapper id='hero-carousel'>
            <div className='carousel-container' ref={setCarouselItemsContainer}>
                {getMovies().map(({ title, titleShort, resource }, index) => {
                    return (
                        <Link
                            key={index}
                            to={`/movies/${encodeURIComponent(titleShort)}`}
                            data-index={index}
                            className={`carousel-card ${
                                cardIndex === index ? 'main-card' : ''
                            } ${cardIndex - 1 === index ? 'prev-card' : ''} ${
                                cardIndex + 1 === index ? 'next-card' : ''
                            } ${
                                index < HALF_CARD_COUNT ||
                                index > CARD_COUNT + HALF_CARD_COUNT
                                    ? 'no-snap'
                                    : ''
                            } ${
                                (cardIndex === HALF_CARD_COUNT ||
                                    cardIndex ===
                                        CARD_COUNT + HALF_CARD_COUNT) &&
                                (index === HALF_CARD_COUNT ||
                                    index === CARD_COUNT + HALF_CARD_COUNT)
                                    ? 'force-scale'
                                    : ''
                            } ${
                                (cardIndex === HALF_CARD_COUNT ||
                                    cardIndex ===
                                        CARD_COUNT + HALF_CARD_COUNT) &&
                                ((index >= CARD_COUNT + HALF_CARD_COUNT - 1 &&
                                    index <=
                                        CARD_COUNT + HALF_CARD_COUNT + 1) ||
                                    (index >= HALF_CARD_COUNT - 1 &&
                                        index <= HALF_CARD_COUNT + 1))
                                    ? 'force-opacity'
                                    : ''
                            }`}
                        >
                            <div className='image-container'>
                                <img
                                    src={getQualifiedResource(resource)}
                                    alt={titleShort}
                                />
                                <span
                                    className={`movie-name ${
                                        cardIndex === index ? 'show' : ''
                                    }  ${
                                        (cardIndex === HALF_CARD_COUNT ||
                                            cardIndex ===
                                                CARD_COUNT + HALF_CARD_COUNT) &&
                                        (index === HALF_CARD_COUNT ||
                                            index ===
                                                CARD_COUNT + HALF_CARD_COUNT)
                                            ? 'show'
                                            : ''
                                    }`}
                                >
                                    {title}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className='carousel-selector'>{getButtons()}</div>
        </Wrapper>
    );
};

export default HeroCarousel;
