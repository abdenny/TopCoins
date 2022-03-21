//  as const usage allows typescript to treat values as static strings
export const topCryptoAssets = () => '/assets' as const;
export const oneCryptoAsset = (coinId: string) => `/assets/${coinId}` as const;
