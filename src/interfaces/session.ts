import { Browser, Page } from "puppeteer";

export interface Session {
  browser: Browser;
  user: {
    username: string,
    password: string,
  }
}