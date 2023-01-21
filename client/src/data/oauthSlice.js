// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: "AuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/pages/",
    }),
    endpoints: (builder) => ({
        AuthApi: builder.query({
            query: () => `getPages`,
        }),
        deletePage: builder.mutation({
            query: (id) => ({
                url:`deletePage/${id}`,
                method:'POST',
            }), 
        })
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAuthApiQuery,useDeletePageMutation} = authApi;
