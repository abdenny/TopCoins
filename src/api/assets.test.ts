import { oneCryptoAsset, topCryptoAssets } from './assets';

describe('oneCryptoAsset', () => {
  it('should return the correct url', () => {
    expect(oneCryptoAsset('bitcoin')).toBe('/assets/bitcoin');
  });
});

describe('topCryptoAssets', () => {
  it('should return the correct url', () => {
    expect(topCryptoAssets()).toBe('/assets');
  });
});
