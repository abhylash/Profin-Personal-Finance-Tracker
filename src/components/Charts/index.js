import React from 'react';
import { Line, Pie } from '@ant-design/charts';

function ChartComponent({ sortedTransactions }) {
  // Prepare data for Line chart
  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  // Prepare data for Pie chart
  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === 'expense')
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  // Consolidate spending data by tag
  const newSpendings = spendingData.reduce((acc, item) => {
    const { tag, amount } = item;
    const existingItem = acc.find((el) => el.tag === tag);
    if (existingItem) {
      existingItem.amount += amount;
    } else {
      acc.push({ tag, amount });
    }
    return acc;
  }, []);


  const config = {
    data: data,
    width: 500,
    autoFit: false,
    xField: 'date',
    yField: 'amount',
  };

  const spendingConfig = {
    data: newSpendings,
    width: 500,
    angleField: 'amount',
    colorField: 'tag',
  };

  let chartInstance, pieChartInstance; // Variables to hold chart instances

  return (
    <div className="charts-wrapper">
      <div className="chart-container">
        <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
        <Line
          {...config}
          className="line-chart"
          onReady={(chartInstance) => (chartInstance = chartInstance)}
        />
      </div>

      <div className="pie-chart-container">
      <h2 style={{ marginTop: 0 }}>Your Spendings</h2>
        <Pie
          {...spendingConfig}
          className="pie-chart"
          onReady={(pieChart) => (pieChartInstance = pieChart)}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
