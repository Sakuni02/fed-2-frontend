import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Api = createApi({
    reducerPath: "Api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api`,
        prepareHeaders: async (headers) => {
            return new Promise((resolve) => {
                async function checkToken() {
                    const clerk = window.Clerk;
                    if (clerk) {
                        const token = await clerk.session?.getToken();
                        headers.set("Authorization", `Bearer ${token}`);
                        resolve(headers);
                    } else {
                        setTimeout(checkToken, 500);
                    }
                }
                checkToken();
            });
        },
    }),

    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => `/products`,
        }),
        getProductsBySearch: build.query({
            query: (query) => `/products/search?search=${query}`,
        }),
        getAllCategories: build.query({
            query: () => `/categories`,
        }),
        createProduct: build.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),
        createOrder: build.mutation({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: order,
            }),
        }),
        getCheckoutSessionStatus: build.query({
            query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
        }),


        // --- NEW SHOP ENDPOINTS ---
        getShopProducts: build.query({
            query(args) {
                const categorySlug = args?.categorySlug;
                const color = args?.color;
                const sort = args?.sort;
                const page = args?.page || 1;
                const limit = args?.limit || 24;
                const exclude = args?.exclude;

                let url = "/products/shop";
                if (categorySlug) url += `/${categorySlug}`;

                const params = new URLSearchParams();
                if (color) params.append("color", color);
                if (sort) params.append("sort", sort);
                if (exclude) params.append("exclude", exclude);
                params.append("page", page.toString());
                params.append("limit", limit.toString());

                return `${url}?${params.toString()}`;
            },
        }),

        getAllColors: build.query({
            query: () => `/colors`, // backend route that returns all colors
        }),

        getProductById: build.query({
            query: (id) => `/products/${id}`,
        }),

        getCart: build.query({
            query: () => `/cart`
        }),

        addToCart: build.mutation({
            query: (productId) => ({
                url: `/cart/add`,
                method: "POST",
                body: { productId },
            }),
        }),

        updateCartQuantity: build.mutation({
            query: ({ productId, quantity }) => ({
                url: `/cart/quantity`,
                method: "PUT",
                body: { productId, quantity },
            })
        }),
        removeCartItem: build.mutation({
            query: (productId) => ({
                url: `/cart/remove`,
                method: "DELETE",
                body: { productId },
            }),
        }),



    }),



});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllProductsQuery,
    useGetProductsBySearchQuery,
    useCreateOrderMutation,
    useCreateProductMutation,
    useGetAllCategoriesQuery,
    useGetCheckoutSessionStatusQuery,
    useGetShopProductsQuery,
    useGetAllColorsQuery,
    useGetProductByIdQuery,
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartQuantityMutation,
    useRemoveCartItemMutation,
} = Api;