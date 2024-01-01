"use client";
import { useState } from "react";
import ExpenseModal from "./_components/ExpanseModel";
import ExpanseList from "./_components/ExpanseList";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <button
        onClick={openModal}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Add Expense
      </button>

      {isModalOpen && <ExpenseModal onClose={closeModal} />}
      <ExpanseList />
    </div>
  );
}
