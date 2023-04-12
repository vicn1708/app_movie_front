import { BrowserService } from "../services/browser/browser.service";

export const BrowserController = {
  indexPage: BrowserService.indexPage,
  browserPage: BrowserService.browserPage,
  favoritePage: BrowserService.favoritePage,
  profilePage: BrowserService.profilePage,
};
