import classnames from 'classnames';

const AllergiButton = (disabled, text, handleItemClick) => {
  return (
    <button
      type="button"
      onClick={handleItemClick}
      disabled={disabled}
      className={classnames(
        disabled
          ? 'bg-secondary border-bgcolor'
          : 'bg-bgcolor border-secondary',
        'border-solid border-2',
        'rounded-full',
      )}
    >
      {text}
    </button>
  );
};
