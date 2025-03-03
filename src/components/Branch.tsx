import { Fragment } from "react";
import { Line } from "@react-three/drei";
import createNewBranch from "../lib/createBranches";

const Branch = ({
  points,
  depth,
  direction,
  numPoints,
  degrees,
}) => {
  if (depth < 1) return null;

  const newPoints = createNewBranch({
    points,
    numPoints,
    direction,
    degrees,
  });

  return newPoints.map((point, index) => (
    <Fragment key={index}>
      {/* PARENT BRANCH */}
      <Line
        key={`${point.endPoint}`}
        points={[
          point.startPoint,
          point.endPoint,
        ]}
        lineWidth={
          point.startPoint.distanceTo(
            point.endPoint
          ) / 9
        }
        color="sienna"
      />
      {/* CHILDREN BRANCHES */}

      <Branch
        key={`${point.endPoint}-2`}
        points={[
          point.startPoint,
          point.endPoint,
        ]}
        depth={depth - 1}
        direction={direction}
        numPoints={numPoints}
        degrees={degrees}
      />
    </Fragment>
  ));
};

export default Branch;
