class PageTitleService {
  setTitle(title: string) {
    window.document.title = title;
  }
}

export const pageTitleService = new PageTitleService();
