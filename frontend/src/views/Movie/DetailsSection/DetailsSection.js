import Wrapper from './DetailsSection.styles';

const DetailsSection = ({ rating, duration, director, release, cast }) => {
    const releaseDate = new Date(release);
    const releaseDateStr = releaseDate.toLocaleString('default', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    return (
        <Wrapper id='details-section'>
            <h2>details</h2>
            <h3>rating</h3>
            <p>{rating}</p>
            <h3>duration</h3>
            <p>{duration} mins</p>
            <h3>director</h3>
            <p>{director}</p>
            <h3>release date</h3>
            <p>{releaseDateStr}</p>
            <h3>cast</h3>
            <p>{cast.join(', ')}</p>
        </Wrapper>
    );
};

export default DetailsSection;
