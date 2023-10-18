import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    getAverageRatingFromReviews,
    getQualifiedResource,
    useFetchMoviesByTitleQuery,
} from 'api/movies';
import { Rating } from 'components';
import Wrapper from './Search.styles';

const Search = () => {
    let searchRef = useRef();
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const { isLoading, isError, data } = useFetchMoviesByTitleQuery(
        query,
        false, // No times
        false, // No cast
        true, // Include critic reviews
        true, // Include user reviews
        4, // Limit = 4
        0 // Offset = 0
    );
    const results = isLoading || isError ? [] : data || [];

    const handleChange = (event) => {
        setQuery(event.target.value.trim());
    };

    const handleKeyDown = (event) => {
        if (event.code === 'Escape') {
            searchRef.current.blur();
        }
    };

    const handleFocus = () => {
        // Show search results
        setShow(true);
    };

    const handleBlur = (event) => {
        // Hide search results
        setShow(false);
    };

    const handleMouseDown = (event) => {
        // Prevent the search input from losing focus if the results area is clicked
        event.preventDefault();
    };

    const handleClick = () => {
        // Clear the current value
        searchRef.current.value = '';
        setQuery('');
        // Manually remove focus from the search field
        searchRef.current.blur();
    };

    return (
        <Wrapper>
            <div className={`overlay ${show && 'show'}`}></div>
            <input
                ref={searchRef}
                type='text'
                placeholder='Search movies...'
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <div
                className={`results ${show && results.length !== 0 && 'show'}`}
                onMouseDown={handleMouseDown}
            >
                {results.map(
                    ({
                        id,
                        titleShort,
                        rating,
                        overview,
                        resource,
                        criticReviews,
                        userReviews,
                    }) => {
                        const starRating = getAverageRatingFromReviews([
                            ...criticReviews,
                            ...userReviews,
                        ]);

                        return (
                            <article key={id}>
                                <Link
                                    to={
                                        '/movies/' +
                                        encodeURIComponent(titleShort)
                                    }
                                    onClick={handleClick}
                                >
                                    <div className='img-container'>
                                        <img
                                            src={getQualifiedResource(resource)}
                                            alt={titleShort}
                                        />
                                    </div>
                                    <div className='info-container'>
                                        <h3>{titleShort}</h3>
                                        <div id='rating-container'>
                                            <h4>{rating}</h4>
                                            {/* If star rating is 0, then movie is not out */}
                                            {starRating > 0 && (
                                                <Rating rating={starRating} />
                                            )}
                                        </div>
                                        <p>{overview}</p>
                                    </div>
                                </Link>
                            </article>
                        );
                    }
                )}
            </div>
            <div className='spacer'></div>
        </Wrapper>
    );
};

export default Search;
