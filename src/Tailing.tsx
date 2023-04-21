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
      
    });
  }, []);

  return (
    
      
        <div className="titleDiv">
          <h1>Let me integrate a Blender 3D model with your react project</h1>
        </div>
      
    
  );
};

export default Tailing;
