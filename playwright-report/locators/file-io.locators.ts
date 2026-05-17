import { Locator, Page } from '@playwright/test';

export class FileIoLocators {
  readonly uploadFilesLabel: Locator;
  readonly fileInput: Locator;
  readonly shareButton: Locator;
  readonly addFilesMenuItem: Locator;
  readonly copyLinkButton: Locator;
  readonly shareLinkInput: Locator;
  readonly closeModalButton: Locator;

  constructor(private readonly page: Page) {
    this.uploadFilesLabel = page.getByText('Upload Files', { exact: true });
    this.fileInput = page.getByLabel('Upload Files');
    this.shareButton = page.getByRole('button', { name: 'Share' });
    this.addFilesMenuItem = page.getByText('Add Files', { exact: true });
    this.copyLinkButton = page.getByRole('button', { name: 'Copy Link' });
    this.shareLinkInput = page.locator('input[value*="limewire.com/d/"]');
    this.closeModalButton = page.getByRole('button', { name: 'Close Modal' });
  }

  overflowMenuButton(): Locator {
    return this.shareButton.locator('..').getByRole('button').last();
  }
}
