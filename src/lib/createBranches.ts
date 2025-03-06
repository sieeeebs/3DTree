import * as THREE from "three";

const ANGLE = {
  left: { axis: new THREE.Vector3(1, 0, 0) },
  right: { axis: new THREE.Vector3(-1, 0, 0) },
  front: { axis: new THREE.Vector3(0, 0, 1) },
  back: { axis: new THREE.Vector3(0, 0, -1) },
};

export default function test({
  points,
  direction,
  vecDirection,
  degrees,
  branchCounter,
  maxBranches,
}) {
  const start = points[0];
  const end = points[1];
  const lineLength = start.distanceTo(end);
  const length = lineLength * 0.6; // Length of the new branch
  const variationStrength = degrees / 2;
  // const numPoints = maxBranches / depth + 1;

  // Parent direction (normalized)
  const parentDirection = vecDirection
    ? vecDirection.clone().normalize()
    : end.clone().sub(start).normalize();

  const axis = ANGLE[direction].axis;
  const rotationAngleRad = THREE.MathUtils.degToRad(degrees);

  const rotationAxis = new THREE.Vector3().crossVectors(parentDirection, axis).normalize();

  const newLinePoints = [];
  for (let i = 1; i <= 3; i++) {
    // Pick a random point along the parent line
    const t = 0.4 + Math.random() * 0.6;
    const pointOnLine = new THREE.Vector3().lerpVectors(start, end, t);

    // Alternate rotation direction based on index
    const adjustedRotationAngleRad = i % 2 === 0 ? -rotationAngleRad : rotationAngleRad;

    // First rotation: Apply the main rotation
    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(rotationAxis, adjustedRotationAngleRad);
    const rotatedDirection = parentDirection.clone().applyQuaternion(quaternion).normalize();

    // Ensure variation but keep direction aligned with parent’s endpoint

    const variationAxis = new THREE.Vector3()
      .crossVectors(rotationAxis, parentDirection)
      .normalize();

    if (variationAxis.lengthSq() === 0) {
      variationAxis.copy(new THREE.Vector3(0, 1, 0)); // Fallback
    }

    const randomAngleRad = THREE.MathUtils.degToRad((Math.random() - 0.5) * variationStrength * 2);
    const variationQuaternion = new THREE.Quaternion();
    variationQuaternion.setFromAxisAngle(variationAxis, randomAngleRad);
    rotatedDirection.applyQuaternion(variationQuaternion).normalize();

    // Compute the new endpoint
    const newEnd = pointOnLine.clone().addScaledVector(rotatedDirection, length);

    newLinePoints.push({
      startPoint: pointOnLine,
      endPoint: newEnd,
      vecDirection: rotatedDirection,
    });
    branchCounter.current.count += 1;
    if (branchCounter.current.count > maxBranches - 1) return newLinePoints;
  }

  return newLinePoints;
}
