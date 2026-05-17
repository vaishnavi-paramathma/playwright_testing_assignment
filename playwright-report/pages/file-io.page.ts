import { BrowserContext, expect, Page } from '@playwright/test';
import { FileIoLocators } from '../locators/file-io.locators';

const FILE_IO_URL = 'https://www.file.io/';

export class FileIoPage {
  private readonly locators: FileIoLocators;

  constructor(readonly page: Page) {
    this.locators = new FileIoLocators(page);
  }

  async open(): Promise<void> {
    await this.page.goto(FILE_IO_URL);
    await expect(this.locators.uploadFilesLabel).toBeVisible();
  }

  async uploadFiles(filePaths: string[]): Promise<void> {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.locators.uploadFilesLabel.click(),
    ]);
    await fileChooser.setFiles(filePaths);
  }

  // async waitForLimeWire(): Promise<void> {
  //   await this.page.waitForURL(/limewire\.com/, { timeout: 180_000 });
  //   await expect(this.locators.shareButton).toBeVisible({ timeout: 120_000 });
  // }

  async waitForUploadComplete(): Promise<void> {
    await expect(this.locators.shareButton).toBeVisible({
      timeout: 180_000,
    });
  }

  async openOverflowMenu(): Promise<void> {
    await this.locators.overflowMenuButton().click();
    await expect(this.locators.addFilesMenuItem).toBeVisible();
  }

  async addFileViaMenu(filePath: string): Promise<void> {
    await this.openOverflowMenu();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.locators.addFilesMenuItem.click(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  async shareAndCopyLink(): Promise<string> {
    await this.locators.shareButton.click();
    await expect(this.locators.shareLinkInput).toBeVisible();
    const link = await this.locators.shareLinkInput.inputValue();
    await this.locators.copyLinkButton.click();
    return link;
  }

  async openShareLinkInNewTab(context: BrowserContext, link: string): Promise<Page> {
    const newPage = await context.newPage();
    await newPage.goto(link);
    await expect(newPage).toHaveURL(/limewire\.com\/d\//);
    return newPage;
  }

  async closeShareModal(): Promise<void> {
    await this.locators.closeModalButton.click();
    await expect(this.locators.closeModalButton).toBeHidden();
  }

  async bringToFront(): Promise<void> {
    await this.page.bringToFront();
  }
}
