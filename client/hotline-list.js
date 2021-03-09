import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

function AllHotlines() {
  const columns = useMemo(
    () => [
      {
        Header: 'Hotline Identifier',
        accessor: 'identifier',
      },
      {
        Header: 'Primary Allegation',
        accessor: 'allegations',
      },
      {
        Header: 'Primary Complainant',
        accessor: 'complainants',
      },
      {
        Header: 'Primary Subject',
        accessor: 'subjects',
      },
      {
        Header: 'Received Date',
        accessor: 'receivedDate',
      },
      {
        Header: 'Source',
        accessor: 'source',
      },
    ],
    []
  );
  const data = useMemo(() => [], []);

  const {
    getTableProps,
    // getTableBodyProps,
    headerGroups,
    // rows,
    // prepareRow,
  } = useTable({ columns, data });

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
      <div className="container mt-4 mx-auto px-1">
        <div className="bg-white rounded shadow overflow-hidden lg:col-span-2">
          <div className="p-6">
            <h3 className="font-medium text-lg">Search Hotlines</h3>
            <div className="mt-2 overflow-x-auto">
              <table {...getTableProps({ className: 'min-w-full table-fixed' })}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps({
                        className: 'border-b border-gray-900',
                      })}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps({
                            className: `font-medium px-2 ${
                              column.Header === 'Received Date'
                                ? 'text-right'
                                : 'text-left'
                            }`,
                          })}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllHotlines;
