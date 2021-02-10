import fs from 'fs'

/**
 * @param {import('puppeteer').Page} page 
 * @param {number} ms
 * @param {number} width
 * @param {number} height
 */
export default function periodicallyScreenshot(page, ms, width = 1280, height = 720) {
    let i = 0
    const interval = setInterval(async () => {
        i++
        try {
            await page.setViewport({width, height})
            try {
                const html = await page.evaluate(() => document.querySelector('*').outerHTML)
                fs.writeFileSync('html/' + i + '.html', html)
            } catch (e) {
                fs.writeFileSync('html/' + i + '.html', '')
            }
            
            await page.screenshot({path: 'screenshots/' + i + '.png', fullPage: true})
        } catch (e) {
            clearInterval(interval)
        }
    }, ms);
}
