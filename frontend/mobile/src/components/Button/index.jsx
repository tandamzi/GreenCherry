/* eslint-disable react/button-has-type */
import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './index.module.scss';

export const Button = ({
  color,
  fill,
  className,
  label,
  type,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type || 'button'}
      className={classNames(
        style.Button,
        style[`Button-${color}`],
        fill && style['Button-background-fill'],
        className,
        disabled && 'opacity-25',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  color: 'primary',
  fill: true,
  onClick: undefined,
  disabled: false,
};
