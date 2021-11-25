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

  function removeItem() {
    //Remove a firebase list element
    console.log(
      "Remove the last item in the list: " +
        list.list_items[list.list_items.length - 1].name
    );
  }

  async function deleteList() {
    //Remove this list and reroute to home
    await deleteDoc(doc(db, "List_Maker", list.id));
  }

  function handleCheck(name) {
    //Register checkbox status on firebase
    console.log("Change the value of the checkbox for '" + name + "'");
  }

  return (
    <div className="list-viewer-container">
      <h1>{list.list_name}</h1>
      {list.list_items.map((item, index) => (
        <div id="item-name" key={index}>
          <input
            id="check"
            onChange={() => handleCheck(item.name)}
            type="checkbox"
            checked={item.done}
          />
          <label className="list-item" htmlFor="check">
            {item.name}
          </label>
        </div>
        //<li key={index}>{item.name}</li> - original solution
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
        onClick={removeItem}
        type="button"
        value="Remove Item"
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
