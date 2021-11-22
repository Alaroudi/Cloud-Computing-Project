import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "./services/firebase";
import "./App.css";
import MenuLists from "./components/MenuLists";
import { Route, useRouteMatch } from "react-router";
import List from "./components/List";

const App = () => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "List_Maker"), snapshot => {
      setLists(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const match = useRouteMatch();
  console.log(match.params);

  return (
    <div className="main-container">
      <div className="menu-container">
        <div className="logo-container">
          <img src="./images/logo.png" width="100%" alt="" />
        </div>
        <MenuLists lists={lists} />
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
