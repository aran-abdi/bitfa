import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner";
import WalletSummaryChart from "../../components/ walletSummaryChart";

type WalletParams = {
    walletId: string;
};

export interface WalletSummaryData {
    date: string;
    buyAmount: number;
    sellAmount: number;
    totalTrades: number;
    BotActivity: any;
  }

const Chart: React.FC = () => {

    const { walletId } = useParams<WalletParams>();

    const [walletSummary, setWalletSummary] = useState<WalletSummaryData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWalletSummaryData = async (walletAddress: string) => {
        try {
            const response = await fetch(
                `https://onchain.dextrading.com/walletsummary/${walletAddress}?network=eth`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setWalletSummary(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Bitfa | Wallet Chart";
    }, []);

    useEffect(() => {
        fetchWalletSummaryData(walletId ?? '');
    }, [walletId]);

    useEffect(() => {
        console.log(walletSummary);
        
    }, [walletSummary]);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-white text-2xl">Error: {error}</p>;

    return (
        <>
            <WalletSummaryChart walletSummary={walletSummary} />
        </>
    );

}

export default Chart;