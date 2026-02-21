const { calculateTotalCost } = require('../skillswap-functions');

describe('calculateTotalCost', () => {

  test('returns correct total for rate and hours', () => {
    expect(calculateTotalCost(20, 2)).toBe(40);
  });

  test('handles free sessions (rate 0)', () => {
    expect(calculateTotalCost(0, 3)).toBe(0);
  });

  test('handles decimal hours', () => {
    expect(calculateTotalCost(25, 1.5)).toBe(37.5);
  });

  test('returns 0 if hours are 0', () => {
    expect(calculateTotalCost(20, 0)).toBe(0);
  });

});
module.exports = { };