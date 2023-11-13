import React, { useState } from 'react';

import { getQualifiedResource, useFetchShowing } from '@/api/movies';
import Wrapper from './HeroCarousel.styles';

const CARD_COUNT = 5;

const HeroCarousel = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);
    const { isLoading, isError, data } = useFetchShowing();

    if (isLoading || isError) {
        return;
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + data.length) % data.length);
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % data.length);
    };

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

    return (
        <Wrapper id='hero-carousel'>
            <div className='carousel-container'>
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
            </div>
            <div className='carousel-selector'>{getButtons()}</div>
        </Wrapper>
    );
};

export default HeroCarousel;
