import mysql, { Connection } from "mysql2/promise"

interface ConnectionConfig {
  host: string
  user: string
  password: string
  database: string
}

const connectionConfig: ConnectionConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bhavya",
}

export async function getConnection(): Promise<Connection> {
  const connection = await mysql.createConnection(connectionConfig)
  return connection
}
