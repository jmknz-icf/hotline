import { Children, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuDropdown = ({
  'aria-controls': ariaControls = `list${Math.floor(Math.random() * 100)}`,
  label,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (isOpen && !dropdownRef.current.contains(evt.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, false);

    const handleClick = (evt) => {
      if (isOpen && dropdownRef.current.contains(evt.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick, false);

    return () => {
      document.removeEventListener('click', handleClickOutside, false);
      document.removeEventListener('click', handleClick, false);
    };
  });

  return (
    <li className="relative ml-2" ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-controls={ariaControls}
        type="button"
        className="w-full px-1 h-10 hover:bg-blue-800 rounded ml-1 focus:outline-white flex justify-center items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
      </button>
      <ul
        id={ariaControls}
        className={`-mr-1 absolute bg-gray-200 dropdown-menu mt-3 p-1 right-0 rounded-sm shadow text-gray-900 w-40 ${
          isOpen ? '' : ' hidden'
        }`}
      >
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </li>
  );
};

MenuDropdown.propTypes = {
  'aria-controls': PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
};

MenuDropdown.defaultProps = {
  'aria-controls': `list${Math.floor(Math.random() * 100)}`,
};

const VerticalMenuDropdown = ({
  'aria-controls': ariaControls = `list${Math.floor(Math.random() * 100)}`,
  label,
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (isOpen && !dropdownRef.current.contains(evt.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, false);

    return () => document.removeEventListener('click', handleClickOutside, false);
  });

  return (
    <li className={className} ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-controls={ariaControls}
        type="button"
        className="flex focus:outline-white hover:bg-blue-800 items-center p-2 rounded w-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
      </button>
      <ul id={ariaControls} className={isOpen ? '' : ' hidden'}>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </li>
  );
};

VerticalMenuDropdown.propTypes = {
  'aria-controls': PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
};

VerticalMenuDropdown.defaultProps = {
  'aria-controls': `list${Math.floor(Math.random() * 100)}`,
  className: '',
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const verticalMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (isOpen && !verticalMenuRef.current.contains(evt.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, false);

    const handleClick = (evt) => {
      if (
        isOpen &&
        verticalMenuRef.current.contains(evt.target) &&
        evt.target.tagName.toLowerCase() === 'a'
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick, false);

    return () => {
      document.removeEventListener('click', handleClickOutside, false);
      document.removeEventListener('click', handleClick, false);
    };
  });

  return (
    <header className="bg-blue-700 relative text-white">
      <div className="border-b flex items-center justify-between px-2 lg:px-4 py-2">
        <h1 className="text-2xl font-semibold">
          <Link to="/" className="focus:outline-white">
            OIG
            <span className="text-yellow-500">Hotline</span>
          </Link>
        </h1>
        <nav className="hidden lg:block" aria-label="Main Navigation">
          <ul className="flex items-center">
            <li>
              <Link
                to="/my-worklist"
                className="w-full px-1 h-10 hover:bg-blue-800 rounded ml-1 focus:outline-white flex justify-center items-center"
              >
                My Worklist
              </Link>
            </li>
            <MenuDropdown
              label={
                <>
                  <span>Call Center</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 ml-1 w-4"
                  >
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </>
              }
              aria-controls="call-center"
            >
              <Link
                to="/calls"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black"
              >
                Dashboard
              </Link>
              <Link
                to="/calls/all"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                All Call Logs
              </Link>
              <Link
                to="/calls/new"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                New Call Log
              </Link>
              <Link
                to="/calls/manager-queue"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Manager Queue
              </Link>
            </MenuDropdown>
            <MenuDropdown
              label={
                <>
                  <span>OI Operations</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 ml-1 w-4"
                  >
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </>
              }
              aria-controls="oi-operations"
            >
              <Link
                to="/hotlines"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black"
              >
                Dashboard
              </Link>
              <Link
                to="/hotlines/all"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                All Hotlines
              </Link>
              <Link
                to="/hotlines/new"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                New Hotline
              </Link>
              <Link
                to="/hotlines/awaiting-review"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Awaiting Review
              </Link>
              <Link
                to="/hotlines/transfers"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Transfers
              </Link>
              <Link
                to="/hotlines/returned"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Returned Hotlines
              </Link>
              <hr className="mt-1 border-gray-900" />
              <Link
                to="/hotlines/regional-review"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Regional Review
              </Link>
            </MenuDropdown>
            <MenuDropdown
              label={
                <>
                  <span>Admin</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 ml-1 w-4"
                  >
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </>
              }
              aria-controls="admin"
            >
              <Link
                to="/admin/origins"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black"
              >
                Origins
              </Link>
              <Link
                to="/admin/organizations"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Organizations
              </Link>
              <Link
                to="/admin/programs"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Programs
              </Link>
              <Link
                to="/admin/projects"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Projects
              </Link>
              <Link
                to="/admin/allegations"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Allegations
              </Link>
              <Link
                to="/admin/subject-categories"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Subject Categories
              </Link>
              <Link
                to="/admin/subject-types"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Subject Types
              </Link>
              <Link
                to="/admin/routing-locations"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Routing Locations
              </Link>
              <Link
                to="/admin/routing-memos"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Routing Memos
              </Link>
              <Link
                to="/admin/tags"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1"
              >
                Tags
              </Link>
            </MenuDropdown>
            <MenuDropdown
              label={
                <div className="h-8 w-8 bg-gray-700 rounded-full">
                  <span className="sr-only">User Menu</span>
                </div>
              }
              aria-controls="user-menu"
            >
              <Link
                to="/profile"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black"
              >
                Profile
              </Link>
              <hr className="mt-1 border-gray-900" />
              <button
                type="button"
                className="inline-block w-full p-1 hover:bg-gray-500 rounded focus:bg-gray-500 focus:outline-black mt-1 text-left"
              >
                Logout
              </button>
            </MenuDropdown>
          </ul>
        </nav>
        <button
          id="toggleMenu"
          type="button"
          className="lg:hidden h-10 w-10 focus:outline-white flex justify-center items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Open Menu</span>
          <svg
            viewBox="0 0 16 16"
            className="h-10 w-10"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            )}
          </svg>
        </button>
      </div>
      <nav
        className={`${
          isOpen ? '' : 'hidden'
        } absolute bg-blue-700 lg:hidden p-2 w-full`}
        ref={verticalMenuRef}
      >
        <ul>
          <li>
            <Link
              to="/my-worklist"
              className="inline-block w-full p-2 hover:bg-blue-800 rounded focus:outline-white"
            >
              My Worklist
            </Link>
          </li>
          <VerticalMenuDropdown
            label={
              <>
                <span>Call Center</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 ml-1 w-4"
                >
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </>
            }
            aria-controls="call-center-vert-menu"
            className="mt-2"
          >
            <Link
              to="/calls"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Dashboard
            </Link>
            <Link
              to="/calls/all"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              All Call Logs
            </Link>
            <Link
              to="/calls/new"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              New Call Log
            </Link>
            <Link
              to="/calls/manager-queue"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Manager Queue
            </Link>
          </VerticalMenuDropdown>
          <VerticalMenuDropdown
            label={
              <>
                <span>OI Operations</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 ml-1 w-4"
                >
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </>
            }
            aria-controls="call-center-vert-menu"
            className="mt-2"
          >
            <Link
              to="/hotlines"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Dashboard
            </Link>
            <Link
              to="/hotlines/all"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              All Hotlines
            </Link>
            <Link
              to="/hotlines/new"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              New Hotline
            </Link>
            <Link
              to="/hotlines/awaiting-review"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Awaiting Review
            </Link>
            <Link
              to="/hotlines/transfers"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Transfers
            </Link>
            <Link
              to="/hotlines/returned"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Returned Hotlines
            </Link>
            <hr className="mt-2 border-white" />
            <Link
              to="/hotlines/regional-review"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Regional Review
            </Link>
          </VerticalMenuDropdown>
          <VerticalMenuDropdown
            label={
              <>
                <span>Admin</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 ml-1 w-4"
                >
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </>
            }
            aria-controls="admin-vert-menu"
            className="mt-2"
          >
            <Link
              to="/admin/origins"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Origins
            </Link>
            <Link
              to="/admin/organizations"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Organizations
            </Link>
            <Link
              to="/admin/programs"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Programs
            </Link>
            <Link
              to="/admin/projects"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Projects
            </Link>
            <Link
              to="/admin/allegations"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Allegations
            </Link>
            <Link
              to="/admin/subject-categories"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Subject Categories
            </Link>
            <Link
              to="/admin/subject-types"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Subject Types
            </Link>
            <Link
              to="/admin/routing-locations"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Routing Locations
            </Link>
            <Link
              to="/admin/routing-memos"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Routing Memos
            </Link>
            <Link
              to="/admin/tags"
              className="inline-block w-full py-2 px-4 hover:bg-blue-800 rounded mt-2 focus:outline-white"
            >
              Tags
            </Link>
          </VerticalMenuDropdown>
          <li className="mt-2">
            <Link
              to="/profile"
              className="inline-block w-full p-2 hover:bg-blue-800 rounded focus:outline-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <hr className="mt-2 border-white" />
          </li>
          <li className="mt-2">
            <button
              type="button"
              className="inline-block w-full p-2 hover:bg-blue-800 rounded focus:outline-white text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
