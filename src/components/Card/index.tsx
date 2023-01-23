import {
  formatValueFourDecimals,
  formatValueTwoDecimals,
  changePointToComma,
  verifyPolarity,
} from '../../utils';

import * as S from './style';
import { memo } from 'react';

import { ArrowDown } from '../Icons/ArrowDown';
import { ArrowUp } from '../Icons/ArrowUp';
import { CoinType } from '../../templates/MainLayout';

interface CardProps {
  coin: CoinType;
}

export default memo(function Card({ coin }: CardProps): JSX.Element {
  const polarityMap = {
    1: null,
    2: <ArrowDown />,
    3: <ArrowUp />,
  };

  const handleImgFallback = () => {
    if (coin.Product1Symbol) {
      return (
        'https://statics.foxbit.com.br/icons/colored/' +
        coin.Product1Symbol.toLowerCase() +
        '.svg'
      );
    }
    return './default-currency.svg';
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.Icon src={handleImgFallback()} />
        <S.PriceVariationChip
          polarity={verifyPolarity(coin?.Rolling24HrPxChange)}
        >
          <S.PriceVariation>
            {polarityMap[verifyPolarity(coin?.Rolling24HrPxChange)] &&
              polarityMap[verifyPolarity(coin?.Rolling24HrPxChange)]}
            {coin?.Rolling24HrPxChange
              ? changePointToComma(coin?.Rolling24HrPxChange)
              : '--'}
            %
          </S.PriceVariation>
        </S.PriceVariationChip>
      </S.Header>
      <S.Name>
        {coin?.Product1Symbol ? coin?.Product1Symbol : 'Loading...'}
      </S.Name>
      <S.WrapperPrice>
        <S.Coin>R$</S.Coin>
        <S.Price>
          {coin?.LastTradedPx
            ? formatValueFourDecimals(coin?.LastTradedPx)
            : '--'}
        </S.Price>
      </S.WrapperPrice>
      <S.WrapperVolume>
        <S.SpanVolume>Volume (24h):</S.SpanVolume>
        <S.Volume>
          {coin?.Rolling24HrVolume
            ? `${formatValueTwoDecimals(coin?.Rolling24HrVolume)} ${
                coin?.Product1Symbol
              }`
            : '-- --'}
        </S.Volume>
      </S.WrapperVolume>
    </S.Wrapper>
  );
});
