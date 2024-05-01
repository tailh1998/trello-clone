const vueQuery = {
  // useState key used by nuxt for the vue query state.
  stateKey: "vue-query-nuxt", // default
  // If you only want to import some functions, specify them here.
  // You can pass false or an empty array to disable this feature.
  // default: ["useQuery", "useQueries", "useInfiniteQuery", "useMutation", "useIsFetching", "useIsMutating", "useQueryClient"]
  autoImports: ["useQuery"],
  // Pass the vue query client options here ...
  queryClientOptions: {
    // set default options
    defaultOptions: {
      queries: {
        staleTime: 5000,
        retry: false,
        refetchOnMount: "always",
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        throwOnError: true
      }
    }
  },
  // Pass the vue query plugin options here ....
  vueQueryPluginOptions: {}
}

export default vueQuery
