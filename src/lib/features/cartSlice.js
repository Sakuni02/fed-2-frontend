import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../api";

export const loadUserCart = createAsyncThunk(
    "cart/loadUserCart",
    async (_, { dispatch }) => {
        const result = await dispatch(Api.endpoints.getCart.initiate());
        return result.data
    }
);

export const addItemToDB = createAsyncThunk(
    "cart/addItemToDB",
    async (productId, { dispatch }) => {
        const result = await dispatch(Api.endpoints.addToCart.initiate(productId));
        return result.data;
    }
);

export const updateQuantityInDB = createAsyncThunk(
    "cart/updateQuantityInDB",
    async ({ productId, quantity }, { dispatch }) => {
        const result = await dispatch(Api.endpoints.updateCartQuantity.initiate({ productId, quantity }));
        return result.data;
    }
);

export const removeItemFromDB = createAsyncThunk(
    "cart/removeItemFromDB",
    async (productId, { dispatch }) => {
        const result = await dispatch(Api.endpoints.removeCartItem.initiate(productId));
        return result.data;
    }
);


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: false,
    },

    reducers: {
        // addToCart: (state, action) => { // Immer
        //     const newItem = action.payload;
        //     const foundItem = state.cartItems.find(
        //         (el) => el.product._id === newItem._id
        //     );
        //     if (!foundItem) {
        //         state.cartItems.push({ product: action.payload, quantity: 1 });
        //         return;
        //     }
        //     foundItem.quantity += 1;
        // },
        clearLocalCar(state) {
            state.cartItems = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadUserCart.fulfilled, (state, action) => {
                if (action.payload?.items) {          //access items if items exist
                    state.cartItems = action.payload.items;
                }
            })

            .addCase(addItemToDB.fulfilled, (state, action) => {
                if (action.payload?.items) {
                    state.cartItems = action.payload.items;
                }
            })

            .addCase(updateQuantityInDB.fulfilled, (state, action) => {
                if (action.payload?.items) {
                    state.cartItems = action.payload.items;
                }
            })

            .addCase(removeItemFromDB.fulfilled, (state, action) => {
                state.cartItems = action.payload.items;
            })
    },
});

// Action creators are generated for each case reducer function
export const { clearLocalCar } = cartSlice.actions;

export default cartSlice.reducer;