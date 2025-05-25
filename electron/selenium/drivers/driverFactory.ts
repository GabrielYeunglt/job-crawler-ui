import path from 'path';
import { Builder, WebDriver } from 'selenium-webdriver';
import chrome, { Options as ChromeOptions } from 'selenium-webdriver/chrome';

type Browser = 'chrome' | 'firefox';

export class DriverFactory {
    createWebDriver(browser: Browser = 'chrome'): WebDriver {
        const userDataDir = path.resolve(__dirname, '../selenium_profile');
        const builder = new Builder().forBrowser(browser);

        if (browser === 'chrome') {
            const options = new chrome.Options();
            options.addArguments("--disable-blink-features=AutomationControlled");
            options.addArguments("--remote-allow-origins=*");
            options.addArguments(`--user-data-dir=${userDataDir}`);
            options.excludeSwitches('enable-automation');
            options.setUserPreferences({ useAutomationExtension: false });

            const service = new chrome.ServiceBuilder()
                .enableVerboseLogging();

            builder.setChromeService(service);
            builder.setChromeOptions(options);
        }

        try {
            console.log('[DriverFactory] Creating WebDriver...');
            return builder.build();
        } catch (err) {
            console.error('[DriverFactory] WebDriver build failed:', err);
            throw err;
        }
    }
}

