import * as THREE from "three";
import Branch from "./Branch";
import { Line } from "@react-three/drei";
import { useControls } from "leva";
import useStore from "../useStore";
import addCustomBranch from "../lib/addCustomBranch";
import CustomBranches from "./CustomBranches";

const TreeBase = () => {
  const addLine = useStore(
    (state) => state.addLine
  );

  const { depth, numPoints, degrees } =
    useControls({
      depth: {
        label: "Depth",
        value: 4,
        min: 1,
        max: 5,
        step: 1,
      },
      // Number of branches off each parent branch
      numPoints: {
        label: "Branches",
        value: 4,
        min: 1,
        max: 5,
        step: 1,
      },
      degrees: {
        label: "Degrees",
        value: 30,
        min: 20,
        max: 60,
        step: 1,
      },
    });

  const points = [
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(0, 10, 0),
  ];

  return (
    <>
      {/* TREE BASE */}
      <Line
        points={points}
        color="sienna"
        lineWidth={7}
        onClick={(e) =>
          addCustomBranch({
            selectedPoint: e.point,
            linePoints: points,
            degrees,
            addLine,
          })
        }
        onPointerOver={() =>
          (document.body.style.cursor = "pointer")
        }
        onPointerOut={() =>
          (document.body.style.cursor = "default")
        }
      />
      {/* RIGHT SIDE */}
      <Branch
        key={"right"}
        points={points}
        direction={1}
        depth={depth}
        numPoints={numPoints}
        degrees={degrees}
      />
      {/* LEFT SIDE */}
      <Branch
        key={"left"}
        points={points}
        direction={-1}
        depth={depth}
        numPoints={numPoints}
        degrees={degrees}
      />
      <CustomBranches />
    </>
  );
};

export default TreeBase;
