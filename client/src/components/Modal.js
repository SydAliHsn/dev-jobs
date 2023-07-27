import React from 'react';
import ReactDOM from 'react-dom';

// The modal-portal is inside App.js inside the body

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      className="modal"
      onClick={() => {
        props.overlayClickHandler();
      }}
    >
      <div className="container modal__container" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>,
    document.getElementById('modal-portal')
  );
};

export default Modal;
