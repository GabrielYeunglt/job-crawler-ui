import { app } from 'electron';
import path from 'path';
import { Builder, logging, WebDriver } from 'selenium-webdriver';
import chrome, { Options as ChromeOptions } from 'selenium-webdriver/chrome';

type Browser = 'chrome' | 'firefox';

export class DriverFactory {
    createWebDriver(browser: Browser = 'chrome'): WebDriver {
        const userDataDir = path.join(app.getPath('userData'), 'selenium_profile');
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

            const prefs = new logging.Preferences();
            prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);
            prefs.setLevel(logging.Type.DRIVER, logging.Level.ALL);

            builder.setLoggingPrefs(prefs);

            builder.setChromeService(service);
            builder.setChromeOptions(options);
        }

        try {
            console.log('[DriverFactory] Creating WebDriver...');
            const driver = builder.build();
            console.log('[DriverFactory] WebDriver created.');
            return driver;
        } catch (err) {
            console.error('[DriverFactory] WebDriver build failed:', err);
            throw err;
        }
    }
}

