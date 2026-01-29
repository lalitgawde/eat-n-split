import React, { useState } from "react";
import styles from "./SplitsBills.module.css";

function SplitBills({ selectedItem, changeBalanceHandler }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const friendExpense = billValue && yourExpense ? billValue - yourExpense : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    let newBalance;
    if (!billValue || !yourExpense) return;
    if (whoIsPaying === "user") {
      newBalance = selectedItem.balance + friendExpense;
    } else {
      newBalance = selectedItem.balance - yourExpense;
    }
    changeBalanceHandler(newBalance);

    //reset form
    setBillValue("");
    setYourExpense("");
    setWhoIsPaying("user");
  };

  if (!selectedItem?.name) {
    return (
      <div className={styles["split-bills"]}>
        <h2>Please Select a friend to show form.</h2>
      </div>
    );
  }
  return (
    <div className={styles["split-bills"]}>
      <h2>Split a bill with {selectedItem?.name}</h2>
      <form className={styles["split-bills-form"]} onSubmit={handleSubmit}>
        <label>💰 Bill value</label>
        <input
          type="text"
          value={billValue}
          onChange={(e) => setBillValue(e.target.value)}
        />

        <label>🧍‍♀️ Your expense</label>
        <input
          type="text"
          value={yourExpense}
          onChange={(e) => setYourExpense(e.target.value)}
        />

        <label>👫 {selectedItem?.name}'s expense</label>
        <input type="text" disabled value={friendExpense} />

        <label>🤑 Who is paying the bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedItem?.name}</option>
        </select>

        <button className={styles["button"]}>Add</button>
      </form>
    </div>
  );
}

export default SplitBills;
