import { AppPage } from './app.po';

describe('matchandtrade-web-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate home', () => {
    page.navigateToHome();
  });

});
