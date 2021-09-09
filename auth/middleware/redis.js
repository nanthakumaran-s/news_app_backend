import redis from "redis";

export const client = redis.createClient({
  host: "0.0.0.0",
  port: 6379,
});
