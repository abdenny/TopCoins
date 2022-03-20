import type { CryptoAssets } from 'types';

import Table from 'components/Table';
import Header from 'components/Table/header';
import Row from 'components/Table/row';
interface Props {
  topCoins?: CryptoAssets['data'];
  lastCheckedAt?: CryptoAssets['timestamp'];
  isLoading: boolean;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TopCoinsView = ({
  topCoins,
  lastCheckedAt,
  isLoading,
  handleTextChange,
}: Props): JSX.Element => {
  return (
    <main className="flex flex-col ">
      {isLoading ? (
        <div className="text-center">Loading</div>
      ) : (
        <>
          <div className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
            <h1 className="font-semibold text-lg">
              Crypto Market {lastCheckedAt && <> - {new Date(lastCheckedAt).toLocaleString()}</>}
            </h1>
          </div>
          <input
            type="search"
            name="search"
            placeholder="Search by name or symbol"
            onChange={handleTextChange}
            className="bg-white flex justify-start w-72 text-gray-700 h-12 px-2 mx-10 md:mx-16 my-2 rounded-md text-md border-2 focus:outline-blue-500 focus:border-0"
          />
          <div className="flex min-w-full shadow  bg-white md:px-16 px-8 pt-3 rounded-bl-lg rounded-br-lg">
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
                  topCoins?.map((asset) => (
                    <Row
                      key={asset.id}
                      id={asset.id}
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
    </main>
  );
};
export default TopCoinsView;
