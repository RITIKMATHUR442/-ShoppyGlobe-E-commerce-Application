const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.id === item.id);
      const newCartItems = existItem 
        ? state.cartItems.map(x => 
            x.id === existItem.id ? { ...item, quantity: (x.quantity || 1) + 1 } : x
          )
        : [...state.cartItems, { ...item, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return {
        ...state,
        cartItems: newCartItems
      };
    case 'REMOVE_FROM_CART':
      const updatedCartItems = state.cartItems.filter(x => x.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems
      };
    case 'DECREMENT_CART_ITEM':
      const decrementedCartItems = state.cartItems.map(x =>
        x.id === action.payload ? { ...x, quantity: x.quantity - 1 } : x
      ).filter(x => x.quantity > 0);
      localStorage.setItem('cartItems', JSON.stringify(decrementedCartItems));
      return {
        ...state,
        cartItems: decrementedCartItems
      };
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;