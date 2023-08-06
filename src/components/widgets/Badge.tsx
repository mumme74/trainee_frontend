import React, { PropsWithChildren } from "react";

export enum eBadgeType {
  Info, Warn, Error, Success
}

type BadgeProps = {
  type: eBadgeType;

}

export const Badge = (props: PropsWithChildren<BadgeProps>) => {
  const cssClasses = ["badge", "m2"];

  switch (props.type) {
  case eBadgeType.Error: cssClasses.push('bg-danger'); break;
  case eBadgeType.Warn: cssClasses.push('bg-warn'); break;
  case eBadgeType.Info: cssClasses.push('bg-info'); break;
  case eBadgeType.Success: cssClasses.push('bg-success'); break;
  default: cssClasses.push('bg-secondary'); break;
  }

  return (
    <span className={cssClasses.join(' ')}>
      {props.children}
    </span>
  );
}
