import React from 'react';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  if (type === 'success') {
    return <div style={successStyle}>{message}</div>;
  }
  if (type === 'error') {
    return <div style={errorStyle}>{message}</div>;
  }

  return <div>{message}</div>;
};

export default Notification;
