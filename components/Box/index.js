import React, { useMemo, useRef, useState } from "react";
import { MeshProps, useFrame } from "react-three-fiber";

let BoxProps = {
    size: [1, 1, 1],
    color: '#FFFFFF',
    boxSpeed: 0.01,
  } & MeshProps;

const Box = ({ size = [1, 1, 1], color = '#FFFFFF', boxSpeed = 0.01, ...meshProps }) => {
  const boxRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // It is react-three-fiber way to trigger animation
  // each frame we are changing x, y, z rotation of our box
  useFrame(() => {
    if (!boxRef.current) {
      return;
    }
    boxRef.current.rotation.x += boxSpeed;
    boxRef.current.rotation.y += boxSpeed;
  });

  //It is color memo which indicates state of an item
  const calculatedColor = useMemo(() => {
    if (isSelected && isHovered) {
      return "orange";
    }
    if (isSelected) {
      return "yellow";
    }
    if (isHovered && !isSelected) {
      return "red";
    }
    return color;
  }, [color, isHovered, isSelected]);

  return (
    <mesh
      {...meshProps}
      ref={boxRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected((prev) => !prev)}
      scale={isSelected ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
        <boxGeometry args={size} />
        <meshStandardMaterial color={calculatedColor} />
    </mesh>
  );
};

export default Box;
