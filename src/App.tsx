import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";

import Tree from "./components/Tree";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas orthographic={false} camera={{ position: [0, 0, 40] }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Tree />
        <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
          <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
        </GizmoHelper>
        <OrbitControls makeDefault />
      </Canvas>
      <button>hello</button>
    </div>
  );
}
