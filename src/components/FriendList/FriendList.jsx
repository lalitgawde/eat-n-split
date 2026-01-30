import React, { useEffect, useState } from "react";
import styles from "./FriendList.module.css";
import { initialFriends } from "../../data";
import AddFriend from "../AddFriend/AddFriend";
import FriendItem from "../FriendItem/FriendItem";

function messageColor(friend) {
  let color = "";
  let msg = `You and ${friend.name} are even`;

  if (friend.balance > 0) {
    color = "#66a80f";
    msg = `${friend.name} owe me $${friend.balance}`;
  } else if (friend.balance < 0) {
    color = "#e03131";
    msg = `You owe ${friend.name} $${Math.abs(friend.balance)}`;
  }

  return (
    <p className={styles.message} style={color !== "" ? { color } : {}}>
      {msg}
    </p>
  );
}

function FriendList({ selectedItem, onSelect }) {
  const [isAddFriend, setIsAddFriend] = useState(false);
  const storedFriends = localStorage.getItem("friends")
    ? JSON.parse(localStorage.getItem("friends"))
    : initialFriends;
  const [friends, setFriends] = useState(storedFriends);

  const addFriendHandler = (friend) => {
    setFriends((oldFriendList) => [...oldFriendList, friend]);
  };

  useEffect(() => {
    setFriends((oldFriendList) =>
      oldFriendList.map((friend) =>
        friend.id === selectedItem?.id ? selectedItem : friend,
      ),
    );
  }, [selectedItem]);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  return (
    <div className={styles.friendList}>
      <ul style={{ maxHeight: `${!isAddFriend ? "45vh" : "25vh"}` }}>
        {friends.map((friend) => {
          const isSelected = friend.id === selectedItem?.id;
          const msg = messageColor(friend);
          return (
            <FriendItem
              friend={friend}
              isSelected={isSelected}
              onSelect={onSelect}
              message={msg}
            />
          );
        })}
      </ul>
      {isAddFriend && <AddFriend addFriend={addFriendHandler} />}
      <div className={styles.align}>
        <button
          className={styles.button}
          onClick={() => setIsAddFriend((prevState) => !prevState)}
          style={{ width: "100%" }}
        >
          {isAddFriend ? "Close" : "Add Friend"}
        </button>
      </div>
    </div>
  );
}

export default FriendList;
