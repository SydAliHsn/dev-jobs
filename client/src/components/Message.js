import React from 'react';

const Message = ({ content }) => {
  return (
    <div className="message">
      <span className="message__content">
        <i className="fa-solid fa-circle-exclamation"></i>
        {content}
      </span>
    </div>
  );
};

export default Message;
