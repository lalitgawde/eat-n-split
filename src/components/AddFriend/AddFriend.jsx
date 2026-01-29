import React, { useState } from "react";
import styles from "./AddFriend.module.css";

function AddFriend({ addFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const friend = {
      id,
      name: friendName,
      image: `${imageUrl}/?${id}`,
      balance: 0,
    };
    addFriend(friend);
  };

  return (
    <form className={styles["add-friend-form"]} onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button className={styles["button"]}>Add</button>
    </form>
  );
}

export default AddFriend;
