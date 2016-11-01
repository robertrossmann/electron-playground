import spectron from 'spectron'
import { expect } from 'chai'

process.env.NODE_ENV = 'testing'

describe('Application launch', function() {
  this.timeout(30000)

  beforeEach(function() {
    this.app = new spectron.Application({
      path: './node_modules/.bin/electron',
      args: ['.'],
    })

    return this.app.start()
  })

  afterEach(function() {
    return this.app && this.app.isRunning()
      ? this.app.stop()
      : null
  })


  it('shows the main window', async function() {
    await this.app.client.waitUntilWindowLoaded()

    const window = this.app.browserWindow

    expect(await window.isFocused()).to.equal(true)
    expect(await window.isVisible()).to.equal(true)
  })
})
