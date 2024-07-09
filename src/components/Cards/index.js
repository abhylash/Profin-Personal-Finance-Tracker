import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";

function Cards({ income, expense, totalBalance, showExpenseModal, showIncomeModal }) {
  return (
    <div>
    <Row className="my-row">
      <Card bordered={true} className="my-card">
        <h2>Current Balance</h2>
        <p><span className="rupee-symbol">₹{totalBalance}</span></p>
        <Button text="Reset Balance" blue={true} />
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Income</h2>
        <p><span className="rupee-symbol">₹{income}</span>   </p>
        <Button text="Add Income" blue={true} onClick={showIncomeModal} />
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Expenses</h2>
        <p><span className="rupee-symbol">₹{expense}</span></p>
        <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
      </Card>
    </Row>
  </div>
  );
}

export default Cards;
