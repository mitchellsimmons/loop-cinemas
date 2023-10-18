import { Link } from 'react-router-dom';

import { getQualifiedResource } from 'api/movies';
import Wrapper from './ComingSoonCarouselCard.styles';

const ComingSoonCarouselCard = ({ titleShort, resource, rating, release }) => {
    const releaseDate = new Date(release);
    const releaseDateStr = releaseDate.toLocaleString('default', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    return (
        <Wrapper>
            <Link to={`/movies/${encodeURIComponent(titleShort)}`}>
                <div className='img-container'>
                    <img
                        src={getQualifiedResource(resource)}
                        alt={titleShort}
                    />
                </div>
                <h4>
                    {rating} &nbsp;|&nbsp; {`${releaseDateStr}`}
                </h4>
                <h3>{titleShort}</h3>
            </Link>
        </Wrapper>
    );
};
export default ComingSoonCarouselCard;
