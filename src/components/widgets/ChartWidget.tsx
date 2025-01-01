import React from "react";
import { BaseWidget, ExpenseChartWidget, IncomeChartWidget,  } from "../../types/settings";
import { getTransactionsChartConfig, groupTransactionsByCategory, useTransactionStore } from "../../stores/transactionStore";
import { BarChartWidget } from "../ui/barChart";

type Props = { widget: BaseWidget & (ExpenseChartWidget | IncomeChartWidget) };

const ChartWidget = ({ widget }: Props) => {
  const { transactions } = useTransactionStore((state) => state);

  // Limit the number of transactions displayed based on widget settings
//   const limitedTransactions = transactions?.slice(0, widget.limit || 5);

  const barChartDataByCategory = groupTransactionsByCategory(transactions);
      const chartConfig = getTransactionsChartConfig(transactions)
      return (
        <BarChartWidget
          title={widget.title}
          description="Summed amounts grouped by transaction type"
          data={barChartDataByCategory}
          xAxisKey="category"
          bars={[{ dataKey: "amount", color: (widget.type == "expense-chart" ? "hsl(var(--chart-2))": "hsl(var(--chart-1))" ), x: "category" }]}
          config={chartConfig}
          trendText="Transaction types trend"
          footerNote="Based on the latest transactions."
        />
      );
};

export default ChartWidget;
