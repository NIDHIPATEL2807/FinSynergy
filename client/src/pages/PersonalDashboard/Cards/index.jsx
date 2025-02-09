import React from "react";
import Button from "../Button";

function Cards({ income, expense, totalBalance, showIncomeModal, showExpenseModal, resetBalance }) {
  return (
    <div className="min-p-3 m-4 align-center">
      <div className="flex gap-12  justify-center flex-wrap mt-5">
        {/* Balance Card */}
        <div className="bg-teal-50 shadow-xl rounded-lg w-full sm:w-1/4 p-5">
          <h2 className="text-l font-semibold mb-2">Balance</h2>
          <p className="text-3xl font-medium mb-4">₹{totalBalance}</p>
          <Button text="Reset Balance" onClick={resetBalance} />
        </div>
        
        {/* Income Card */}
        <div className="bg-teal-50 shadow-xl rounded-lg w-full sm:w-1/4 p-5">
          <h2 className="text-l font-semibold mb-2">Income</h2>
          <p className="text-3xl font-medium mb-4">₹{income}</p>
          <Button text="Add Income" onClick={showIncomeModal} blue={false} />
        </div>

        {/* Expenses Card */}
        <div className="bg-teal-50 shadow-xl rounded-lg w-full sm:w-1/4 p-5">
          <h2 className="text-l font-semibold mb-2">Expenses</h2>
          <p className="text-3xl font-medium mb-4">₹{expense}</p>
          <Button text="Add Expenses" onClick={showExpenseModal} blue={false} />
        </div>
      </div>
    </div>
  );
}

export default Cards;
