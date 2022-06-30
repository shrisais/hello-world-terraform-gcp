const folder = require('../src')

describe('Test app is defined', () => {
    it('should be defined', () => {
        expect(folder.app).toBeDefined()
    })
})