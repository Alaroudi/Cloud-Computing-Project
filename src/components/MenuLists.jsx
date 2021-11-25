import React from "react";

import { useHistory } from "react-router-dom";

const MenuLists = ({ lists }) => {
  const history = useHistory();

  return (
    <div className="list-container">
      {lists.map(list => (
        <div
          key={list.id}
          className="list__name"
          onClick={() => history.push(`/${list.id}`)}
        >
          {`${list.list_name}`}
        </div>
      ))}
    </div>
  );
};

export default MenuLists;
