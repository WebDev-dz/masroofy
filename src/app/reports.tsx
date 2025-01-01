import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportsPage: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  // Dummy data for the pie chart (category-wise expenses)
  const pieChartData = {
    labels: ['Groceries', 'Transportation', 'Entertainment', 'Bills', 'Others'],
    datasets: [
      {
        data: [300, 200, 150, 400, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dummy data for the bar chart (monthly income vs expenses)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [4500, 5000, 4800, 5200, 5100, 5300],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
      {
        label: 'Expenses',
        data: [3500, 3800, 3600, 3900, 3700, 4000],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Income vs Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    calculateTotals();
  }, []);

  const calculateTotals = () => {
    setTotalIncome(5000);
    setTotalExpense(3000);
    setBalance(totalIncome - totalExpense);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Masroofy</h1>
      
      {/* Financial Overview Cards */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Pie data={pieChartData} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="h-[300px] flex items-center justify-center">
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          to="/add-transaction" 
          className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600 transition"
        >
          Add Transaction
        </Link>
        
        <Link 
          to="/transactions" 
          className="bg-indigo-500 text-white p-4 rounded-lg text-center hover:bg-indigo-600 transition"
        >
          Transaction List
        </Link>
        
        <Link 
          to="/reports" 
          className="bg-teal-500 text-white p-4 rounded-lg text-center hover:bg-teal-600 transition"
        >
          Visual Reports
        </Link>
      </div>
    </div>
  );
};

export default ReportsPage;
