import React from "react";

const List = ({ lists, match }) => {
  const list = lists.find(list => list.id === match.params.id);
  if (!list) return <h1>List is not found</h1>;
  return (
    <div className="list-viewer-container">
      <h1>{list.list_name}</h1>
        {list.list_items.map((item, index) => (
          <div id="item-name" key={index}>
            <input id="check" type="checkbox"/>
            <label className="list-item" for="check">{item.name}</label>
          </div>
          //<li key={index}>{item.name}</li> - original solution
        ))}
    </div>
  );
};

export default List;
