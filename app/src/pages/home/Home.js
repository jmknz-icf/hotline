/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

function Home() {
  const data = useMemo(
    () => [
      {
        recordId: 1,
        recordLabel: 'H1234',
        type: 'Hotline',
        status: 'In Draft',
        url: '/hotlines/H1234',
      },
      {
        recordId: 2,
        recordLabel: 'H4321',
        type: 'Hotline',
        status: 'Re-opened',
        url: '/hotlines/H4321',
      },
      {
        recordId: 3,
        recordLabel: 'R001',
        type: 'Routing Review',
        status: 'Under Review',
        url: '/hotlines/L4321/referrals/R001',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Record Identifier',
        accessor: 'recordLabel',
        Cell: ({ row: { original }, value }) => (
          <Link to={original.url} className="text-blue-700 hover:underline">
            {value}
          </Link>
        ),
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <div className="bg-white h-24 shadow">
        <div className="container mx-auto pt-2 px-1">
          <h2 className="font-semibold text-xl">Welcome, John MacKenzie</h2>
        </div>
      </div>
      <div className="container mt-4 mx-auto px-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="p-6">
            <h3 className="font-medium text-lg">Quick Links</h3>
            <ul>
              <li className="mt-2">
                <Link to="/hotlines/new" className="text-blue-700 hover:underline">
                  New Hotline
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="/hotlines/awaiting-review"
                  className="text-blue-700 hover:underline"
                >
                  Hotlines Awaiting Review
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white rounded shadow overflow-hidden lg:col-span-2">
          <div className="p-6">
            <h3 className="font-medium text-lg">My Recent Work</h3>
            <div className="mt-2">
              <table {...getTableProps({ className: 'w-full' })}>
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
                            className: 'font-medium px-2 text-left',
                          })}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps({ className: 'odd:bg-gray-200' })}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps({ className: 'p-2' })}>
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
