import type { CryptoAssets, Asset, SortObj, HeaderKey } from 'types';

import classNames from 'classnames';
import { toUsdFormat, percentFormat } from 'util/formatters';

import Table from 'components/Table';
import Modal from 'components/Modal';
import Loading from 'components/Loading';
import SortButton from 'components/SortButton';

interface Props {
  topCoins?: CryptoAssets['data'];
  lastCheckedAt?: CryptoAssets['timestamp'];
  isTopCoinsLoading: boolean;
  coinDetail?: Asset;
  isCoinDetailLoading: boolean;
  handleFilterText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentSort: SortObj;
  sortTopCoinsByColumn: (sortObj: SortObj & { sortType: 'alpha' | 'numeric' }) => void;
  isViewingDetailModal: boolean;
  closeDetailModal: () => void;
  handleConversionText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canSubmitConversion: boolean;
  submitConversion: (e: React.FormEvent<HTMLFormElement>) => void;
  convertedValue: string;
}

const tableHeaderCols = [
  { display: 'Rank', key: 'rank' },
  { display: 'Name', key: 'name' },
  { display: 'Symbol', key: 'symbol' },
  { display: 'Price', key: 'priceUsd' },
  { display: 'Change (24h)', key: 'changePercent24hr' },
  { display: 'Market Cap', key: 'marketCapUsd' },
  { display: 'Volume (24h)', key: 'volumeUsd24hr' },
  { display: '', key: 'detail' },
];

const TopCoinsView = ({
  topCoins,
  lastCheckedAt,
  isTopCoinsLoading,
  coinDetail,
  isCoinDetailLoading,
  handleFilterText,
  currentSort,
  sortTopCoinsByColumn,
  isViewingDetailModal,
  closeDetailModal,
  handleConversionText,
  canSubmitConversion,
  submitConversion,
  convertedValue,
}: Props): JSX.Element => {
  return (
    <>
      <main className="flex flex-col">
        <section
          className={classNames(
            'h-screen items-center justify-center',
            `${isTopCoinsLoading ? 'flex' : 'hidden'}`
          )}
        >
          <Loading />
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
                  headerCells={(): Array<JSX.Element> => {
                    return tableHeaderCols.map((headerCell, index) => (
                      <th
                        key={`${index}-${headerCell}`}
                        className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                      >
                        {headerCell.display && (
                          <div className="flex">
                            {headerCell.display}
                            <div className="flex text-gray-700">
                              <SortButton
                                order="asc"
                                isSelected={
                                  currentSort.key === headerCell.key && currentSort.order === 'asc'
                                }
                                onClick={() =>
                                  sortTopCoinsByColumn({
                                    key: headerCell.key as HeaderKey,
                                    order: 'asc',
                                    sortType:
                                      headerCell.key === 'name' || headerCell.key === 'symbol'
                                        ? 'alpha'
                                        : 'numeric',
                                  })
                                }
                              />
                              <SortButton
                                order="desc"
                                isSelected={
                                  currentSort.key === headerCell.key && currentSort.order === 'desc'
                                }
                                onClick={() =>
                                  sortTopCoinsByColumn({
                                    key: headerCell.key as HeaderKey,
                                    order: 'desc',
                                    sortType:
                                      headerCell.key === 'name' || headerCell.key === 'symbol'
                                        ? 'alpha'
                                        : 'numeric',
                                  })
                                }
                              />
                            </div>
                          </div>
                        )}
                      </th>
                    ));
                  }}
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
                      marketCapUsd={toUsdFormat(asset.marketCapUsd)}
                      volumeUsd24Hr={toUsdFormat(asset.volumeUsd24Hr)}
                      priceUsd={toUsdFormat(asset.priceUsd)}
                      changePercent24Hr={percentFormat(asset.changePercent24Hr)}
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
              <section className="flex flex-col gap-4 justify-center px-6 py-4">
                {!isCoinDetailLoading && coinDetail && (
                  <>
                    <div className="hidden sm:flex flex-col">
                      <h3 className="text-xl font-semibold">Details:</h3>
                      <ol className="flex flex-col">
                        <li>Rank #{coinDetail.rank}</li>
                        <li>24H %Change: {percentFormat(coinDetail.changePercent24Hr)}</li>
                        <li>24H Volume: {coinDetail.volumeUsd24Hr}</li>
                        <li>24H Volume Weighted Avg: ${toUsdFormat(coinDetail.vwap24Hr)}</li>
                        <li>Market Cap: {coinDetail.marketCapUsd}</li>
                        <li>Supply: {coinDetail.supply}</li>
                        <li>Max Supply: {coinDetail.maxSupply}</li>
                      </ol>
                    </div>
                    <div>
                      Currently 1 {coinDetail.name} = $ {toUsdFormat(coinDetail.priceUsd)}
                    </div>
                    <div>
                      How much is your {coinDetail.symbol} worth? Convert to USD to find out!
                    </div>
                    {convertedValue && (
                      <div>
                        <b>
                          You have ${toUsdFormat(convertedValue)} worth of {coinDetail.symbol}
                        </b>
                      </div>
                    )}
                    <form className="w-full flex flex-col gap-4" onSubmit={submitConversion}>
                      <input
                        type="number"
                        step="any"
                        placeholder={`Enter ${coinDetail.symbol} amount`}
                        className=" text-gray-700 h-12 px-4 rounded-md text-md border-2 focus:outline-blue-500 focus:border-0"
                        onChange={handleConversionText}
                      />
                      <button
                        type="submit"
                        disabled={!canSubmitConversion}
                        className={classNames(
                          'text-white font-bold py-2 px-4 rounded',
                          `${
                            !canSubmitConversion
                              ? 'bg-gray-200 hover:none'
                              : 'bg-blue-500 hover:bg-blue-700 '
                          }`
                        )}
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
