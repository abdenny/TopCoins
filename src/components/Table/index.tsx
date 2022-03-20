interface Props {
  tableHeader: JSX.Element;
  tableRows?: () => Array<JSX.Element>;
}

const Table = ({ tableHeader, tableRows }: Props): JSX.Element => {
  return (
    <table className="min-w-full">
      {tableHeader}
      <tbody className="bg-white">{tableRows && tableRows()}</tbody>
    </table>
  );
};
export default Table;
