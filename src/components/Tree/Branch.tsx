import { Fragment } from "react";
import { Line } from "@react-three/drei";
import createBranches from "../../lib/createBranches";

const Branch = ({
  points,
  depth,
  vecDirection = null,
  direction,
  degrees,
  branchCounter,
  maxBranches,
}) => {
  // Stop rendering if depth is exhausted or branch limit is reached
  if (depth < 1 || branchCounter.current.count >= maxBranches) return null;

  // Generate new branch points
  const newPoints = createBranches({
    points,
    vecDirection,
    direction,
    degrees,
    branchCounter,
    maxBranches,
  });

  return newPoints.map((point, index) => {
    return (
      <Fragment key={index}>
        {/* PARENT BRANCH */}
        <Line
          key={`${point.endPoint[0]}`}
          points={[point.startPoint, point.endPoint]}
          lineWidth={point.startPoint.distanceTo(point.endPoint) / 5}
          color="sienna"
        />
        {/* CHILDREN BRANCHES */}
        <Branch
          key={`${point.endPoint[0]}-2`}
          points={[point.startPoint, point.endPoint]}
          depth={depth - 1}
          vecDirection={point.vecDirection}
          direction={direction}
          maxBranches={maxBranches}
          degrees={degrees}
          branchCounter={branchCounter}
        />
      </Fragment>
    );
  });
};

export default Branch;
