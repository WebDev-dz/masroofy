import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { AccountCard } from "../components/accounts/card";
import { useAccountStore } from "../stores/accountStore";
import { defaultDashboardConfig } from "../constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { PlusCircle } from "lucide-react";
import { se } from "date-fns/locale";
import { AsyncOperation } from '../types/models';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  notes?: string;
}

const Home: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const { accounts, calculateTotalBalance } = useAccountStore((store) => store);
  const { widgets, layout, name } = defaultDashboardConfig;

  // Calculate totals whenever transactions change
  useEffect(() => {
    // This will be replaced with actual data fetching
    // For now using dummy calculations
    calculateTotalBalance().then((ba) => { console.log({ba}); setBalance(Math.floor(ba.data!)) });
  }, []);

  const calculateTotals = () => {
    // This will be replaced with actual calculations from your data
    // Dummy data for example
    setTotalIncome(5000);
    setTotalExpense(3000);
    setBalance(totalIncome - totalExpense);
  };

  return (
    <div className=" mx-auto p-4 space-y-4">
      {/* Financial Overview Cards */}
      <section className=" space-y-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Income</h2>
            <p className="text-2xl text-green-600">{totalIncome} DZD</p>
          </div>

          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Expenses</h2>
            <p className="text-2xl text-red-600">{totalExpense} DZD</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Balance</h2>
            <p className="text-2xl text-blue-600">{balance} DZD</p>
          </div>
        </div>
      </section>
      <section className=" space-y-4">
        <h1 className="text-2xl font-bold">Accounts</h1>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 w-full">
          {accounts.map((account) => (
            <AccountCard key={account.accountId} account={account} />
          ))}
          <Card className="cursor-pointer group hover:shadow-md hover:border-sky-500 hover:ring-sky-500 border-dashed">
            <CardContent className="p-0 flex justify-center items-center w-full h-full">
              <p className="text-lg font-bold group-hover:text-sky-500">
                 <PlusCircle size={30} /> 
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Dashboard />

      
    </div>
  );
};

export default Home;
