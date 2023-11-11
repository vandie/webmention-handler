describe('example',() => {
  it('contains the expected exports', () => {
    const exports = require('./index');
    expect(Object.keys(exports)).toEqual(['WebMentionHandler', 'LocalWebMentionStorage'])
  })
})