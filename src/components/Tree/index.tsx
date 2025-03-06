import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useControls } from "leva";
import Branch from "./Branch";
import CustomBranches from "./CustomBranches";
import TreeBase from "./TreeBase";

const points = [new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)];

const Tree = () => {
  const { depth, branches, degrees } = useControls({
    depth: {
      label: "Depth",
      value: 4,
      min: 1,
      max: 5,
      step: 1,
    },
    branches: {
      label: "Max Branches",
      value: 500,
      min: 4,
      max: 1000,
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

  const branchCounter = useRef({ count: 0 });

  // Reset branchCounter when controls change
  useEffect(() => {
    branchCounter.current.count = 0;
  }, [branches, depth, degrees]);

  return (
    <>
      <TreeBase degrees={degrees} points={points} />
      {/* LEFT SIDE */}
      <Branch
        key={"left"}
        points={points}
        depth={depth}
        maxBranches={branches}
        degrees={degrees}
        direction={"left"}
        branchCounter={branchCounter}
      />
      {/* RIGHT SIDE */}
      <Branch
        key={"right"}
        points={points}
        depth={depth}
        maxBranches={branches}
        degrees={degrees}
        direction={"right"}
        branchCounter={branchCounter}
      />
      {/* FRONT SIDE */}
      <Branch
        key={"front"}
        points={points}
        depth={depth}
        maxBranches={branches}
        degrees={degrees}
        direction={"front"}
        branchCounter={branchCounter}
      />
      {/* BACK SIDE */}
      <Branch
        key={"back"}
        points={points}
        depth={depth}
        maxBranches={branches}
        degrees={degrees}
        direction={"back"}
        branchCounter={branchCounter}
      />
      <CustomBranches />
    </>
  );
};

export default Tree;
