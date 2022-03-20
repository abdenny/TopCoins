import type { CryptoAssets, Asset, Rate } from 'types';

import Table from 'components/Table';
import Header from 'components/Table/header';
import Row from 'components/Table/row';
import Modal from 'components/Modal';

interface Props {
  topCoins?: CryptoAssets['data'];
  lastCheckedAt?: CryptoAssets['timestamp'];
  isTopCoinsLoading: boolean;
  coinDetail?: Asset;
  isCoinDetailLoading: boolean;
  rateDetail?: Rate['data'];
  isRateDetailLoading: boolean;
  handleFilterText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isViewingDetailModal: boolean;
  closeDetailModal: () => void;
}

const TopCoinsView = ({
  topCoins,
  lastCheckedAt,
  isTopCoinsLoading,
  coinDetail,
  isCoinDetailLoading,
  rateDetail,
  isRateDetailLoading,
  handleFilterText,
  isViewingDetailModal,
  closeDetailModal,
}: Props): JSX.Element => {
  // console.log('detail in view', coinDetail);
  return (
    <>
      <main className="flex flex-col ">
        {isTopCoinsLoading ? (
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
              placeholder="Filter by name or symbol"
              onChange={handleFilterText}
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
                        changePercent24Hr={parseFloat(
                          parseFloat(asset.changePercent24Hr).toFixed(4)
                        )}
                      />
                    )) ?? []
                  );
                }}
              />
            </div>
          </>
        )}
      </main>
      <aside>
        <Modal.Container isOpen={isViewingDetailModal} closeModal={closeDetailModal}>
          <Modal.Header>
            <>
              {coinDetail?.name} {coinDetail?.symbol}
            </>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col"> Yee </div>
          </Modal.Body>
        </Modal.Container>
      </aside>
    </>
  );
};
export default TopCoinsView;
