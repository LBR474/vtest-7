import { useState, useLayoutEffect, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gsap } from "gsap";
import CanvasPage from "./CanvasPage";

function App() {
  const [count, setCount] = useState(0);
  const [showNewContent, setShowNewContent] = useState(false);

  useLayoutEffect(() => {
    gsap.to(".App", {
      duration: 4,
      opacity: 0,
      onComplete: () => {
        setShowNewContent(true);
      },
    });
  }, []);

  useEffect(() => {
    if (showNewContent) {
      gsap.to(".new-content", {
        opacity: 1,
        duration: 4,

        onComplete: () => {
          gsap.to(".page-content", {
            opacity: 1,
            duration: 2,
            onComplete: () => {
              gsap.to(".new-content", {
                opacity: 0,
                duration: 4,
                
              });




              
            },
          });
        },
      });

      gsap.to(".old-content", {
        opacity: 0,
        duration: 1,
      });
    }
  }, [showNewContent]);

  return (
    <>
      {!showNewContent && (
        <div className="App">
          <div className="old-content">
            {/* <p className="fontTestPar">Font test</p> */}
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          {/* <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p> */}
        </div>
      )}
      {showNewContent && (
        <div className="new-content">
          <h1>Get things moving</h1>
        </div>
      )}
      {showNewContent && (
        <div className="page-content">
          <CanvasPage title={""} loggedIn={false} />
        </div>
      )}
      
    </>
  );
}

export default App;
