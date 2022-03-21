import { Link } from 'react-router-dom';

const view = () => {
  return (
    <div className="bg-gray-100 h-screen justify-center flex flex-col items-center">
      <div className="mb-4 text-2xl">404</div>
      <Link
        to="/"
        className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
      >
        Go Home
      </Link>
    </div>
  );
};
export default view;
