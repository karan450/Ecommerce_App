import { createSlice } from "@reduxjs/toolkit"; 

const cartSlice = createSlice({
    name: 'cartItem',
    initialState: {
        cart: []
    },
    reducers:{
        addtoCart(state,action){
            const index = state.cart.findIndex(item=> action.payload.id === item.id)
            if(index!==-1){
                state.cart[index].quantity++; 
            }else{
                state.cart.push(action.payload);
            }
        },
        removefromCart(state,action){
            state.cart =  state.cart.filter(item=>item.id !== action.payload)
        },
        clearCart(state){
            state.cart = [];
        },
        increaseQuantity(state, action) {
            const index = state.cart.findIndex(item => item.id === action.payload);
            state.cart[index].quantity++;
        },
        decreaseQuantity(state, action) {
            const index = state.cart.findIndex(item => item.id === action.payload);
            state.cart[index].quantity--;
        }

    }
})

export const {addtoCart,removefromCart,increaseQuantity,decreaseQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;


