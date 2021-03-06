// 액션
const ADD_ITEM = 'addCart/ADD_ITEM'
const DELETE_ITEM = 'addCart/DELETE_ITEM'
const SELECT_ITEM = 'addCart/SELECT_ITEM'
const EDIT_ITEM = 'addCart/EDIT_ITEM'
const PLUS_ONE = 'addCart/PLUS_ONE'
const MINUS_ONE = 'addCart/MINUS_ONE'

const initialState = {
  items: [],
}

//액션함수
let id = 1
export const addItem = (item) => ({
  type: ADD_ITEM,
  item: {
    ...item,
    id: id++,
    selected: true,
    total: item.price * item.quantity,
  },
})
export const selectItem = (id) => ({
  type: SELECT_ITEM,
  id,
})
export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  id,
})
export const editItem = (id) => ({
  type: EDIT_ITEM,
  id,
})
export const plusOne = (id) => ({
  type: PLUS_ONE,
  id,
})
export const minusOne = (id) => ({
  type: MINUS_ONE,
  id,
})


function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return { items: state.items.concat(action.item) }
    case DELETE_ITEM:
      return { items: state.items.filter((item) => item.id !== action.id) }
    case SELECT_ITEM:
      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                selected: !item.selected,
                total: item.quantity * item.price,
              }
            : item,
        ),
      }
    case PLUS_ONE:
      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                quantity: (item.quantity += 1),
                total: item.quantity * item.price,
              }
            : item,
        ),
      }
    case MINUS_ONE:
      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                quantity: (item.quantity -= 1),
                total: item.quantity * item.price,
              }
            : item,
        ),
      }
    default:
      return state
  }
}
export default cartReducer
