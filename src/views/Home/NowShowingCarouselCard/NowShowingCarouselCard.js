import { Link } from 'react-router-dom';

import { Rating } from 'components';
import { getQualifiedResource } from '@/api/movies';
import Wrapper from './NowShowingCarouselCard.styles';

const NowShowingCarouselCard = ({
    day,
    starRating,
    titleShort,
    resource,
    times,
    rating,
}) => {
    return (
        <Wrapper>
            <Link to={`/movies/${encodeURIComponent(titleShort)}`}>
                <div id='img-container'>
                    <img
                        src={getQualifiedResource(resource)}
                        alt={titleShort}
                        loading='lazy'
                    />
                </div>
                <div id='rating-container'>
                    <h4>{rating}</h4>
                    <Rating rating={starRating} />
                </div>
                <h3>{titleShort}</h3>
                <div id='times-container'>
                    {times
                        .filter((time) => time.day === day)
                        .map((time, index) => {
                            return <p key={index}>{time.time}</p>;
                        })}
                </div>
            </Link>
        </Wrapper>
    );
};
export default NowShowingCarouselCard;
