const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Add meg a felhasználóneved: ', (username) => {
    rl.question('Add meg a jelszavad: ', (password) => {
        (async () => {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            
            await page.goto('https://discord.com/login');

            await page.type('input[name="email"]', username, { delay: 100 });
            await page.type('input[name="password"]', password, { delay: 100 });
            
            await page.click('button[type="submit"]');
            
            await page.waitForNavigation();

            // Add meg a szerver ID-jét és a csatorna ID-jét

            await page.goto('https://discord.com/channels/server_id/csatorna_id');
            
            await page.waitForSelector('div[role="textbox"]', { visible: true });

            // A /economy work helyére jöhet majd a parancs amit szeretnél, futtatni.
            await page.type('div[role="textbox"]', '/economy work', { delay: 100 });
            
            await page.keyboard.press('Tab');

            await page.keyboard.press('Enter');

            setTimeout(() => {}, 11000);

            // Ezt is szerkesztheted 30 percenként futtatja a parancsot.
            setInterval(() => {
                page.type('div[role="textbox"]', '/economy work', { delay: 100 });
                page.keyboard.press('Tab');
                page.keyboard.press('Enter');
            }, 30 * 60 * 1000);

            rl.close();
        })();
    });
});
