import React, { Component } from 'react';

export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props.value, onHover: false };
  }

  changeHandler = evt => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  }

  editHandler = () => {
    const { index, setItemToChange } = this.props;
    this.setState({ onHover: false });

    setItemToChange(index);
  }

  onMouseEnterHandler = () => {
    this.setState({ onHover: true });
  }

  onMouseLeaveHandler = () => {
    this.setState({ onHover: false });
  }

  submit = () => {
    const { name, cost } = this.state;
    const {
      index,
      addItem,
      changeHandler,
      addingNewItem,
    } = this.props;

    const item = { name, cost: +cost };

    if (addingNewItem) {
      addItem(item);
    } else {
      changeHandler(index, item);
    }
  }

  deleteHandler = () => {
    const { deleteHandler, index } = this.props;

    deleteHandler(index);
  }

  renderView() {
    const { onHover } = this.state;
    const {
      itemChangeIndex,
      isDuplicatedTable,
      showingDuplicate,
      checkHandler,
      index,
      value: { name, cost }
    } = this.props;

    return (
      <tr
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        style={{height: '60px'}}>
        {isDuplicatedTable &&
          <td>
            <input
              type="checkbox"
              value={index}
              onChange={checkHandler}
            />
          </td>
        }
        <td>{name}</td>
        <td>${cost}</td>
        <td style={{width: '400px'}}>
        {itemChangeIndex === -1 && onHover && !isDuplicatedTable && <div>
          <button onClick={this.editHandler} disabled={showingDuplicate} className="btn btn-sm btn-primary mr-1">Edit</button>
          <button onClick={this.deleteHandler} disabled={showingDuplicate} className="btn btn-sm btn-danger">Delete</button>
        </div>}
        </td>
      </tr>
    );
  }

  renderEditView() {
    const { name, cost } = this.state;
    const { setItemToChange } = this.props;

    return (
      <tr
        onMouseEnter={this.hoverHandler}
        onMouseLeave={this.hoverHandler}>
        <td width="200">
          <div className="input-group input-group-sm">
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={this.changeHandler} />
          </div>
        </td>
        <td>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              type="number"
              name="cost"
              value={cost}
              className="form-control"
              onChange={this.changeHandler} />
          </div>
        </td>
        <td>
          <button onClick={this.submit} className="btn btn-sm btn-success mr-1">Save</button>
          <button onClick={() => setItemToChange(-1)} className="btn btn-sm btn-danger">Cancel</button>
        </td>
      </tr>
    );
  }

  render() {
    const { itemChangeIndex, index } = this.props;

    return (
      itemChangeIndex === index ? this.renderEditView() : this.renderView()
    );
  }
}
