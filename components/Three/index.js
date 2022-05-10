import styles from "./Three.module.css";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { useState, useRef } from "react";
import Box from "../Box";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const Three = () => {
  const [speedFactor, setSpeedFactor] = useState(1);
  return (
    <div className={styles.container}>
      <label htmlFor="speedFactor">
        Speed factor:
        <input
          name="speedFactor"
          type="range"
          value={speedFactor}
          min={1}
          max={10}
          step={0.1}
          onChange={(e) => setSpeedFactor(+e.currentTarget.value)}
        />
      </label>
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <CameraControls />
        {/* We declare three.js object lowerCase without importing */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <pointLight intensity={1.0} position={[10, 10, 10]} />
        {/* <mesh position={[0, 0, -1]}>
                <boxGeometry args={[1, 1, 1]}/>
                <meshStandardMaterial color='#BADA55'/>
            </mesh> */}
        <Box
          position={[-2, 1, 0]}
          rotation={[3, 1, 0]}
          size={[1, 2, 2]}
          color="hotpink"
          boxSpeed={0.02 * speedFactor}
        />
        <Box
          position={[2, 1, 0]}
          rotation={[1, 1, 0]}
          size={[1, 2, 2]}
          color="cyan"
          boxSpeed={0.01 * speedFactor}
        />
        <Box
          position={[0, -1, 0]}
          size={[1, 2, 2]}
          boxSpeed={0.005 * speedFactor}
        />
      </Canvas>
    </div>
  );
};

export default Three;
