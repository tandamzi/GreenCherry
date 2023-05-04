import classnames from 'classnames';

import style from './index.module.scss';

const AllergyButton = ({ disabled, onClick, text, selected, value }) => {
  return (
    <button
      type="button"
      value={value}
      disabled={disabled}
      className={classnames(
        selected ? style.selected : style['non-selected'],
        style['allergy-button'],
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default AllergyButton;
