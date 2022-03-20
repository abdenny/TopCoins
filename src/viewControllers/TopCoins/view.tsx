import type { CryptoAssets, Asset } from 'types';

import classNames from 'classnames';

import Table from 'components/Table';
import Modal from 'components/Modal';

interface Props {
  topCoins?: CryptoAssets['data'];
  lastCheckedAt?: CryptoAssets['timestamp'];
  isTopCoinsLoading: boolean;
  coinDetail?: Asset;
  isCoinDetailLoading: boolean;
  handleFilterText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isViewingDetailModal: boolean;
  closeDetailModal: () => void;
  handleConversionText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canSubmitConversion: boolean;
  submitConversion: (e: React.FormEvent<HTMLFormElement>) => void;
  convertedValue: string;
}

const TopCoinsView = ({
  topCoins,
  lastCheckedAt,
  isTopCoinsLoading,
  coinDetail,
  isCoinDetailLoading,
  handleFilterText,
  isViewingDetailModal,
  closeDetailModal,
  handleConversionText,
  canSubmitConversion,
  submitConversion,
  convertedValue,
}: Props): JSX.Element => {
  console.log('detail in view', coinDetail);
  return (
    <>
      <main className="flex flex-col ">
        <section
          className={classNames(
            'flex justify-center',
            `${isCoinDetailLoading ? 'visible' : 'invisible'}`
          )}
        >
          Loading
        </section>
        <section className={`${isTopCoinsLoading ? 'invisible' : 'visible'}`}>
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
            <Table.Frame
              tableHeader={
                <Table.Header
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
                    <Table.Row
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
        </section>
      </main>
      <aside>
        <Modal.Container isOpen={isViewingDetailModal} closeModal={closeDetailModal}>
          <Modal.Header>
            <>
              {coinDetail?.name} {coinDetail?.symbol}
            </>
          </Modal.Header>
          <Modal.Body>
            <div>
              <section className="flex flex-col justify-center">
                {!isCoinDetailLoading && coinDetail && (
                  <>
                    <div>
                      Currently 1 {coinDetail.name} = $ {coinDetail.priceUsd}
                    </div>
                    <div>Convert your asset to USD! How many {coinDetail.symbol} do you have?</div>
                    {convertedValue && (
                      <div>
                        You have ${convertedValue} worth of {coinDetail.symbol}
                      </div>
                    )}
                    <form onSubmit={submitConversion}>
                      <input
                        type="float"
                        placeholder="Filter by name or symbol"
                        onChange={handleConversionText}
                      />
                      <button
                        type="submit"
                        disabled={!canSubmitConversion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Convert
                      </button>
                    </form>
                  </>
                )}
              </section>
            </div>
          </Modal.Body>
        </Modal.Container>
      </aside>
    </>
  );
};
export default TopCoinsView;
