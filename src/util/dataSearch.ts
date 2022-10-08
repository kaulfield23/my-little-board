import { Client, Query } from "ts-postgres";
import { createPool } from "generic-pool";

console.log(process.env.POSTGRES_USER);
const pool = createPool(
  {
    create: async () => {
      const client = new Client({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        port: 5432,
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

export const dataAccountSearch = async (query: string, userId: string) => {
  try {
    const client = await pool.acquire();

    const searchedUserId = new Query(query, [userId]);
    const selectedUserId = await client.execute(searchedUserId);
    await pool.release(client);
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
  lastName: string,
  avatar: string
) => {
  try {
    const savingAccountQuery = new Query(query, [
      userId,
      hash,
      firstName,
      lastName,
      avatar,
    ]);
    const client = await pool.acquire();
    await client.execute(savingAccountQuery);
    await pool.release(client);
  } catch (err) {
    console.log(err);
  }
};

export const execQuery = async (query: string) => {
  try {
    const client = await pool.acquire();

    const searching = new Query(query);

    const result = await client.execute(searching);
    await pool.release(client);
    return result;
  } catch (err) {
    console.log(err);
  }
};
