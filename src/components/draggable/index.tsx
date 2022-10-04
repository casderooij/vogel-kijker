import Styles from "./styles.module.css";
import useDrag from "../../hooks/useDrag";

interface Props {
  color: string;
  name: string;
}

const Draggable = ({ color, name }: Props) => {
  const { elRef, isDragging } = useDrag();

  return (
    <div
      ref={elRef}
      className={Styles.draggable}
      style={{ backgroundColor: color }}
    >
      <div
        className={Styles.draggableTitle}
        style={{ opacity: isDragging ? 0 : 100 }}
      >
        {name}
      </div>
    </div>
  );
};

export default Draggable;
