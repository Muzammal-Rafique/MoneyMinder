// components/ExpenseList.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Expense {
  id: number;
  title: string;
  amount: string;
  paymentMethod: string;
  category: string;
  description: string;
  date: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/expenses");
        const fetchedExpenses = response.data;
        setExpenses(fetchedExpenses);

        // Calculate total amount
        const sum = fetchedExpenses.reduce((acc: number, expense: Expense) => {
          return acc + parseFloat(expense.amount);
        }, 0);
        setTotalAmount(sum);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expense List</h2>
      <p className="mb-2">Total Amount: {totalAmount.toFixed(2)} Rupees</p>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="mb-2">
            {expense.title}: {expense.amount} Rupees
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
