import React from "react";
import styles from "./FriendItem.module.css";

function FriendItem({ friend, isSelected, onSelect, message }) {
  console.log("message", message);
  return (
    <li
      className={`${styles.friendListItem} ${isSelected ? styles.selected : ""}`}
      key={friend.id}
    >
      <div className={styles.info}>
        <img src={friend.image} alt="profile image" />
        <div>
          <p className={styles.name}>{friend.name}</p>
          {message}
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
}

export default FriendItem;
