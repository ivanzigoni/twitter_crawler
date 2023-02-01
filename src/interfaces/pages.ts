export type Page = "login" | "home" | "profile" 

export function getPageUrl(pageName: Page, username?: string) {

  const urlMap = {
    "login": "https://twitter.com/i/flow/login",
    "home": "https://twitter.com/home",
    "profile": `https://twitter.com/${username}`
  }

  return urlMap[pageName]; 
}
