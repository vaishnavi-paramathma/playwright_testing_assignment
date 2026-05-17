import path from 'path';
import { test, expect } from '@playwright/test';
import { FileIoPage } from '../pages/file-io.page';

const TEST_DATA = path.join(__dirname, '../test-data');

test('upload, add file, share link, open in new tab', async ({ page, context }) => {
  const fileIo = new FileIoPage(page);

  await fileIo.open();
  await fileIo.uploadFiles([
    path.join(TEST_DATA, 'image1.jpeg'),
    path.join(TEST_DATA, 'image2.jpeg'),
  ]);
  await fileIo.waitForUploadComplete();

  await fileIo.addFileViaMenu(path.join(TEST_DATA, 'image3.jpeg'));

  const shareLink = await fileIo.shareAndCopyLink();
  expect(shareLink).toContain('limewire.com/d/');

  const shareTab = await fileIo.openShareLinkInNewTab(context, shareLink);
  await expect(shareTab.locator('body')).not.toBeEmpty();

  await fileIo.bringToFront();
  await fileIo.closeShareModal();
});
