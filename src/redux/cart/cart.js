import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, action){
            const { productId, quantity } = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if(indexProductId >= 0){
                state.items[indexProductId].quantity += quantity;
            }else{
               state.items.push({productId, quantity}); 
            }
        },
        changeQuantity(state, action){
            const { productId, quantity } = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if(quantity >= 0){
                if(quantity > 0){
                     state.items[indexProductId].quantity = quantity;    
                }else{
               state.items.splice(productId, 1); 
            }
                
            }
        },
        
    }
})
export const { addToCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;