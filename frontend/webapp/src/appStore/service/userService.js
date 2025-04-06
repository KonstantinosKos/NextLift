import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090/api/auth/',
        credentials: "include", // Important for authentication
        mode: 'cors',
    }),
    endpoints: (builder) => ({
        addNewUser: builder.mutation({
            query: (newUser) => ({
                url: `signup`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: `signin`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: user,
            }),
            transformResponse: (response) =>  response
        })
    }),
});

export const { useAddNewUserMutation, useLoginUserMutation } = userApi;
