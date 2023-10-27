import React, { useState } from 'react';

const ButtonContainer: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number>(0);

  const switchToNext = (index: number) => {
    if (index !== activeButton) {
      setActiveButton(index);
    }
  };

  const buttonStyles: React.CSSProperties = {
    backgroundColor: '#fff',
    width: '20px',
    height: '20px',
    float: 'left',
    marginRight: '20px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: '0.3s ease width',
  };

  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: '0',
    left: '0',
    width: '180px',
    height: '20px',
    margin: '0 auto',
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    zIndex: 1,
  };

  return (
    <div className="container" style={containerStyles}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`button ${index === activeButton ? 'active' : ''}`}
            style={buttonStyles}
            onClick={() => switchToNext(index)}
          ></div>
        ))}
    </div>
  );
};

export default ButtonContainer;
