import React, { useEffect, useState } from "react";
import Header from "../PersonalDashboard/Header";
import Cards from "../PersonalDashboard/Cards";
import { Modal } from "antd";
import AddExpense from "../PersonalDashboard/Modals/AddExpense";
import AddIncome from "../PersonalDashboard/Modals/AddIncome";
import {
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase"
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../PersonalDashboard/TransactionsTable";
import ChartComponent from "../PersonalDashboard/Charts";
import NoTransactions from "../PersonalDashboard/NoTransactions";
import FinancialWellnessScore from "../PersonalDashboard/WellnessScore/FinancialWellnessScore";
import PaymentCalender from "../PersonalDashboard/PaymentCalender/PaymentCalender";
import DashBoardLoader from "../PersonalDashboard/DashboardLoader/DashboardLoader";
import DashboardNavbar from "../../components/DashboardNavbar";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      
      // Update transactions state immutably
      setTransactions(prevTransactions => [...prevTransactions, transaction]);
      
      if (!many) {
        toast.success("Transaction Added!");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    try {
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionArray = [];
        querySnapshot.forEach((doc) => {
          // Include the document ID in the transaction data
          transactionArray.push({ id: doc.id, ...doc.data() });
        });
        setTransactions(transactionArray);
        toast.success("Transactions Fetched!");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }

  const resetBalance = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(
        collection(db, `users/${user.uid}/transactions`)
      );
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      setTransactions([]);
      setIncome(0);
      setExpense(0);
      setTotalBalance(0);

      toast.success("Balance reset successfully!");
    } catch (error) {
      console.error("Error resetting balance:", error);
      toast.error("Failed to reset balance");
    } finally {
      setLoading(false);
    }
  };

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      
      {loading ? (
        <DashBoardLoader />
      ) : (
        <>
        <DashboardNavbar/>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            resetBalance={resetBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions && transactions.length !== 0 ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <FinancialWellnessScore transactions={sortedTransactions} />
          <PaymentCalender transactions={sortedTransactions} />

          <TransactionsTable
            transactions={sortedTransactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;