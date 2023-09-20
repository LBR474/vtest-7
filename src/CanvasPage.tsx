import React, { useEffect, useRef, Suspense } from "react";

// component imports
import { Model } from "./Protector10";
import { StarSpheres } from "./StarSpheres";

// drei imports
import { OrbitControls } from "@react-three/drei";

// fiber imports
import { Canvas } from "@react-three/fiber";

// gsap import(s)
import gsap from "gsap";

// styles imports
import "./index.css";

// three imports
import * as THREE from "three";
import { Group } from "three";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  loggedIn: boolean;
}

const CanvasPage: React.FC<Props> = ({ title, loggedIn }) => {
  const APProtectorRef = useRef<Group>(null!);

  const starSpheresRef = useRef<Group>(null!);

  const starsRef = useRef<THREE.Points>(null!);

  const navigate = useNavigate();

  const material_3 = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0000ff),
    transparent: true,
    emissive: 0x09e0fe,
    emissiveIntensity: 2,
  });
  const material_red = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff0000),
    transparent: true,
    emissive: 0xff0000,
    emissiveIntensity: 2,
  });
  const material_black = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x000000),
    transparent: true,
    emissive: 0x000000,
    emissiveIntensity: 2,
  });

  useEffect(() => {
    const timer = (ms: number | undefined) =>
      new Promise((res) => setTimeout(res, ms));

    async function load() {
      gsap.to(APProtectorRef.current.position, {
        z: -1000,
        duration: 1,
        delay: 0,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            gsap.to('.final-content', {
              opacity: 1,
              duration: 3,
            })
          }, 3000);
        },
      });
    }
    async function stars_expand() {
      if (APProtectorRef.current) {
        const children = APProtectorRef.current.children[0].children;
        const filteredChildren = children.filter(
          (child) =>
            child.name.startsWith("RRE") ||
            child.name.startsWith("LRE") ||
            child.name.startsWith("RFE") ||
            child.name.startsWith("LFE") ||
            child.name.startsWith("tail")
        );

        // for (let i = 0; i < filteredChildren.length; i++) {
        //   const child = filteredChildren[i];

        //   (child as THREE.Mesh).material = material_3;
        //   await timer(30); // then the created Promise can be awaited
        // }
         await Promise.all(
           filteredChildren.map((child) => {
             return new Promise<void>((resolve) => {
               (child as THREE.Mesh).material = material_3;
               resolve();
             });
           })
         );

        setTimeout(() => {
          load();
        }, 500);
      }
      //
      //
      //
      //
      //
      //
      //
      //
      //

      if (starsRef.current) {
        const stars = starsRef.current;
        for (let i = 0; i < stars.children.length; i++) {
          const star = stars.children[i] as THREE.Points;

          // Convert the THREE.Points object to THREE.LineSegments
          const geometry = new THREE.BufferGeometry();
          const positionAttribute = star.geometry.getAttribute(
            "position"
          ) as THREE.BufferAttribute;
          const positions = positionAttribute.array as Float32Array;
          geometry.setAttribute("position", positionAttribute.clone());
          const indices = [];
          for (let j = 0; j < positions.length; j += 3) {
            indices.push(j, j + 1); // Add two indices for each vertex to create lines
          }
          geometry.setIndex(indices);
          const material = new THREE.LineBasicMaterial({
            color: "white",
          });
          const line = new THREE.LineSegments(geometry, material);

          // Position the line segments relative to the camera

          const distance = star.position.distanceTo(
            APProtectorRef.current.position
          );
          line.position.copy(star.position);
          let scale_setter = 0.2;
          line.scale.set(
            distance / scale_setter,
            distance / scale_setter,
            distance / scale_setter
          ); // Adjust the scale to change the length of the lines

          // Replace the star object with the line segments object
          stars.remove(star);
          stars.add(line);
        }
      }

      //
      //
      //
      //
      //
      //
      //
      //

      if (starSpheresRef.current) {
        const lines = starSpheresRef.current.children as THREE.Line[];

        // Iterate over all lines
        for (const line of lines) {
          gsap.to(line.position, {
            z: 2000,
            duration: 10,
          });

          // Cast the position attribute to a BufferAttribute
          const positionAttribute = line.geometry.getAttribute(
            "position"
          ) as THREE.BufferAttribute;

          // Get a reference to the position attribute array
          const positions = positionAttribute.array as Float32Array;

          // Modify the positions array
          for (let i = 0; i < positions.length; i += 3) {
            const z = positions[i + 2]; // Get the current z-coordinate of the vertex

            // Only modify the z-coordinate if it's within the negative z-range
            if (z < -500) {
              positions[i + 5] *= 3; // Modify the z-coordinate of each vertex
            }
            // Otherwfnavigateise, move the vertex towards positive z
            else {
              positions[i + 5] += 3000; // Modify the z-coordinate of each vertex
            }
          }

          // Update the position attribute with the modified array
          positionAttribute.needsUpdate = true;
        }
      }
    }

    //
    //
    //
    //
    //
    //

    async function Model_down() {
      if (APProtectorRef.current) {
        const children = APProtectorRef.current.children[0].children;
        const filteredChildren = children.filter((child) =>
          child.name.startsWith("tail")
        );

        for (let i = 0; i < filteredChildren.length; i++) {
          const child = filteredChildren[i] as THREE.Mesh;
          const materialArray = [material_red, material_black];

             const material = child.material as THREE.MeshStandardMaterial; // set the material to a variable

          gsap.fromTo(
            material.color,
            { r: 1, g: 0, b: 0 },
            {
              r: 0,
              g: 0,
              b: 0,
              duration: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            }
          );
        }
      }

      gsap.to(APProtectorRef.current.position, {
        y: -1,
        z: -1.5,
        duration: 5,
        delay: 0,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            stars_expand();
          }, 1000);
        },
      });
    }

    //
    ///
    //
    //
    //

    setTimeout(() => {
      Model_down();
    }, 5000);
  }, []);

  const lightRef2 = useRef<THREE.SpotLight>(null);

  return (
    <div>
      <div className="CcanvasDiv">
        <Canvas>
          <Suspense fallback={null}>
            <spotLight
              position={[0, 10, 10]}
              angle={0.15}
              penumbra={1}
              ref={lightRef2}
            />

            <group ref={starSpheresRef}>
              <StarSpheres />
            </group>
            <pointLight position={[0, 10, 10]} />
            <OrbitControls />

            <group ref={APProtectorRef} position={[0, 7, 0]}>
              <Model />
            </group>
          </Suspense>
        </Canvas>
      </div>
      <div className="final-content">
        MC Software Solutions - for all your secure-software, distributed-application programming needs
      </div>
    </div>
  );
};

export default CanvasPage;
