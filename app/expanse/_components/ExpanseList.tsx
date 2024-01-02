import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseFormModal from "./ExpanseModel";

interface Expense {
  id: number;
  title: string;
  amount: string;
  paymentMethod: string;
  category: string;
  description: string;
  createdAt: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [filteredPaymentMethod, setFilteredPaymentMethod] = useState<
    string | null
  >(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

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

  const paymentMethods = Array.from(
    new Set(expenses.map((expense) => expense.paymentMethod))
  );

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPaymentMethod = event.target.value;
    setFilteredPaymentMethod(
      selectedPaymentMethod !== "" ? selectedPaymentMethod : null
    );
  };

  const handleEditClick = (expense: Expense) => {
    setExpenseToEdit(expense);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setExpenseToEdit(null);
  };
  const handleDeleteExpense = async (id: number) => {
    try {
      // Make an HTTP DELETE request to your server
      const response = await axios.delete(
        `http://localhost:4000/expenses/${id}`
      );

      // Check if the deletion was successful (status code 204)
      if (response.status === 204) {
        // Refetch the updated list of expenses from the server
        const updatedExpensesResponse = await axios.get(
          "http://localhost:4000/expenses"
        );
        const updatedExpenses = updatedExpensesResponse.data;

        // Update the state with the updated list of expenses
        setExpenses(updatedExpenses);
      } else {
        console.error(
          "Failed to delete expense. Status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const filteredExpenses = filteredPaymentMethod
    ? expenses.filter(
        (expense) => expense.paymentMethod === filteredPaymentMethod
      )
    : expenses;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expense List</h2>
      <div className="mb-4"></div>
      <p className="mb-2">Total Amount: {totalAmount.toFixed(2)} Rupees</p>

      <table className="w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-600 p-2">Title</th>
            <th className="border border-gray-600 p-2">Amount (Rupees)</th>
            <th className="border border-gray-600 p-2">
              Payment Method{" "}
              <select
                value={filteredPaymentMethod || ""}
                onChange={handlePaymentMethodChange}
                className="border border-gray-600 p-1 ml-2"
              >
                <option value="">All</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </th>
            <th className="border border-gray-600 p-2">Category</th>
            <th className="border border-gray-600 p-2">Description</th>
            <th className="border border-gray-600 p-2">Date</th>
            <th className="border border-gray-600 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id} className="bg-gray-100">
              <td className="border border-gray-600 p-2">{expense.title}</td>
              <td className="border border-gray-600 p-2">{expense.amount}</td>
              <td className="border border-gray-600 p-2">
                {expense.paymentMethod}
              </td>
              <td className="border border-gray-600 p-2">{expense.category}</td>
              <td className="border border-gray-600 p-2">
                {expense.description}
              </td>
              <td className="border border-gray-600 p-2">
                {new Date(expense.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-600 p-2">
                <button
                  onClick={() => handleEditClick(expense)}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <ExpenseFormModal
          onClose={handleCloseModal}
          isEditing={true}
          expenseToEdit={expenseToEdit}
        />
      )}
    </div>
  );
};

export default ExpenseList;
