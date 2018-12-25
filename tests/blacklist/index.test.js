const { Blacklist, app, expect, factory, jwt } = require('../utils/helper');

describe ('Blacklist', () => {
  beforeEach(async () => await Blacklist.deleteMany())

  it ('creates a new blacklisted token', done => {
    const token = factory.create('blacklist');

    token
      .then(t => {
        expect(t).not.to.eq(undefined)
        done()
      })
  })

  it ('is invalid without a token', done => {
    const token = factory.build('blacklist', { token: null });

    token.
      then(t => t.save())
      .catch(err => {
        expect(err).to.exist
        done()
      })
  })

  it ('requires a valid token', done => {
    const token = factory.create('blacklist', { token: 'test' });

    token.then(t => t.save())
      .catch(err => {
        expect(err).to.exist
        done()
      })
  })
})
