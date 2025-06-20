import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    port: Number(env.SINGLESTORE_PORT),
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
  },
  tablesFilter: ["drive-clone_*"],
} satisfies Config;
