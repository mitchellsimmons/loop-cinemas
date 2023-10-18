import { useState } from 'react';

import { DaySelector, Carousel } from 'components';
import { getAverageRatingFromReviews, useFetchShowing } from 'api/movies';
import { NowShowingCarouselCard } from 'views/Home';
import Wrapper from './NowShowingSection.styles';

const NowShowingSection = () => {
    // Lazyily initialise the date (ie. initial render only)
    const [day, setDay] = useState(() => {
        const d = new Date();
        return d.getDay();
    });

    const {
        isLoading,
        isError,
        data: movies,
    } = useFetchShowing(true, false, true, true);

    if (isLoading || isError) {
        return;
    }

    const getCarouselContents = () => {
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

        return movies.map((movie, index) => {
            return <NowShowingCarouselCard key={index} day={day} {...movie} />;
        });
    };

    return (
        <Wrapper id='now-showing-section'>
            <h2>now showing</h2>
            <DaySelector day={day} setDay={setDay} />
            <Carousel>{getCarouselContents()}</Carousel>
        </Wrapper>
    );
};

export default NowShowingSection;
