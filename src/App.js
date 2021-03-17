//==================
// SNAKE GAME
//==================
// PSEUDOCODE
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


import spiral from './spiral.png';
import './App.css';
import React, { useState, useEffect } from 'react';

  //====
  // HTML / XML  (INSIDE RETURN())
  // CREATE DOT/SNAKE HEAD: AN EMPTY DIV WITH HEIGHT, WIDTH, BACKGROUND-COLOR, BORDER-RADIUS, POSITION : RELATIVE (TO ITSELF)
  //====

function App() {
  //====
  // 01
  //====
  const [screenHeight, setScreenHeight] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);

  //====
  // 02
  //====
  const [theDotsHorizontalPosition, setTheDotsHorizontalPosition] = useState(null);
  const [theDotsVerticalPosition, setTheDotsVerticalPosition] = useState(null);

  //====
  // 03
  //====
  const [dotDirection, setDotDirection] = useState('right');

  //====
  // 04
  //====
  const [gameRunning, setGameRunning] = useState(false);

  //====
  // 07
  //====
  /*
  I write a getSize() function and call an addEventListener('resize', getSize) on the window in order to 'see' the units of the window change each time the screen changes size. The window registers the initial window.innerHeight and initial window.innerWidth; due to the event listener, the useEffect(getSize(),[]) registers each state change as the window resizes. NOTE THAT getSize() GETS CALLED TWICE... once in the addEventListener() call and again with useEffect(). Each time the screen changes size, the getSize() function gets called by both.
  */
  function getSize() {
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
  }


  //====
  // 13
  //====
  function handleKeyPressed(event) {
    if(event.code === 'Space') {
      console.log('Spacebar Pressed');
      setGameRunning(true);
    }
    if(event.code === 'ArrowUp') {
      console.log('ArrowUp Pressed');
      setDotDirection('up');
    }
    if(event.code === 'ArrowDown') {
      console.log('ArrowDown Pressed');  
      setDotDirection('down');
    }
    if(event.code === 'ArrowRight') {
      console.log('ArrowRight Pressed'); 
      setDotDirection('right');
    }
    if(event.code === 'ArrowLeft') {
      console.log('ArrowLeft Pressed'); 
      setDotDirection('left');
    }
  }
  
  // function handleKeyPressed(event) {
  //   switch(event) {
      
  //     case event.code === 'Space':
  //       setGameRunning(true);
  //      break;
      
  //     case event.code === 'ArrowUp':
  //       console.log('ArrowUp');
  //       break;

  //     case event.code === 'ArrowDown':
  //       console.log('ArrowDown');
  //       break;
      
  //     case event.code === 'ArrowLeft':
  //       console.log('ArrowLeft');
  //       break;
      
  //     case event.code === 'ArrowRight':
  //       console.log('ArrowRight');
  //       break;

  //     default:
  //       console.log('Press spacebar to start; press arrow keys to direct movements');  
  //   }
  // }


  //====
  // 11
  //====
  function move() {
    console.log('moved!');
    if(gameRunning) {
      setTimeout(() => {
        if(dotDirection === 'right') {
            setTheDotsHorizontalPosition(theDotsHorizontalPosition + 1);
        } else if (dotDirection === 'left') {
            setTheDotsHorizontalPosition(theDotsHorizontalPosition - 1);
        } else if (dotDirection === 'up') {
            setTheDotsVerticalPosition(theDotsVerticalPosition -1 );
        } else if (dotDirection === 'down') {
            setTheDotsVerticalPosition(theDotsVerticalPosition + 1);
        } else { 
            console.log('No Position To Set');
            
        }
      }, 100);
    }
  };
  
  //====
  // 09
  //====
  function setXY(xx, yy) {
    setTheDotsVerticalPosition(xx);
    setTheDotsHorizontalPosition(yy);
  };
  
  //====
  // 10
  //====
  //==================
  // This useEffect() monitors for a change in theDotsHorizontalPosition and/or theDotsVerticalPosition, thereby triggering move() function. Since every useEffect() function runs at least one time (regardless if there is a change in state or not), herein, the monitoring of this useEffect() looks for a VALUE (other than null) in order to call the move() function.
  //==================
  useEffect(() => {
    if(theDotsHorizontalPosition || theDotsVerticalPosition) {
     move();
    }
  }, [theDotsHorizontalPosition, theDotsVerticalPosition]);
  

  //====
  // 06
  //====
  // A call of the useEffect() function sets the initial state by, itself, calling the getSize() function.
  useEffect(() => {
    getSize()
  }, []);


  useEffect(() => {
    if(gameRunning){
      move();
    }
  }, [gameRunning]);
  

  //====
  // 08
  //====
  //==================
  // This useEffect() monitors for a change in screenHeight and/or screenWidth, thereby triggering setXY() to always set the dot's vertical and horizontal positioning to always be relative to the center of the screen/gameboard.
  //==================
  useEffect(() => {
    setXY(Math.floor(screenHeight/2), Math.floor(screenWidth/2))
  }, [screenHeight, screenWidth]);

  
  //====
  // 05
  //====
  window.addEventListener('resize', getSize);

  //====
  // 12
  //====
  document.addEventListener('keyup', handleKeyPressed);
  
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
