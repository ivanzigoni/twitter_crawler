import { env } from "./config/env";
import { getPageUrl, Page } from "./interfaces/pages";
import { Session } from "./interfaces/session";
import puppeteer from "puppeteer";

class TwitterCrawler {

  constructor(private session: Session) {

  }

  public getSession() {
    return this.session;
  }

  public async login() {
    const session = this.getSession();
    const page = await this.getPage(session);
  
    await page.goto("https://twitter.com/i/flow/login");
  
    await page.waitForSelector('[autocomplete="username"]');
  
    await page.type('[autocomplete="username"]', session.user.username);
  
    await page.evaluate(() => {
      [...document.getElementsByTagName("div")]
        .filter(div => div.getAttribute("role") === "button")
        .find(div => [...div.children].find(element => element.textContent === "Next"))
        ?.setAttribute("nextButton", "true");
  
      return true
    })
  
    await page.click('[nextButton="true"]');
  
    await page.waitForSelector('[autocomplete="current-password"]');
  
    await page.type('[autocomplete="current-password"]', session.user.password);
  
    await page.evaluate(() => {
      [...document.getElementsByTagName("div")]
        .filter(div => div.getAttribute("role") === "button")
        .find(div => [...div.children].find(element => element.textContent === "Log in"))
        ?.setAttribute("loginButton", "true");
  
      return true
    })
    
    await page.click('[loginButton="true"]');
  
    await page.waitForSelector('article');
  
    return;
  }

  private async getPage(session: Session) {
    const { browser } = session;

    const pagesArr = await browser.pages();

    if (!pagesArr.length) {
      return browser.newPage();
    }

    return pagesArr[0];
  }


  private async goTo(pageName: Page) {
    const session = this.getSession();

    const page = await this.getPage(session);

    const url = getPageUrl(pageName, session.user.username);

    return page.goto(url);
  }

  

}

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const crawler = new TwitterCrawler({ browser, user: { username: env.TWITTER_USERNAME, password: env.TWITTER_PASSWORD } });

  await crawler.login();

}

main();

