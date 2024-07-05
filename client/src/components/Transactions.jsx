import { ArrowLongDownIcon, ArrowLongUpIcon, ArrowsUpDownIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

const dummyTransactions = [
  {
    id: 'pi_1Ica06Ch7kAdR2vTx0u10JAi',
    method: 'Paypal',
    amount: 50,
    date: '2024-03-20T10:30:00',
    status: 'Completed',
  },
  {
    id: 'pi_1IfIgpCh7kAdR2vT1Je92ygB',
    method: 'Stripe',
    amount: 25,
    date: '2024-03-19T15:45:00',
    status: 'Completed',
  },
  {
    id: 'pi_1JHXxpCh7kAdR2vTLhbSsmoV',
    method: 'Paysafecard',
    amount: 100,
    date: '2024-03-18T09:20:00',
    status: 'Pending',
  },
  {
    id: 'pi_3JYy4ICh7kAdR2vT0enu07e2',
    method: 'Bank transfer',
    amount: 75,
    date: '2024-03-17T11:10:00',
    status: 'Failed',
  },
];

function Transactions() {
  const [tableData, setTableData] = useState(dummyTransactions);

  const columns = [
    { label: 'Transaction ID', accessor: 'id', sortable: false },
    { label: 'Payment Gateway', accessor: 'method', sortable: true },
    { label: 'Payment Amount', accessor: 'amount', sortable: true },
    { label: 'Date', accessor: 'date', sortable: true },
    { label: 'Payment Status', accessor: 'status', sortable: true },
  ];

  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <div className='w-full flex flex-col rounded-lg shadow-lg p-4 bg-dark-purple'>
      <span className='font-semibold text-xl'>Transactions</span>
      <span className='text-slate-300 text-sm mt-4'>
        Here's an overview of all your transactions with us
      </span>

      <div className='overflow-x-auto table-scrollbar mt-12'>
        <table className='border-collapse w-[1120px] table-auto'>
          <thead>
            <tr className='bg-english-violet-900'>
              {columns.map(({ label, accessor, sortable }) => {
                return (
                  <th
                    key={accessor}
                    className={`p-2 select-none ${sortable ? ' cursor-pointer' : ''}`}
                    onClick={sortable ? () => handleSortingChange(accessor) : null}>
                    <div className='flex items-center justify-between'>
                      <span className='text-left uppercase text-sm break-all'>{label}</span>
                      {sortable ? (
                        sortField === accessor && order === 'asc' ? (
                          <ArrowLongUpIcon className='h-4 w-4 shrink-0 text-hunyadi-yellow' />
                        ) : sortField === accessor && order === 'desc' ? (
                          <ArrowLongDownIcon className='h-4 w-4 shrink-0 text-hunyadi-yellow' />
                        ) : (
                          <ArrowsUpDownIcon className='h-4 w-4 shrink-0 text-hunyadi-yellow' />
                        )
                      ) : (
                        <ArrowsUpDownIcon className='h-4 w-4 shrink-0 text-zinc-500' />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => {
              return (
                <tr key={data.id} className='border-y border-slate-700 text-center'>
                  {columns.map(({ accessor }) => {
                    const tData = data[accessor] ? data[accessor] : '——';
                    return (
                      <td className='p-1 break-all' key={accessor}>
                        {tData}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
