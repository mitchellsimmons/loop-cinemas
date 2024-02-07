import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SearchSection } from 'components';
import {
    BookingSection,
    HeroSection,
    ReminderSection,
    SynopsisSection,
    DetailsSection,
    ReviewsSection,
} from 'views/Movie';
import { useMediaContext } from '@/context/MediaProvider';
import { useFetchMovieByTitle } from '@/api/movies';
import Wrapper from './MoviePage.styles';

const MoviePage = () => {
    let { title: shortTitle } = useParams();
    const { isDesktop } = useMediaContext();
    const {
        isLoading,
        isError,
        data: movie,
    } = useFetchMovieByTitle(
        decodeURIComponent(shortTitle),
        true, // Times
        true, // Cast
        true, // Critic reviews
        false // User reviews
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading || isError) {
        return;
    }

    const {
        id,
        title,
        resource,
        release,
        released,
        synopsis,
        rating,
        duration,
        director,
        cast,
        times,
        criticReviews,
    } = movie;

    return (
        <Wrapper>
            {isDesktop && <SearchSection />}
            <HeroSection {...{ title, resource }} />
            {released ? (
                <BookingSection times={times} />
            ) : (
                <ReminderSection release={release} />
            )}
            <SynopsisSection synopsis={synopsis.split('\n')} />
            <DetailsSection
                {...{ rating, duration, director, release, cast }}
            />
            {/* Only render review section for movies now showing */}
            {released && (
                <ReviewsSection id={id} criticReviews={criticReviews} />
            )}
        </Wrapper>
    );
};

export default MoviePage;
