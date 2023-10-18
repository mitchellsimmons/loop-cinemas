import { getQualifiedResource } from 'api/movies';
import Wrapper from './HeroSection.styles';

const HeroSection = ({ title, resource }) => {
    return (
        <Wrapper id='hero-section'>
            <div className='img-container'>
                <img src={getQualifiedResource(resource)} alt={title} />
                <h2>{title}</h2>
            </div>
        </Wrapper>
    );
};

export default HeroSection;
