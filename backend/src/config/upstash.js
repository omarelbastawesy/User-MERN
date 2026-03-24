import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!upstashUrl || !upstashToken) {
  throw new Error(
    "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be defined in environment"
  );
}

const redis = new Redis({
  url: upstashUrl,
  token: upstashToken,
});

const reteLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
});

export default reteLimit;
