import { Client, Query } from "ts-postgres";

import { createPool } from "generic-pool";

const pool = createPool(
  {
    create: async () => {
      const client = new Client({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        port: 1337,
      });
      return client.connect().then(() => {
        client.on("error", console.log);
        return client;
      });
    },
    destroy: async (client: Client) => {
      return client.end().then(() => {});
    },
    validate: (client: Client) => {
      return Promise.resolve(!client.closed);
    },
  },
  { testOnBorrow: true }
);

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  port: 1337,
});

export const dataAccountSearch = async (query: string, userId: string) => {
  try {
    const searchedUserId = new Query(query, [userId]);
    const selectedUserId = await client.execute(searchedUserId);
    return selectedUserId;
  } catch (err) {
    console.log(err);
  }
};

export const saveAccount = async (
  query: string,
  userId: string,
  hash: string,
  firstName: string,
  lastName: string
) => {
  try {
    const savingAccountQuery = new Query(query, [
      userId,
      hash,
      firstName,
      lastName,
    ]);
    console.log(savingAccountQuery, "whattt");

    client.execute(savingAccountQuery);
  } catch (err) {
    console.log(err);
  }
};
