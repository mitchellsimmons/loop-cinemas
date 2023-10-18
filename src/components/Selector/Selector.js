import Wrapper from './Selector.styles';

const Selector = ({ labels, index, setIndex }) => {
    return (
        <Wrapper>
            {labels.map((label, id) => {
                return (
                    <button
                        key={id}
                        className={`selector-btn ${
                            index === id && 'active-btn'
                        }`}
                        onClick={() => setIndex(id)}
                    >
                        {label}
                    </button>
                );
            })}
        </Wrapper>
    );
};

export default Selector;
