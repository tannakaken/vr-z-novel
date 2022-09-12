import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3Tuple } from "three";
import { Interactive } from "@react-three/xr";

const BoxButton = (props: {
  position?: Vector3Tuple;
  onClick?: () => void;
}) => {
  const ref = useRef<Mesh>(null);
  const [speed, setSpeed] = useState(0.01);
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.x += speed;
    }
  });
  return (
    <Interactive
      onHover={() => {
        setSpeed(0.05);
      }}
      onBlur={() => {
        setSpeed(0.01);
      }}
    >
      <mesh
        {...props}
        ref={ref}
        onClick={() => props.onClick?.()}
        onPointerOver={() => setSpeed(0.03)}
        onPointerOut={() => setSpeed(0.01)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={
            speed === 0.05 ? "lightblue" : speed === 0.03 ? "hotpink" : "orange"
          }
        />
      </mesh>
    </Interactive>
  );
};

export default BoxButton;
