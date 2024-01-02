import axios from "axios";
import { useState, useEffect } from "react";
import { Expense } from "../types";

interface ExpenseFormModalProps {
  onClose: () => void;
  isEditing: boolean;
  expenseToEdit: Expense | null;
}

const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({
  onClose,
  isEditing,
  expenseToEdit,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEditing && expenseToEdit) {
      // Populate form fields with expense details when editing
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setPaymentMethod(expenseToEdit.paymentMethod);
      setCategory(expenseToEdit.category);
      setDescription(expenseToEdit.description);
    }
  }, [isEditing, expenseToEdit]);

  const handleAddOrUpdateExpense = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const expenseData = {
      title,
      amount,
      paymentMethod,
      category,
      description,
      createdAt: formattedDate,
    };

    try {
      if (isEditing && expenseToEdit) {
        // If editing, update the existing expense
        await axios.put(
          `http://localhost:4000/expenses/${expenseToEdit.id}`,
          expenseData
        );
      } else {
        // If not editing, add a new expense
        await axios.post("http://localhost:4000/expenses", expenseData);
      }

      onClose();
    } catch (error) {
      console.error("Error adding/updating expense:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="bg-gray-800 bg-opacity-50 w-full h-full absolute"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-lg z-10 max-w-md w-full">
        <span
          className="text-red-500 text-2xl font-bold absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Expense" : "Add Expense"}
        </h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Amount
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Payment Method</option>
          <option value="Online Payment">Online Payment</option>
          <option value="Credit/Debit Card">Credit/Debit Card</option>
          <option value="Cash">Cash</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleAddOrUpdateExpense}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none mt-6"
        >
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </div>
  );
};

export default ExpenseFormModal;
