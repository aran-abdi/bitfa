import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);


const WalletSummaryChart: React.FC<{
    walletSummary: any;
}> = ({ walletSummary }) => {

    const navigate = useNavigate();

    // Define the type for the month data
    type MonthData = { [key: string]: number };

    // Function to parse a month string into a Date object
    const parseDate = (monthStr: string): Date => {
        const [monthName, year] = monthStr.split(' ');
        const monthIndex = new Date(Date.parse(monthName + " 1, 2012")).getMonth();
        return new Date(parseInt(year), monthIndex);
    };

    // Function to sort the month data object
    const sortMonthData = (data: MonthData): MonthData => {
        // Convert the object to an array of [key, value] pairs
        const entries = Object.entries(data);

        // Sort the entries based on the parsed Date objects
        const sortedEntries = entries.sort((a, b) => parseDate(a[0]).getTime() - parseDate(b[0]).getTime());

        // Convert the sorted entries back to an object
        return Object.fromEntries(sortedEntries);
    };

    // Extract and sort the month data
    const monthData = walletSummary.totalBuySellTimes.month;
    const sortedMonthData = sortMonthData(monthData);

    const profits = Object.values(sortMonthData(walletSummary.totalProfits.month));

    // Prepare data for chart
    const data = {
        labels: Object.keys(sortedMonthData),
        datasets: [{
            type: 'line' as const,
            label: 'Count of Transactions (buy & sell)',
            data: Object.values(sortedMonthData),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: '#ff9800',
            borderWidth: 3,
            yAxisID: 'yR',
        },
        {
            type: 'bar' as const,
            label: 'Profit (Negative Or Positive)',
            data: profits.map(profit => Math.abs(profit)),
            backgroundColor: profits.map((profit) =>
                profit >= 0 ? "rgba(144, 238, 144, 0.8)" : "rgba(255, 99, 132, 0.8)"
            ),
            borderWidth: 0,
            yAxisID: 'yL',
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Total Buy & Sell Times',
                color: 'white',
            },
            tooltip: {
                bodyColor: 'white',
                titleColor: 'white'
            },
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                border: {
                    color: 'white'
                }
            },
            y: {
                display: false,
                ticks: {
                    color: 'white'
                },
                border: {
                    color: 'white'
                },
            },
            yR: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                ticks: {
                    color: 'white'
                },
                border: {
                    color: 'white'
                },
            },
            yL: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                ticks: {
                    color: 'white',
                    callback: function (tickValue: number | string) {
                        let value = Number(tickValue);
                        if (value >= 1000000000) {
                            return `$${(value / 1000000000).toFixed(0)}B`;
                        } else if (value >= 1000000) {
                            return `$${(value / 1000000).toFixed(0)}M`;
                        } else if (value >= 1000) {
                            return `$${(value / 1000).toFixed(0)}K`;
                        } else {
                            return `$${value}`;
                        }
                    },
                },
                border: {
                    color: 'white'
                },
            },
        }
    };

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="w-full md:w-2/3 md:border-2 border-slate-600 rounded-2xl p-2 md:p-10">
            <Chart
                type='bar'
                data={data}
                options={options}
            />

            <button onClick={goBack} className="text-slate-800 text-3xl md:text-base px-10 py-1 bg-[#ff9800] rounded-md mt-20 md:mt-10 font-medium hover:bg-[#ff9900da]">Go Back</button>
        </div>
    )

}

export default WalletSummaryChart;