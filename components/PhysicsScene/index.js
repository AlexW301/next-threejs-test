import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { useState, useRef } from "react"
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'
import { Color } from "three";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableDamping={true}
    />
  );
};

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={'#f4fff4'} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, ...props }));
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
}

const PhysicsScene = () => {
  
  return (
    <div className="container">
      <Canvas className="canvas" camera={{ position: [0, 2, 5], fov: 45 }}>
        <CameraControls />
        <ambientLight intensity={0.3} color="#ffffff" />
        <pointLight intensity={1.0} position={[10, 10, 10]} />
        <Physics>
          <Plane />
          <Cube position={[0, 2, 0]} />
          <Cube position={[10, 0, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default PhysicsScene;
