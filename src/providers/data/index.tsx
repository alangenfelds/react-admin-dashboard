import graphqlDataProvider, {
  liveProvider as graphqlLiveProvider,
  GraphQLClient,
} from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";

import { fetchWrapper } from "./fetch-wrapper";

export const API_BASE_URL = "https://api.crm.refine.dev";

export const API_URL = "https://api.crm.refine.dev/graphql";
const WS_URL = "wss://api.crm.refine.dev/graphql";

const client = new GraphQLClient(API_URL, {
  headers: {
    "Content-Type": "application/json",
  },
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");

          return {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
      })
    : undefined;

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined;
