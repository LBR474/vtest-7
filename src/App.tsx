import { useState, useLayoutEffect, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gsap } from "gsap";

function App() {
  const [count, setCount] = useState(0);
  const [showNewContent, setShowNewContent] = useState(false);

   useLayoutEffect(() => {
     gsap.to(".App", {
       duration: 2,
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
       });
     }
   }, [showNewContent]);

  return (
    <>
      {!showNewContent && (
        <div className="App">
          <div>
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
          <h2>New Content</h2>
          <p>This is the new content that will replace the old content.</p>
        </div>
      )}
    </>
  );
}

export default App;
