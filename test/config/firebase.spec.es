import { expect } from 'chai'
import config from '../../src/config'

describe('config.firebase', function() {
  it('exists', function() {
    expect(config).to.have.property('firebase')
  })

  it('is an object', function() {
    expect(config.firebase).to.be.an('object')
  })

  it('has minimal required configuration', function() {
    expect(config.firebase).to.have.all.keys([
      'apiKey',
      'databaseURL'
    ])
  })
})
