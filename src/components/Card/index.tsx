import {
  formatValueFourDecimals,
  formatValueTwoDecimals,
  changePointToComma,
  verifyPolarity,
} from '../../utils';

import up from '../../assets/up-arrow.svg';
import down from '../../assets/down-arrow.svg';

import * as S from './style';
import Image from 'next/image';
import { memo } from 'react';
import { CoinType } from '../../pages';

interface CardProps {
  coin: CoinType;
}

export default memo(function Card({ coin }: CardProps): JSX.Element {
  const polarityMap = {
    1: null,
    2: down,
    3: up,
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
            {polarityMap[verifyPolarity(coin?.Rolling24HrPxChange)] && (
              <Image
                src={polarityMap[verifyPolarity(coin?.Rolling24HrPxChange)]}
                alt="seta direcional"
                width={10}
                height={10}
              />
            )}
            {coin?.Rolling24HrPxChange
              ? changePointToComma(coin?.Rolling24HrPxChange)
              : '--'}
            %
          </S.PriceVariation>
        </S.PriceVariationChip>
      </S.Header>
      <S.Name>{coin?.Product1Symbol}</S.Name>
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
