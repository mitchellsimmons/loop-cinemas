import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import { Rating } from 'components';
import Wrapper from './Review.styles';

const Review = ({ editable, onEdit, onDelete, critic, text, rating }) => {
    return (
        <Wrapper className={`${editable && 'editable'}`}>
            <div className='top-container'>
                <Rating rating={rating} />
                {editable && (
                    <div className='actions-container'>
                        <MdEdit onClick={onEdit} />
                        <FaTrashAlt onClick={onDelete} />
                    </div>
                )}
            </div>
            <div className='review-container'>
                <div dangerouslySetInnerHTML={{__html: text}}></div>
            </div>
            <div className='critic-container'>
                <p>- {critic}</p>
            </div>
        </Wrapper>
    );
};

export default Review;
