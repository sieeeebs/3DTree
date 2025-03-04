import useStore from "../../useStore";
import { Line } from "@react-three/drei";

const CustomBranch = () => {
  const { lines } = useStore();
  return lines.map((line, index) => (
    <Line
      key={`${line.endPoint}-${index}`}
      points={[line.startPoint.toArray(), line.endPoint.toArray()]}
      color="sienna"
      lineWidth={2}
    />
  ));
};

export default CustomBranch;
