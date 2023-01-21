import * as S from './style';

export default function CardLoading() {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Icon src={'./default-currency.svg'} />
        <S.PriceVariationChip>
          <S.PriceVariation>--%</S.PriceVariation>
        </S.PriceVariationChip>
      </S.Header>
      <S.Name>Loading...</S.Name>
      <S.WrapperPrice>
        <S.Coin>R$</S.Coin>
        <S.Price>--</S.Price>
      </S.WrapperPrice>
      <S.WrapperVolume>
        <S.SpanVolume>Volume (24h):</S.SpanVolume>
        <S.Volume>-- --</S.Volume>
      </S.WrapperVolume>
    </S.Wrapper>
  );
}
