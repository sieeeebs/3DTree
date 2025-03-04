import * as THREE from "three";
import Branch from "./Branch";
import { useControls } from "leva";
import CustomBranches from "./CustomBranches";
import TreeBase from "./TreeBase";

const points = [new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)];

const Tree = () => {
  const { depth, numPoints, degrees } = useControls({
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

  return (
    <>
      <TreeBase degrees={degrees} points={points} />
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

export default Tree;
