import type { CryptoAssets } from 'types';

import Table from 'components/Table';
import Header from 'components/Table/header';
import Row from 'components/Table/row';

interface Props {
  topAssets?: CryptoAssets['data'];
  lastCheckedAt?: CryptoAssets['timestamp'];
  isLoading: boolean;
}

const TopAssetsView = ({ topAssets, lastCheckedAt, isLoading }: Props): JSX.Element => {
  return (
    <div className="flex flex-col ">
      {isLoading ? (
        <div className="text-center">Loading</div>
      ) : (
        <>
          {lastCheckedAt && <div>Last checked on {new Date(lastCheckedAt).toLocaleString()}</div>}
          <div className="flex min-w-full shadow overflow-x-scroll bg-white md:px-16 px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <Table
              tableHeader={
                <Header
                  headerCells={[
                    'Rank',
                    'Name',
                    'Symbol',
                    'Price',
                    '24H %',
                    'Market Cap',
                    'Volume (24H)',
                    '',
                  ]}
                />
              }
              tableRows={(): Array<JSX.Element> => {
                return (
                  topAssets?.map((asset) => (
                    <Row
                      key={asset.id}
                      rank={asset.rank}
                      symbol={asset.symbol}
                      name={asset.name}
                      marketCapUsd={parseFloat(asset.marketCapUsd)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      volumeUsd24Hr={parseFloat(asset.volumeUsd24Hr)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      priceUsd={parseFloat(asset.priceUsd)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      changePercent24Hr={parseFloat(parseFloat(asset.changePercent24Hr).toFixed(4))}
                    />
                  )) ?? []
                );
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default TopAssetsView;
