import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 60000,

  fullyParallel: true,

  // Prevent accidental test.only commits in CI
  forbidOnly: !!process.env.CI,

  retries: 1,

  workers: 2,

  reporter: [
    ['html', { open: 'always' }],
    ['list']
  ],

  use: {
    // Read URL from .env
    baseURL: process.env.BASE_URL,

    actionTimeout: 5000,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on-first-retry',

    // Enable slowMo only for debugging
    // launchOptions: {
    //   slowMo: process.env.DEBUG ? 500 : 0,
    // },

    launchOptions: {
  slowMo: process.env.DEBUG ? 500 : 0,
},
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],

  outputDir: 'test-results/',
});