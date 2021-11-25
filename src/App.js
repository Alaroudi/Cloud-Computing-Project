import { addDoc, collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "./services/firebase";
import "./App.css";
import MenuLists from "./components/MenuLists";
import { Route } from "react-router";
import List from "./components/List";

const App = () => {
  const [text, setText] = useState("New List");
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "List_Maker"), snapshot => {
      setLists(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  async function addList() {
    //Add a new list to firebase
    const colRef = collection(db, "List_Maker");
    const payload = { list_name: text, list_items: [] };
    await addDoc(colRef, payload);
  }

  return (
    <div className="main-container">
      <div className="menu-container">
        <div className="logo-container">
          <img src="./images/logo.png" width="100%" alt="" />
        </div>
        <MenuLists lists={lists} />
        <input
          className="menuBtn"
          onClick={addList}
          type="button"
          value="Add List"
        />
        <input
          id="text"
          className="menuText"
          onChange={event => setText(event.target.value)}
          type="textField"
          value={text}
        />
      </div>

      <Route
        exact
        path="/:id"
        render={props => <List lists={lists} {...props} />}
      />
    </div>
  );
};

export default App;
