import React from 'react';
import Wrapper from './Modal.styles';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <Wrapper>
            <div className='modal-overlay'>
                <div className='modal-content'>
                    {children}
                    <button className='modal-close' onClick={onClose}>
                        X
                    </button>
                </div>
            </div>
        </Wrapper>
    );
}

export default Modal;
