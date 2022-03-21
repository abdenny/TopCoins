import classNames from 'classnames';

interface Props {
  onClick: () => void;
  order: 'asc' | 'desc';
  isSelected: boolean;
}

const SortButton = ({ onClick, order, isSelected }: Props) => {
  return (
    <button
      type="button"
      title={order === 'asc' ? 'Sort ascending' : 'Sort descending'}
      aria-label={order === 'asc' ? 'Sort ascending' : 'Sort descending'}
      onClick={onClick}
      className={classNames('px-1 rounded bg-white', `${isSelected && 'bg-gray-200'}`)}
    >
      {order === 'asc' ? '↑' : '↓'}
    </button>
  );
};
export default SortButton;
