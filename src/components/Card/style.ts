import styled from 'styled-components';
interface PriceVariationChipProps {
  polarity: number;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: #fff;
  padding: 24px 20px;
  min-width: 200px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.img`
  height: 28px;
  width: 28px;
`;

export const Name = styled.span.attrs({
  'data-testid': 'name_coin_test_id',
})`
  font-family: "gilroymedium";
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography.size.sm};
  margin-top: 4px;
`;

export const PriceVariationChip = styled.div.attrs({
  'data-testid': 'price_variation_chip_test_id',
})<PriceVariationChipProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  min-width: 48px;
  height: 24px;
  background: ${({ polarity, theme }) => {
    if (polarity === 1) return '#edeff5';
    if (polarity === 2) return theme.colors.bg.negative[50];
    if (polarity === 3) return theme.colors.bg.positive[50];
  }};
  border-radius: 12px;
`;

export const PriceVariation = styled.div.attrs({
  'data-testid': 'price_variation_test_id',
})`
  font-family: "gilroysemi_bold";
  font-size: ${({ theme }) => theme.typography.size.xxs};
  color: ${({ theme }) => theme.colors.content.positive[800]};
`;

export const WrapperPrice = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const Coin = styled.span`
  color: rgb(183, 184, 190);
  font-size: ${({ theme }) => theme.typography.size.md};
  margin-right: 0.25rem;
`;

export const Price = styled.span.attrs({
  'data-testid': 'price_test_id',
})`
  font-size: ${({ theme }) => theme.typography.size.md};
`;

export const WrapperVolume = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 4px;
`;

export const SpanVolume = styled.span`
  color: rgb(111, 112, 117);
    font-family: gilroymedium;
    font-weight: 500;
    font-size: 0.65rem;
    line-height: 1;
`;

export const Volume = styled.span.attrs({
  'data-testid': 'volume_test_id',
})`
  font-size: ${({ theme }) => theme.typography.size.xxs};
  font-family: gilroymedium;
  font-weight: 500;
`;
