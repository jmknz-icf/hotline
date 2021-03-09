import { Link } from 'react-router-dom';

import icfLogo from '../../images/ICF-logo-COLOR.png';

function Footer() {
  return (
    <footer className="bg-gray-800 flex-shrink-0 px-2 lg:px-4 py-2 text-sm text-white">
      <div className="flex items-center justify-between">
        <Link to="/help" className="focus:outline-white hover:underline">
          Need help?
        </Link>
        <div>
          <span>
            &copy;
            {new Date().getFullYear()}
          </span>
          <span className="ml-1 inline-block lg:hidden">U.S. DHHS</span>
          <span className="ml-1 hidden lg:inline-block">
            U.S. Department of Health and Human Services
          </span>
        </div>
        <span className="hidden md:inline-block">
          Powered by
          <a
            className="ml-1 focus:outline-white"
            href="https://www.icf.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="sr-only">Go to ICF&apos;s homepage</span>
            <img className="h-6 inline-block" src={icfLogo} alt="ICF Color Logo" />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
