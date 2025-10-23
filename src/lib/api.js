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

                let url = "/products/shop";
                if (categorySlug) url += `/${categorySlug}`;

                const params = new URLSearchParams();
                if (color) params.append("color", color);
                if (sort) params.append("sort", sort);
                params.append("page", page.toString());
                params.append("limit", limit.toString());

                return `${url}?${params.toString()}`;
            },
        }),

        // --- Add this inside your endpoints ---
        getAllColors: build.query({
            query: () => `/colors`, // backend route that returns all colors
        }),

        getProductById: build.query({
            query: (id) => `/products/${id}`,
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
} = Api;