const ITEM_ADD = 'ITEM_ADD';
const ITEM_REDO = 'ITEM_REDO';
const ITEM_UNDO = 'ITEM_UNDO';
const ITEM_CHANGE = 'ITEM_CHANGE';
const ITEM_DELETE = 'ITEM_DELETE';
const ITEM_SET_TO_CHANGE = 'ITEM_SET_TO_CHANGE';
const ITEM_ADD_EMPTY = 'ITEM_ADD_EMPTY';
const TABLE_DUPLICATE = 'TABLE_DUPLICATE';
const TABLE_SAVE = 'TABLE_SAVE';
const TABLE_CANCEL = 'TABLE_CANCEL';

const initialState = {
  itemChangeIndex: -1,
  addingNewItem: false,
  showingDuplicate: false,
  history: {
    list: [],
    position: -1,
  },
  items: [
    { name: 'Apples', cost: 20 },
    { name: 'Oranges', cost: 30 },
  ],
};

export default function reducer(state = initialState, action) {
  const { type, index } = action;
  const { items, history: { list, position } } = state;
  const newItems = [ ...items ];

  switch (type) {
    case ITEM_ADD:
      newItems.push(action.item);

      return {
        ...state,
        items: newItems,
        addingNewItem: false,
        itemChangeIndex: -1,
        history: {
          list: [...list, { type, item: action.item }],
          position: position + 1,
        },
      };

    case ITEM_CHANGE:
      const oldItem = newItems[index];

      newItems[index] = action.item;

      return {
        ...state,
        items: newItems,
        itemChangeIndex: -1,
        history: {
          list: [...list, { type, index, oldItem, item: action.item }],
          position: position + 1,
        },
      };

    case ITEM_DELETE:
      const item = newItems.splice(index, 1)[0];

      return {
        ...state,
        items: newItems,
        history: {
          list: [...list, { type, index, item }],
          position: position + 1,
        },
      };

    case ITEM_UNDO:
      switch (list[position].type) {
        case ITEM_ADD:
          newItems.pop();
          break;

        case ITEM_CHANGE:
          newItems[list[position].index] = list[position].oldItem;
          break;

        default:
          newItems.splice(list[position].index, 0, list[position].item);
          break;
      }

      return {
        items: newItems,
        itemChangeIndex: -1,
        history: {
          list,
          position: position - 1,
        },
      };

    case ITEM_REDO:
      const nextStepPosition = position + 1;

      switch (list[nextStepPosition].type) {
        case ITEM_ADD:
          newItems.push(list[nextStepPosition].item);
          break;

        case ITEM_CHANGE:
          newItems[list[nextStepPosition].index] = list[nextStepPosition].item;
          break;

        default:
          newItems.splice(list[nextStepPosition].index, 1);
          break;
      }

      return {
        items: newItems,
        itemChangeIndex: -1,
        history: {
          list,
          position: nextStepPosition,
        },
      };

    case ITEM_SET_TO_CHANGE:
      return {
        ...state,
        addingNewItem: false,
        itemChangeIndex: index,
      };

    case ITEM_ADD_EMPTY:
      return {
        ...state,
        addingNewItem: true,
        itemChangeIndex: items.length,
      };

    case TABLE_DUPLICATE:
      return {
        ...state,
        showingDuplicate: true,
      };

    case TABLE_SAVE:
      return {
        ...state,
        items: action.items,
        showingDuplicate: false,
      };

    case TABLE_CANCEL:
      return {
        ...state,
        showingDuplicate: false,
      };

    default:
      return state;
  }
};

export const addItem = item => ({
  type: ITEM_ADD,
  item,
});

export const changeItem = (index, item) => ({
  type: ITEM_CHANGE,
  item,
  index,
});

export const deleteItem = index => ({
  type: ITEM_DELETE,
  index,
});

export const setItemToChange = index => ({
  type: ITEM_SET_TO_CHANGE,
  index,
});

export const prepareToAddNewItem = () => ({
  type: ITEM_ADD_EMPTY,
});

export const undo = () => ({
  type: ITEM_UNDO,
});

export const redo = () => ({
  type: ITEM_REDO,
});

export const showDuplicateTable = () => ({
  type: TABLE_DUPLICATE,
});

export const saveTable = items => ({
  type: TABLE_SAVE,
  items
});

export const hideDuplicatedTable = () => ({
  type: TABLE_CANCEL
});

