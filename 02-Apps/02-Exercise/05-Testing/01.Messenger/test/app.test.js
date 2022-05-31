let { expect } = require('chai');
let { chromium } = require('playwright-chromium');

let page, browser;

describe('', async function() {
    this.timeout(5000);
    before(async () => { browser = await chromium.launch() });
    after(async () => { await browser.close() });
    beforeEach(async () => { 
        page = await browser.newPage(); 
        await page.goto('http://127.0.0.1:5500/02-Exercise/05-Testing/01.Messenger/index.html');
    })
        
    afterEach(async () => {
        await page.close();
    })

    it('should load all messages', async () => {
        let textarea = page.querySelector('#messages')
        let val = await textarea.getAttribute("value");
        console.log(textarea);
        let response = await page.waitForResponse('http://localhost:3030/jsonstore/messenger');
        await page.click('#refresh');
        let result = await response.json();

        expect(textarea).to.contain(result);
    })
})
