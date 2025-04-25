import cryptoReducer, { updateAsset } from './cryptoSlice';

describe('cryptoSlice', () => {
  const initialState = {
    assets: [
      {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 50000,
        change1h: 2.5,
        change24h: 5.2,
        change7d: 12.3,
        marketCap: 950000000000,
        volume24h: 25000000000,
        circulatingSupply: 19000000,
        maxSupply: 21000000
      }
    ]
  };

  it('should handle initial state', () => {
    expect(cryptoReducer(undefined, { type: 'unknown' })).toEqual({
      assets: expect.any(Array)
    });
  });

  it('should handle updateAsset', () => {
    const updates = {
      price: 51000,
      change1h: 3.5,
      change24h: 6.2
    };

    const nextState = cryptoReducer(initialState, updateAsset({ id: 1, updates }));

    expect(nextState.assets[0].price).toBe(51000);
    expect(nextState.assets[0].change1h).toBe(3.5);
    expect(nextState.assets[0].change24h).toBe(6.2);
    expect(nextState.assets[0].change7d).toBe(12.3); // Unchanged
  });

  it('should not update non-existent asset', () => {
    const updates = {
      price: 51000
    };

    const nextState = cryptoReducer(initialState, updateAsset({ id: 999, updates }));

    expect(nextState).toEqual(initialState);
  });
}); 