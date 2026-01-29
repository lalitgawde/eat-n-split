import React, { useEffect, useState } from "react";
import styles from "./FriendList.module.css";
import { initialFriends } from "../../data";
import AddFriend from "../AddFriend/AddFriend";

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
          const msg =
            friend.balance === 0 ? (
              <p className={styles.message}>You and {friend.name} are even</p>
            ) : friend.balance > 0 ? (
              <p className={styles.message} style={{ color: "#66a80f" }}>
                {friend.name} owe me ${friend.balance}
              </p>
            ) : (
              <p className={styles.message} style={{ color: "#e03131" }}>
                You owe {friend.name} ${Math.abs(friend.balance)}
              </p>
            );
          return (
            <li
              className={`${styles.friendListItem} ${isSelected ? styles.selected : ""}`}
              key={friend.id}
            >
              <div className={styles.info}>
                <img src={friend.image} alt="profile image" />
                <div>
                  <p className={styles.name}>{friend.name}</p>
                  {msg}
                </div>
              </div>
              <button
                className={styles.button}
                onClick={() => onSelect(isSelected, friend)}
              >
                {!isSelected ? "Select" : "Close"}
              </button>
            </li>
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
