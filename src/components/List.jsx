import { arrayUnion, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { Redirect } from "react-router";
import db from "../services/firebase";

const List = ({ lists, match }) => {
  const [text, setText] = useState("New Item");

  const list = lists.find(list => list.id === match.params.id);
  if (!list) return <Redirect to="/" />;

  async function addItem() {
    //Add a firebase list element
    await updateDoc(doc(db, "List_Maker", list.id), {
      list_items: arrayUnion({ name: text, done: false })
    });
  }

  async function removeItem(name) {
    //Remove a firebase list element
    const updatedList = list.list_items.filter(item => item.name !== name);

    await updateDoc(doc(db, "List_Maker", list.id), {
      list_items: updatedList
    });
  }

  async function deleteList() {
    //Remove this list and reroute to home
    await deleteDoc(doc(db, "List_Maker", list.id));
  }

  async function handleCheck(event, name) {
    //Register checkbox status on firebase
    const updatedList = list.list_items.map(item => {
      if (item.name === name) {
        item.done = event.target.checked;
      }
      return item;
    });

    await updateDoc(doc(db, "List_Maker", list.id), {
      list_items: updatedList
    });
  }

  return (
    <div className="list-viewer-container">
      <h1>{list.list_name}</h1>
      {list.list_items.map((item, index) => (
        <div id="item-name" key={index}>
          <input
            id="check"
            onChange={event => handleCheck(event, item.name)}
            type="checkbox"
            checked={item.done}
          />
          <input
            className="listBtn"
            onClick={() => removeItem(item.name)}
            type="button"
            value="X"
          />
          <label className="list-item" htmlFor="check">
            {item.name}
          </label>
        </div>
      ))}
      <br />
      <input
        className="listBtn"
        onClick={addItem}
        type="button"
        value="Add Item"
      />
      <input
        className="listBtn"
        onClick={deleteList}
        type="button"
        value="Delete List"
      />{" "}
      <br />
      <input
        className="listText"
        onChange={event => setText(event.target.value)}
        type="textField"
        value={text}
      />
    </div>
  );
};

export default List;
