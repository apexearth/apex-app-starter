const {expect} = require('chai')
const state    = require('./state')
const model    = require('./model')

describe('state', function () {
    it('should create a new state with new', function () {
        state.new()
    })

    it('should have default values', function () {
        state.new()
        let profile = state.get('profile')
        expect(profile).to.exist
        expect(model.profile.validate(profile)).to.equal(true)
        expect(state.get('deals')).to.be.an('array')
    })

})