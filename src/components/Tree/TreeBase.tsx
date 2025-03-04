import { Line } from "@react-three/drei";
import useStore from "../../useStore";
import addCustomBranch from "../../lib/addCustomBranch";

const TreeBase = ({ degrees, points }) => {
  const addLine = useStore((state) => state.addLine);

  return (
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
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    />
  );
};

export default TreeBase;
