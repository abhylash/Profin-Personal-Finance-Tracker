import React from 'react';
import { Line, Pie } from '@ant-design/charts';

function ChartComponent({ sortedTransactions }) {
  // Calculate running balance for Line chart
  let runningBalance = 0;
  const data = sortedTransactions.map((item) => {
    runningBalance += item.type === 'income' ? item.amount : -item.amount;
    return {
      date: item.date,
      balance: runningBalance,
    };
  });

  // Prepare data for Pie chart
  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === 'expense')
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  // Consolidate spending data by tag
  const newSpendings = spendingData.reduce((acc, item) => {
    const existingItem = acc.find((el) => el.tag === item.tag);
    if (existingItem) {
      existingItem.amount += item.amount;
    } else {
      acc.push({ tag: item.tag, amount: item.amount });
    }
    return acc;
  }, []);

  const lineConfig = {
    data: data,
    width: 500,
    autoFit: false,
    xField: 'date',
    yField: 'balance',
  };

  const pieConfig = {
    data: newSpendings,
    width: 500,
    angleField: 'amount',
    colorField: 'tag',
  };

  return (
    <div className="charts-wrapper">
      <div className="chart-container">
        <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
        <Line {...lineConfig} className="line-chart" />
      </div>

      <div className="pie-chart-container">
        <h2 style={{ marginTop: 0 }}>Your Spendings</h2>
        <Pie {...pieConfig} className="pie-chart" />
      </div>
    </div>
  );
}

export default ChartComponent;
