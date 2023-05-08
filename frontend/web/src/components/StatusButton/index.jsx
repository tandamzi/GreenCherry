import React from 'react';

import classnames from 'classnames';

// @ts-check

/**
 * typedef {Object}
 */
/**
 * @param {{orderState: string}} props
 */

const StatusButton = ({ orderState }) => {
  const pickUpState = orderState === 'PICKUP_COMPLETE';
  return (
    <button
      type="button"
      className={classnames(
        pickUpState
          ? 'bg-disabled text-secondaryfont'
          : 'bg-secondary text-bgcolor',
        'w-16 h-16 text-lg rounded leading-5 font-sans',
      )}
    >
      픽업
      <br />
      완료
    </button>
  );
};

export default StatusButton;
