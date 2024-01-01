"use client";
import { useState } from "react";

interface ExpenseModalProps {
  onClose: () => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAddExpense = () => {
    const expenseData = {
      title,
      amount,
      paymentMethod,
      category,
      description,
    };
    console.log(expenseData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="bg-gray-800 bg-opacity-50 w-full h-full absolute"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-lg z-10">
        <span
          className="text-red-500 text-2xl font-bold absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <label className="block mb-2">Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <label className="block mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="Online Payment">Online Payment</option>
          <option value="Credit/Debit Card">Credit/Debit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <label className="block mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddExpense}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none mt-4"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ExpenseModal;
