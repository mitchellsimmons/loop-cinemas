import { Carousel } from 'components';
import { ComingSoonCarouselCard } from 'views/Home';
import { useFetchUpcoming } from 'api/movies';
import Wrapper from './ComingSoonSection.styles';

const ComingSoonSection = () => {
    const {
        isLoading,
        isError,
        data: movies,
    } = useFetchUpcoming();

    if (isLoading || isError) {
        return;
    }

    const getCarouselContents = () => {
        return movies.map((movie, index) => {
            return <ComingSoonCarouselCard key={index} {...movie} />;
        });
    };

    return (
        <Wrapper id='coming-soon-section'>
            <h2>coming soon</h2>
            <Carousel>{getCarouselContents()}</Carousel>
        </Wrapper>
    );
};

export default ComingSoonSection;
