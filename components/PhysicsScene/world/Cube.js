import { useBox } from "@react-three/cannon";

const Cube = (props) => {
  const [ref, api] = useBox(() => ({ mass: 1, ...props }));
  return (
    <mesh
      onClick={() => {
        api.applyImpulse([0, 5, -10], [0, 0, 0]);
      }}
      ref={ref}
    >
      <boxGeometry />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export default Cube;
