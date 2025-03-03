// This function creates multiple children branches at a set degree from the parent
import * as THREE from "three";

const degreesToRadians = (degrees) =>
  degrees * (Math.PI / 180);

export default function createBranches({
  points,
  numPoints, // number of branches
  direction, // 1 for right, -1 for left
  degrees,
}) {
  const start = points[0];
  const end = points[1];
  const lineLength = start.distanceTo(end);

  // Compute the direction of the parent branch
  const parentDirection = new THREE.Vector3()
    .subVectors(end, start)
    .normalize();

  const rotationAngle =
    -degreesToRadians(degrees) * direction;

  const rotationMatrix =
    new THREE.Matrix4().makeRotationZ(
      rotationAngle
    );
  const rotatedDirection = parentDirection
    .clone()
    .applyMatrix4(rotationMatrix)
    .normalize();

  // After rotation, ensure the vector points in the positive X direction for right side
  if (direction === 1 && rotatedDirection.x < 0) {
    rotatedDirection
      .multiplyScalar(-1)
      .normalize();
  }
  // After rotation, ensure the vector points in the negative X direction for left side
  if (
    direction === -1 &&
    rotatedDirection.x > 0
  ) {
    rotatedDirection
      .multiplyScalar(-1)
      .normalize();
  }

  // Adjust the rotation angle to point upwards by flipping the direction to make Y positive
  let upwardDirection;
  if (rotatedDirection.y < 0) {
    upwardDirection = parentDirection
      .clone()
      .applyMatrix4(
        new THREE.Matrix4().makeRotationZ(
          degreesToRadians(degrees) * direction // rotate in opposite direction
        )
      )
      .normalize();
  }

  // Generate the new children branch points using the adjusted direction
  const newLinePoints = [];
  for (let i = 1; i <= numPoints; i++) {
    const t = 0.3 + Math.random() * 0.7; // Random t between 0.3 and 1
    const pointOnLine =
      new THREE.Vector3().lerpVectors(
        start,
        end,
        t
      );
    let newEnd;
    const length = lineLength * 0.6;

    if (upwardDirection) {
      // randomly assign the direction (upwards or downwards)
      newEnd = pointOnLine
        .clone()
        .add(
          Math.random() < 0.5
            ? rotatedDirection
                .clone()
                .multiplyScalar(length)
            : upwardDirection
                .clone()
                .multiplyScalar(length)
        );
    } else {
      newEnd = pointOnLine
        .clone()
        .add(
          rotatedDirection
            .clone()
            .multiplyScalar(length)
        );
    }

    newLinePoints.push({
      startPoint: pointOnLine,
      endPoint: newEnd,
    });
  }

  return newLinePoints;
}
