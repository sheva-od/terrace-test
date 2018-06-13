import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/item/reducer';
import { Table } from '../components/Table';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      selectedItems: []
    };
  }

  saveHandler = () => {
    let selectedItems = this.props.items.filter((item, index) => this.state.selectedItems.includes(index));
    this.props.saveTable(selectedItems);
    this.setState({selectedItems: []});
  }

  cancelHandler = () => {
    this.props.hideDuplicatedTable();
    this.setState({selectedItems: []});
  }

  changeSelectedItemsHandler = index => {
    this.setState(prevState => ({ selectedItems: [...prevState.selectedItems, +index] }));
  }

  render() {
    const {
      items,
      addItem,
      changeItem,
      deleteItem,
      undo,
      redo,
      history,
      itemChangeIndex,
      addingNewItem,
      prepareToAddNewItem,
      setItemToChange,
      showDuplicateTable,
      showingDuplicate,
      history: { position, list: { length } },
    } = this.props;

    return (
      <div className="">
        <div>
          <Table
            items={items}
            addItem={addItem}
            undo={undo}
            redo={redo}
            history={history}
            itemChangeIndex={itemChangeIndex}
            addingNewItem={addingNewItem}
            isDuplicatedTable={false}
            showingDuplicate={showingDuplicate}
            itemChangeHandler={changeItem}
            itemDeleteHandler={deleteItem}
            setItemToChange={setItemToChange}>
          </Table>
          {!addingNewItem && <div>
            <button
              className="btn btn-sm btn-primary m-1"
              onClick={prepareToAddNewItem}
              disabled={showingDuplicate}>
              Add new row
            </button>
            <button
              className="btn btn-sm btn-primary m-1"
              onClick={showDuplicateTable}>
              Rebuild Table
            </button>
            <button
              className="btn btn-sm btn-dark ml-2"
              onClick={undo}
              disabled={position === -1}>
              Undo
            </button>
            <button
              className="btn btn-sm btn-dark ml-2"
              onClick={redo}
              disabled={!(position < length - 1)}>
              Redo
            </button>
          </div>}
          {showingDuplicate && <div>
            <Table
              undo={undo}
              redo={redo}
              items={items}
              addItem={addItem}
              history={history}
              itemChangeIndex={itemChangeIndex}
              addingNewItem={addingNewItem}
              isDuplicatedTable={true}
              itemChangeHandler={changeItem}
              itemDeleteHandler={deleteItem}
              setItemToChange={setItemToChange}
              handleSelectedItems={this.changeSelectedItemsHandler}>
            </Table>
            <button
              className="btn btn-sm btn-success mx-1"
              onClick={this.saveHandler}>
              Save Table
            </button>
            <button
              className="btn btn-sm btn-danger mx-1"
              onClick={this.cancelHandler}>
              Cancel
            </button>
          </div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  items: {
    items,
    history,
    itemChangeIndex,
    addingNewItem,
    showingDuplicate,
  },
}) => ({
  items,
  history,
  itemChangeIndex,
  addingNewItem,
  showingDuplicate,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(App);
