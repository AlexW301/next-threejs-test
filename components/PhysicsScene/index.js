import { Canvas } from "react-three-fiber";
import { Physics } from "@react-three/cannon";
import CameraControls from "./utils/CameraControls"
import Plane from "./world/Plane"
import Cube from "./world/Cube";

const PhysicsScene = () => {
  return (
    <div className="container">
      <Canvas className="canvas" camera={{ position: [0, 2, 5], fov: 45 }}>
        <CameraControls />
        <ambientLight intensity={0.3} color="#ffffff" />
        <pointLight intensity={1.0} position={[10, 10, 10]} />
        <Physics>
          <Plane />
          {(() => {
            const cubes = []
            for(let i = 0; i < 5; i++)
            {
              cubes.push(<Cube key={Math.random()} position={[(Math.random() - 0.5) * 15, 2, (Math.random() - 0.5) * 10]} />)
            }

            return cubes
          })()}
        </Physics>
      </Canvas>
    </div>
  );
};

export default PhysicsScene;
