import React from "react";
import "./ProgressIndicator.css";

type StatePropsT = object;

type JsxPropsT = {
  progress?: number; // between 0 and 1
};

const ProgressIndicator: React.FC<React.PropsWithChildren<JsxPropsT & StatePropsT>> = (props) => {
  const progress = Math.round((props.progress || 0) * 100) / 100; // 2 decimals
  let rotateClass = "",
    tooltip = "";
  if (progress > 0.0 && progress < 1.0) {
    tooltip = "Communicating with server!";
    rotateClass =
      " active " + (progress < 0.8 ? "clockwise" : "counterClockwise");
  }

  return (
    <React.Fragment>
    <div className={"progressIndicatorWrapper" + rotateClass} title={tooltip}>
      {props.children}
    </div>
    </React.Fragment>
  );
};

export default ProgressIndicator;
