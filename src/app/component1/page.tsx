"use client";

import Header from '../components/Header';
import { useState, useEffect } from 'react';

const MouseTracker = ({ render }: {render: (x: number) => React.ReactNode}) => {
  const [x, setX] = useState(0);

  const handleMouseMove = (event: MouseEvent) => {
    setX(event.clientX);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return render(x);
};

// Usage of MouseTracker with render props
const Component1 = () => {
  return (
    <div>
      <Header />
      <h1>Mouse Tracker</h1>
      <MouseTracker render={(x) => (
        <div>
          <XCoordinate x={x} negative={false} />
          <XCoordinate x={x} negative={true} />
        </div>
      )} />
    </div>
  )
};

const XCoordinate = ({ x, negative }: { x: number, negative: boolean }) => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const fillWidth = Math.min((Math.abs(x) / windowWidth) * 200, 200);
  
    const barStyle = {
      width: '200px',
      height: '20px',
      border: '1px solid black',
      padding: '3px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'white',
    };

    const innerBarStyle = {
      width: '100%',
      height: '100%',
      position: 'relative',
    };
  
    const fillStyle = {
      width: `${fillWidth - 8}px`, // Subtract padding (3px on each side)
      height: '100%',
      backgroundColor: 'red',
      position: 'absolute',
      top: '0',
      left: !negative ? '0' : 'unset',
      right: negative ? '0' : 'unset',
    };
  
    return (
      <div>
        {negative ? '-' : ''}X Coordinate: {negative ? '-' : ''}{x}
        <div style={barStyle}>
          <div style={innerBarStyle}>
            <div style={fillStyle}></div>
          </div>
        </div>
      </div>
    );
  };

export default Component1;
