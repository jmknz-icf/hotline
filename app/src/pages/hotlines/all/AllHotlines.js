import { Link } from 'react-router-dom';

import { hotlines } from '../../../mocks/hotlines';

function AllHotlines() {
  return (
    <>
      <div className="bg-white h-24 shadow">
        <div className="container mx-auto pt-2 px-1">
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl">Hotlines</h2>
            <Link
              to="/hotlines/new"
              className="bg-blue-700 active:bg-blue-900 focus:outline-black font-medium hover:bg-blue-800 inline-block px-4 py-2 rounded text-sm text-white tracking-wide uppercase"
            >
              Create Hotline
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-4 mx-auto px-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded shadow self-start">
          <div className="p-6">
            <h3 className="font-medium text-lg">Search Filters</h3>
            <div>
              <input type="text" placeholder="Search..." className="border focus:outline-black h-10 leading-10 px-2 w-full" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded shadow lg:col-span-3">
          <div className="p-6">
            <h3 className="font-medium text-lg">Search Hotlines</h3>
            <div>
              {hotlines.map((hotline) => (
                <Link
                  to={`/hotlines/${hotline.id}`}
                  className="block border mt-2 p-2 rounded-sm"
                >
                  <p className="font-medium">{hotline.primaryAllegation}</p>
                  <p>
                    <span className="font-medium">Received at:</span>{' '}
                    {hotline.receivedDate}
                  </p>
                  <p>
                    <span className="font-medium">Complainant:</span>{' '}
                    {hotline.complainant.name} | {hotline.complainant.disclosure}
                  </p>
                  <p>
                    <span className="font-medium">Subject:</span>{' '}
                    {hotline.subjects?.[0]?.name || 'Unknown'}
                    {hotline.subjects?.length > 1 ? ', et al.' : ''}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllHotlines;
