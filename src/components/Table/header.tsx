interface Props {
  headerCells: () => Array<JSX.Element>;
}
const Header = ({ headerCells }: Props): JSX.Element => {
  return (
    <thead>
      <tr>{headerCells()}</tr>
    </thead>
  );
};
export default Header;
