import redis from "redis";

export const client = redis.createClient(6379, "redis");
