import React, { useState } from "react";
import FriendList from "./components/FriendList/FriendList";
import SplitBills from "./components/SplitBills/SplitBills";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const onSelectHandler = (isSelected, friend) => {
    if (!isSelected) {
      setSelectedItem(friend);
    } else {
      setSelectedItem(null);
    }
  };

  const changeBalanceHandler = (value) => {
    setSelectedItem((cur) => ({ ...cur, balance: value }));
  };

  return (
    <div className="container">
      <FriendList selectedItem={selectedItem} onSelect={onSelectHandler} />
      <SplitBills
        selectedItem={selectedItem}
        changeBalanceHandler={changeBalanceHandler}
      />
    </div>
  );
}

export default App;
