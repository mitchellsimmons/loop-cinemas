import Wrapper from './Rating.styles';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating }) => {
    const starCount = Math.floor(rating);
    const halfStarCount = rating % 1 ? 1 : 0;
    const emptyStarCount = 5 - starCount - halfStarCount;

    const stars = [];
    for (let i = 0; i < starCount; ++i) {
        stars.push(<FaStar key={stars.length} />);
    }
    if (halfStarCount) {
        stars.push(<FaStarHalfAlt key={stars.length} />);
    }
    for (let i = 0; i < emptyStarCount; ++i) {
        stars.push(<FaRegStar key={stars.length} />);
    }

    return <Wrapper className='rating-container'>{stars}</Wrapper>;
};

export default Rating;
