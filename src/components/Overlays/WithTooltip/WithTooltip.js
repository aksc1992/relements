import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@src/components/Overlays/Tooltip";

import styles from "./WithTooltip.scss";

function WithTooltip({
  children,
  prefixClassName,
  className,
  onClick,
  tooltip,
  position,
  disabled,
}) {
  const [tooltipActive, setTooltipActive] = React.useState();
  const DOMRef = React.useRef();
  const timeout = React.useRef();
  const handleMouseEnter = React.useCallback(() => {
    timeout.current = setTimeout(() => {
      setTooltipActive(true);
    }, 300);
  });

  const handleMouseLeave = React.useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    setTooltipActive(false);
  });

  return (
    <span
      ref={DOMRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${styles.withTooltipWrapper} ${className} ${prefixClassName}`}
    >
      {children}
      {tooltip ? (
        <Tooltip
          active={tooltipActive && !disabled}
          position={position}
          attachTo={DOMRef}
          onClose={handleMouseLeave}
          tooltipArrowColor="rgba(0,0,0,0.7)"
          tooltipArrowSmall
          className={styles.withTooltipTooltip}
          prefixClassName={`${prefixClassName}-inner`}
        >
          <div
            className={`${styles.withTooltip} ${prefixClassName}-inner-wrapper`}
          >
            {tooltip}
          </div>
        </Tooltip>
      ) : null}
    </span>
  );
}

WithTooltip.propTypes = {
  children: PropTypes.node,
  prefixClassName: PropTypes.string,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  position: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

WithTooltip.defaultProps = {
  children: null,
  className: "",
  tooltip: "",
  position: "TOP",
  disabled: false,
  onClick: () => {},
};

export default WithTooltip;
