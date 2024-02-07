import Wrapper from './SynopsisSection.styles';

const SynopsisSection = ({ synopsis }) => {
    return (
        <Wrapper id='synopsis-section'>
            <h2>synopsis</h2>
            {synopsis.map((paragraph, index) => {
                return <p key={index}>{paragraph}</p>;
            })}
        </Wrapper>
    );
};

export default SynopsisSection;
