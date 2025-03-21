import assert from 'assert'
import {Builder,Browser,By,until,Key,Select} from 'selenium-webdriver'

describe('Core/Modal.vue', function() {
  let driver = new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions()
    .build()

  this.timeout(0)

  before(async function() { await driver.get('localhost:5173/warehouses') })

  after(async function() { await driver.quit() })

  it('should submit user data when button "Ok" clicked', async function() {
    try {
      //todo-refactor
      await driver.findElement(By.id('addModal')).click()

      await driver.findElement(By.tagName('input')).sendKeys('selenium')

      await new Select(driver.findElement(By.tagName('select')))
        .selectByIndex(1)

      await driver.findElement(By.id('checkbox')).click()

      await driver.findElement(By.id('ok')).click()

      assert.ok(
        await driver.wait(
          until.elementIsNotVisible(driver.findElement(By.id('default-modal'))),
          4000
        )
      )
    } catch (e) {
      assert.fail(e)
    }
  })

  it.skip('should open when modal add button clicked', async function() {
    try {
      await driver.findElement(By.id('addModal')).click()

      assert.ok(
        await driver.wait(
          until.elementIsVisible(driver.findElement(By.id('default-modal'))),
          2000
        )
      )
    } catch (e) {
      assert.fail(e)
    }
  })
  it.skip('should close when close button "x" clicked', async function() {
    try {
      await driver.findElement(By.id('cancel')).click()

      assert.ok(
        await driver.wait(
          until.elementIsNotVisible(driver.findElement(By.id('default-modal'))),
          2000
        )
      )
    } catch (e) {
      assert.fail(e)
    }
  })
  it.skip('should close when close button "close" clicked', async function() {
    try {
      await driver.findElement(By.id('addModal')).click()
      await driver.findElement(By.id('close')).click()

      assert.ok(
        await driver.wait(
          until.elementIsNotVisible(driver.findElement(By.id('default-modal'))),
          2000
        )
      )
    } catch (e) {
      assert.fail(e)
    }
  })
})
