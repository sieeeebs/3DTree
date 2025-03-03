import * as THREE from "three";

const degreesToRadians = (degrees) =>
  degrees * (Math.PI / 180);

export default function addCustomBranch({
  selectedPoint,
  linePoints,
  degrees,
  addLine,
}) {
  const direction = Math.random() < 0.5 ? -1 : 1; //randomize direction in x
  const start = linePoints[0];
  const end = linePoints[1];
  const lineLength = start.distanceTo(end);

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
  if (direction === 1) {
    if (rotatedDirection.x < 0) {
      rotatedDirection
        .multiplyScalar(-1)
        .normalize();
    }
  }
  const length = lineLength * 0.6;
  const newEnd = selectedPoint
    .clone()
    .add(
      rotatedDirection
        .clone()
        .multiplyScalar(length)
    );

  addLine(selectedPoint, newEnd);
}
