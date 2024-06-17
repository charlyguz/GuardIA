import { Link } from 'react-scroll';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">GuardIA</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="hero" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} duration={500}>
                About
              </Link>
            </li>
            <li>
              <Link to="features" smooth={true} duration={500}>
                Features
              </Link>
            </li>
            <li>
              <Link to="usecases" smooth={true} duration={500}>
                Use Cases
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
