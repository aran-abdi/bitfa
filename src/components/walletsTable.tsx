import { useState } from "react";
import Pagination from "./pagination";
import { useNavigate } from "react-router-dom";

interface WalletData {
    walletAddress: string;
    netProfit: number;
}

const WalletsTable: React.FC<{
    wallets: Array<WalletData>;
    perPage?: number;
}> = ({ wallets, perPage = 5 }) => {

    const navigate = useNavigate();

    // Pagination settings
    const totalItems = wallets.length; // Example total number of items
    const itemsPerPage = perPage; // Example items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Sorting settings
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<'netProfit'>('netProfit');

    // Get the current items based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const sortedData = [...wallets].sort((a, b) => {
        if (sortColumn === 'netProfit') {
            return sortDirection === 'asc' ? a.netProfit - b.netProfit : b.netProfit - a.netProfit;
        }
        return 0;
    });
    const currentItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

    // Change page handler
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Change sorting handler
    const handleSort = (column: 'netProfit') => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const formatNetProfit = (value: number) => {

        const sign = value > 0 ? '+' : value < 0 ? '-' : '';
        const color = value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-gray-100';

        const positiveValue = Math.abs(Number(value));

        const formattedValue = positiveValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return (
            <span className={`${color}`}>
                {sign} {formattedValue}
            </span>
        );
    };

    const goToChart = (walletAddress: string) => {
        navigate(`/charts/${walletAddress}`);
    }

    return (<>
        <div className="bg-slate-700 rounded-2xl overflow-hidden p-4">
            <table className="min-w-full bg-slate-700 divide-y divide-[#ff9900be]">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-lg font-semibold text-[#ff9800] uppercase tracking-wider min-h-12 flex" onClick={() => handleSort('netProfit')}>
                            Net Profit
                            {sortColumn === 'netProfit' && (
                                <span className="ml-1 text-[#ff9800] cursor-pointer">
                                    {sortDirection === 'asc' ? <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            style={{ stroke: 'none', fillRule: 'nonzero', fill: '#ff9800', fillOpacity: 1 }}
                                            d="M9.332 18.668 16 12l6.668 6.668Z"
                                        />
                                    </svg> : <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            style={{ stroke: 'none', fillRule: 'nonzero', fill: '#ff9800', fillOpacity: 1 }}
                                            d="M9.332 13.332 16 20l6.668-6.668Zm0 0"
                                        />
                                    </svg>}
                                </span>
                            )}
                        </th>
                        <th className="px-6 py-3 text-left text-lg font-semibold text-[#ff9800] uppercase tracking-wider min-h-12">Wallet Address</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((wallet, index) => (
                        <tr onClick={() => goToChart(wallet.walletAddress)} key={index} className="hover:bg-[#ff99003a] hover:text-white text-gray-100 cursor-pointer border-b border-[#ff990034] last:border-b-0">
                            <td className="px-6 py-4 whitespace-nowrap text-lg font-medium min-h-[45px] rounded-sm">
                                {formatNetProfit(wallet.netProfit)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg font-medium min-h-[45px]">{wallet.walletAddress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />

    </>)
}

export default WalletsTable;
