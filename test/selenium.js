import assert from 'assert'
import {Builder,Browser,By,until,Key} from 'selenium-webdriver'

describe.skip('Core/Table.vue', function () {
  let driver = new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(/* ... */)
    .build()

  this.timeout(0)

  before(async function() { await driver.get('localhost:5173/freight_companies') })

  after(async function() { await driver.quit() })

  it('should allow filtering by search', async function() {
    try {
      const search = await driver.findElement(By.id('search'))

      search.sendKeys('verizon', Key.RETURN)

      assert.ok(
        await driver.wait(
          until.elementTextIs(driver.findElement(By.id('row-0-col-1')), 'verizon'),
          4000
        )
      )

      // reset table data
      await search.clear()
      await search.sendKeys(Key.RETURN)
    } catch (e) {
      assert.fail(e)
    }
  })
  it('should allow sorting by column (asc/desc)', async function() {
    try {
      const sortButton = await driver.findElement(By.id('order-name'))

      await sortButton.click()

      assert.ok(
        await driver.wait(
          until.elementTextIs(sortButton, '↑'),
          1000
        )
      )

      // return to default sorting
      await sortButton.click()
      await sortButton.click()
    } catch (e) {
      assert.fail(e)
    }
  })
  it('should go to next page on numbered page button click (pagination)', async function() {
    try {
      await driver.findElement(By.id('page-2')).click()

      assert.ok(
        await driver.wait(
          until.elementTextIs(driver.findElement(By.id('row-0-col-0')), '11'),
          4000
        )
      )
    } catch (e) {
      assert.fail(e)
    }
  })
  it('should go to last page when ">>" button is clicked (pagination)', async function() {
    try {
      await driver.findElement(By.id('page-last')).click()

      assert.ok(
        await driver.wait(
          until.elementTextIs(driver.findElement(By.id('row-0-col-0')), '45'),
          4000
        )
      )
    } catch (e) {
      assert.fail(e)
    }
  })
  it('should go to first page when "<<" button is clicked (pagination)', async function() {
    try {
      await driver.findElement(By.id('page-first')).click()

      assert.ok(
        await driver.wait(
          until.elementTextIs(driver.findElement(By.id('row-0-col-0')), '1'),
          4000
        )
      )
    } catch (e) {
      assert.fail(e)
    }
  })
})
