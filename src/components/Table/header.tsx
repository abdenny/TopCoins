interface Props {
  headerCells: Array<string>;
}
const Header = ({ headerCells }: Props): JSX.Element => {
  return (
    <thead>
      <tr>
        {headerCells.map((headerCell, index) => (
          <th
            key={`${index}-${headerCell}`}
            className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
          >
            {headerCell}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default Header;
