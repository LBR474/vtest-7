import React, { ReactElement, useState, useEffect } from "react";

//import styled from "@emotion/styled";
import { gsap } from "gsap";

//import "../styles/main.scss";
import { useNavigate } from "react-router-dom";

type TailingProps = {
  title: string;
  fillColor: string;
  loggedIn: boolean;
};


const Tailing = ({
  title,
  fillColor,
  loggedIn,
}: TailingProps): ReactElement => {
  
  useEffect(() => {
   
    gsap.to(".titleDiv", {
      duration: 2,
      ease: "power2.in",
      opacity: 1,
      delay: 0,
      onComplete: () => {
        console.log("Animation complete")

      }
    });
  }, []);

  return (
    <div className="titleDiv">
      <h1>
        MC Software Solutions - for all your secure, distributed-application
        programming needs
      </h1>
    </div>
  );
};

export default Tailing;
