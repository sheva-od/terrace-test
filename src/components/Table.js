import React, { Component } from "react";

import { Item } from "../components/ItemCell";

export class Table extends Component {

  itemCheckHandler = evt => {
    this.props.handleSelectedItems(evt.target.value);
  };

  render() {
    const {
      items,
      addItem,
      addingNewItem,
      itemChangeIndex,
      itemChangeHandler,
      itemDeleteHandler,
      setItemToChange,
      isDuplicatedTable,
      showingDuplicate
    } = this.props;

    return (
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              {isDuplicatedTable && <th />}
              <th>Item</th>
              <th>Cost per lb/kg</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Item
                key={index}
                value={item}
                index={index}
                changeHandler={itemChangeHandler}
                deleteHandler={itemDeleteHandler}
                itemChangeIndex={itemChangeIndex}
                setItemToChange={setItemToChange}
                isDuplicatedTable={isDuplicatedTable}
                showingDuplicate={showingDuplicate}
                checkHandler={this.itemCheckHandler}
              />
            ))}
            {addingNewItem && (
              <Item
                value={{ name: "", cost: 0 }}
                index={items.length}
                addItem={addItem}
                itemChangeIndex={itemChangeIndex}
                addingNewItem={addingNewItem}
                setItemToChange={setItemToChange}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
