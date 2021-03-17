import spiral from './spiral.png';
import './App.css';
import React, { useState, useEffect } from 'react';

//==================
// SNAKE GAME
//==================

//==================
// BEGINNING
// 1. Create the border of "game board" (screen window with window.innerHeight and window.innerWidth)
// 2. Create dot (element)
// 3. Initial state (start location of dot: center of window "game board"; x-axis, y-axis, reference x & y from the top-left corner)
// 4. Start the game (snake begins to move:  this could happen on the initial render or by dy action -- pressing the space bar)

// MIDDLE
// 5. Move the dot (automatically, upon pressing the space bar)
// 6  Initial direction: left to right
// 7. Change direction of the dot's movement  (key actions)

// END
// 8. Game is over -- ENDING -- when dot (head of snake) touches the border... Game Over Screen appears
//==================


function App() {
  const [theDotsHorizontalPosition, setTheDotsHorizontalPosition] = useState(null);
  const [theDotsVerticalPosition, setTheDotsVerticalPosition] = useState(null);

  const [dotDirection, setDotDirection] = useState('right');

  const [screenHeight, setScreenHeight] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);

  const [gameRunning, setGameRunning] = useState(false);

  //==================  
  // I write a getSize() function and call an addEventListener('resize', getSize) on the window in order to 'see' the units of the window change each time the screen changes size.
  // A call of the useEffect() function sets the initial state by, itself, calling the getSize() function.
  // The window registers the initial window.innerHeight and initial window.innerWidth; due to the event listener, the useEffect(getSize(),[]) registers each state change as the window resizes. NOTE THAT getSize() gets called twice... once in the addEventListener call and again with useEffect(). Each time the screen changes size, the getSize function gets called by both.
  //==================
  
  function getSize() {
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
  }

  function spacebarPressed(event) {
    if(event.code === 'Space') {
      console.log('Space Pressed');
      setGameRunning(true);
    };
  }

  function move() {
    console.log('moved!');
    //right: x+
    //left: x-
    //up: y-
    //down: y+
    setTimeout(() => {
      console.log('One Second');
      setTheDotsHorizontalPosition(theDotsHorizontalPosition + 1);
    }, 1000);
  };

  function setXY(xx, yy) {
    setTheDotsVerticalPosition(xx);
    setTheDotsHorizontalPosition(yy);
  };

  useEffect(() => {
    if(theDotsVerticalPosition || theDotsVerticalPosition) {
     // move();
    }
  }, [theDotsHorizontalPosition, theDotsVerticalPosition]);
  
  useEffect(() => {
    getSize()
  }, []);

  useEffect(() => {
    if(gameRunning){
      move();
    }
  }, [gameRunning]);
  
  useEffect(() => {
    setXY(Math.floor(screenHeight/2), Math.floor(screenWidth/2))
  }, [screenHeight, screenWidth]);

  
  window.addEventListener('resize', getSize);
  document.addEventListener('keyup', spacebarPressed);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={spiral} className="App-logo" alt="logo" />
        <h1>SNAKE GAME</h1>
      </header>
      <main className='main'>
        <div className='dot' style={{ left: theDotsHorizontalPosition, top: theDotsVerticalPosition }}></div>
        <div>h:{theDotsVerticalPosition} w:{theDotsHorizontalPosition}</div>
      </main>
    </div>
  );
 }

export default App;
