const Head = ({ children }: { children: JSX.Element }) => (
  <div className="block p-4 bg-gray-600">
    <h1 className="text-lg">{children}</h1>
  </div>
);
export default Head;
