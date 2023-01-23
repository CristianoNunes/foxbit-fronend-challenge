import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../../utils/tests/helpers';
import { theme } from '../../../styles/theme';

import Card from '../index';

describe('Card', () => {
  it('should render the component with data positive', () => {
    const MockCoinPostive = {
      InstrumentId: 1,
      Product1Symbol: 'BTC',
      LastTradedPx: 18258.5844,
      Rolling24HrVolume: 9.14,
      Rolling24HrPxChange: 5,
    };

    renderWithTheme(<Card coin={MockCoinPostive} />);

    const nameCoin = screen.queryByTestId('name_coin_test_id');
    expect(nameCoin.innerHTML).toEqual('BTC');

    const priceVariationChip = screen.queryByTestId(
      'price_variation_chip_test_id',
    );
    expect(priceVariationChip).toHaveStyle({
      background: theme.colors.bg.positive[50],
    });
    expect(screen.getByText('5,00%')).toBeInTheDocument();

    const price = screen.queryByTestId('price_test_id');
    expect(price.innerHTML).toEqual('18.258,5844');

    const volume = screen.queryByTestId('volume_test_id');
    expect(volume.innerHTML).toEqual('9.14 BTC');
  });

  it('should render the component with data negative', () => {
    const MockCoinNegative = {
      InstrumentId: 1,
      Product1Symbol: 'BTC',
      LastTradedPx: 18258.5844,
      Rolling24HrVolume: 9.14,
      Rolling24HrPxChange: -3,
    };

    renderWithTheme(<Card coin={MockCoinNegative} />);

    const nameCoin = screen.queryByTestId('name_coin_test_id');
    expect(nameCoin.innerHTML).toEqual('BTC');

    const priceVariationChip = screen.queryByTestId(
      'price_variation_chip_test_id',
    );
    expect(priceVariationChip).toHaveStyle({
      background: theme.colors.bg.negative[50],
    });
    expect(screen.getByText('3,00%')).toBeInTheDocument();

    const price = screen.queryByTestId('price_test_id');
    expect(price.innerHTML).toEqual('18.258,5844');

    const volume = screen.queryByTestId('volume_test_id');
    expect(volume.innerHTML).toEqual('9.14 BTC');
  });

  it('should render the component less data', () => {
    const MockLess = {
      InstrumentId: 1,
      Product1Symbol: undefined,
      LastTradedPx: undefined,
      Rolling24HrVolume: undefined,
      Rolling24HrPxChange: undefined,
    };

    renderWithTheme(<Card coin={MockLess} />);

    const nameCoin = screen.queryByTestId('name_coin_test_id');
    expect(nameCoin.innerHTML).toEqual('Loading...');

    const priceVariationChip = screen.queryByTestId(
      'price_variation_chip_test_id',
    );
    expect(priceVariationChip).toHaveStyle({
      background: '#edeff5',
    });
    const priceVariation = screen.queryByTestId('price_variation_test_id');
    expect(priceVariation.innerHTML).toEqual('--%');

    const price = screen.queryByTestId('price_test_id');
    expect(price.innerHTML).toEqual('--');

    const volume = screen.queryByTestId('volume_test_id');
    expect(volume.innerHTML).toEqual('-- --');
  });
});
