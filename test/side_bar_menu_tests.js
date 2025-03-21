import assert from 'assert'
import {Builder,Browser,By,until} from 'selenium-webdriver'

describe.skip('sidebar menu', function () {
  let driver = new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions()
    .build()

  this.timeout(0)

  it('should allow site navigation', async function() {
    try {
      await driver.get('localhost:5173/')

      const links = await driver.findElements(By.tagName('a'))

      links[2].click()

      await driver.wait(until.urlIs('http://localhost:5173/freight_companies'), 4000)
    } catch (e) {
      console.error(e)
    } finally {
      await driver.quit()
    }
  })
})
