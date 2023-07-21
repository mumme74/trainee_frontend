import React from "react";

const Logo: React.FC<{ className?: string }> = (props) => {
  return (
    <React.Fragment>
    <span className={(props.className || "") + " traineeLogo"}>
      Trai<div>n</div>e<div>e</div>
    </span>
    </React.Fragment>
  );
};

export default Logo;
