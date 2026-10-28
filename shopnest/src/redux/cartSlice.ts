import { createSlice } from "@reduxjs/toolkit";


interface Igrocery{
    _id?:string,
    name:string,
    category:string,
    price:string,
    unit:string,
    quantity:number,
    image:string,
    createdAt?:Date,
    updatedAt?:Date
}

interface ICartSlice {
    cartData : Igrocery[],
     subTotal: number,
    deliveryFee : number,
    finalFee:number

} 
const initialState : ICartSlice = {
    cartData:[],
    subTotal: 0,
    deliveryFee :49,
    finalFee : 49
} 

const cartSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addToCart : (state,action) =>{
            state.cartData.push(action.payload)
            cartSlice.caseReducers.calculateTotal(state)
        },
        increaseQuantity:(state,action)=>{
            const item = state.cartData.find((i)=> i._id === action.payload)
            if(item)
            {
                item.quantity = item.quantity+1
            }
            cartSlice.caseReducers.calculateTotal(state)
        },
        decreaseQuantity:(state,action)=>{
            const item = state.cartData.find((i)=> i._id === action.payload)
            if(item?.quantity && item.quantity>1)
            {
                item.quantity = item.quantity-1
            }
            else{
                state.cartData = state.cartData.filter(i=>i._id !== action.payload)
            }
            cartSlice.caseReducers.calculateTotal(state)
        },
        removeFromCart:(state,action)=>{
             state.cartData = state.cartData.filter(i=>i._id !== action.payload)
             cartSlice.caseReducers.calculateTotal(state)
        },
        calculateTotal:(state)=>{
            state.subTotal = state.cartData.reduce((sum,item)=>sum + Number(item.price)*(item.quantity),0)
            state.deliveryFee = state.subTotal >99 ? 0 : 49
            state.finalFee = state.subTotal + state.deliveryFee
            
        }
    }
})

export const {addToCart,increaseQuantity,decreaseQuantity,removeFromCart,    calculateTotal} = cartSlice.actions

export default cartSlice.reducer