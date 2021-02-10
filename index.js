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
            await page.screenshot({path: 'screenshots/' + i + '.png', fullPage: true})
        } catch (e) {
            clearInterval(interval)
        }
    }, ms);
}
