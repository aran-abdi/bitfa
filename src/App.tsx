import { useEffect, useState } from "react";
import LoadingSpinner from "./components/loadingSpinner";
import WalletsTable from "./components/walletsTable";

interface WalletData {
  walletAddress: string;
  netProfit: number;
}

function App() {

  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async (page: number = 1, limit: number = 50) => {
    try {
      const response = await fetch(
        `https://onchain.dextrading.com/valuable_wallets?network=eth`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setWallets(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    document.title = "Bitfa | Home Page";
    fetchWalletData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">

      <div className="flex flex-col items-center justify-center h-screen bg-slate-800">

        <h1 className="text-5xl text-gray-300 font-bold mb-16">Welcome to <span className="text-[#ff9800]">Bitfa</span></h1>

        <div className="w-10/12">

          <WalletsTable wallets={wallets} />

        </div>

      </div>

    </div>
  );
}

export default App;
