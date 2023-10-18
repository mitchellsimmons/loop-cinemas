import { FaStarHalf, FaStar } from 'react-icons/fa';

import Wrapper from './RatingSelector.styles';

const RatingSelector = ({ rating, setRating }) => {
    let stars = [];

    for (let i = 0; i < 5; ++i) {
        stars.push(
            <div key={i} className={`star-container`}>
                <FaStarHalf
                    className={`half-star ${i + 0.5 <= rating && 'selected'}`}
                    onClick={() => setRating(i + 0.5)}
                />
                <FaStar
                    className={`star ${i + 1 <= rating && 'selected'}`}
                    onClick={() => setRating(i + 1)}
                />
            </div>
        );
    }

    return <Wrapper>{stars}</Wrapper>;
};

export default RatingSelector;
