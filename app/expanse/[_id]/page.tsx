import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

const ExpenseDetail: React.FC = () => {
  const router = useRouter();
  const { _id } = router.query; // Use _id here

  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    console.log("ID:", _id); // Check if _id is logged into the console

    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/expenses/${_id}`
        );
        setExpense(response.data);
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    if (_id) {
      fetchExpense();
    }
  }, [_id]);

  if (!expense) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{expense.title}</h2>
      <p className="text-xl mb-2">Amount: {expense.amount} Rupees</p>
      <p className="text-xl mb-2">Payment Method: {expense.paymentMethod}</p>
      <p className="text-xl mb-2">Category: {expense.category}</p>
      <p className="text-xl mb-2">Description: {expense.description}</p>
      <p className="text-xl mb-2">
        Date:{" "}
        {new Date(expense.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
          Edit Expense
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none">
          Delete Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseDetail;
