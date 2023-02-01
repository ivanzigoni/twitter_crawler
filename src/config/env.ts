import * as dotenv from 'dotenv'
dotenv.config()

const { TWITTER_USERNAME, TWITTER_PASSWORD } = process.env;

const env = {
  TWITTER_USERNAME,
  TWITTER_PASSWORD
} as { TWITTER_USERNAME: string, TWITTER_PASSWORD: string }

export { env };
