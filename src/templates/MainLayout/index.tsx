import { useEffect, useState } from 'react';
import Card from '../../components/Card';

import * as S from './styles';

export interface CoinType {
  InstrumentId?: number;
  Product1Symbol?: string;
  LastTradedPx?: number;
  Rolling24HrVolume?: number;
  Rolling24HrPxChange?: number;
}

export default function MainLayout() {
  const [coins, setCoins] = useState<CoinType[]>([]);

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL);

    ws.onopen = () => {
      console.log('connected');

      // GET INSTRUMENTS
      const payloadInstruments = {
        m: 0,
        i: 2,
        n: 'GetInstruments',
        o: JSON.stringify({}),
      };

      ws.send(JSON.stringify(payloadInstruments));
    };

    ws.onclose = () => {
      console.log('disconnected');
    };

    ws.onmessage = (response) => {
      const { n, o } = JSON.parse(response.data);
      const channel = n; // GetInstruments | SubscribeLevel1 | Level1UpdateEvent
      if (o === undefined) {
        return;
      }
      const data = JSON.parse(o);

      const onGetInstruments = (coinData: CoinType[]) => {
        setCoins(coinData);
        coinData.forEach((coin: CoinType) => {
          const payload = {
            m: 0,
            i: 2,
            n: 'SubscribeLevel1',
            o: JSON.stringify({ InstrumentId: coin.InstrumentId }),
          };

          ws.send(JSON.stringify(payload));
        });
      };

      // RESPONSE WITH ALL CRYPTOS
      if (channel === 'GetInstruments') {
        onGetInstruments(data);
      }
      // FIRST RESPONSE AND UPDATES TO SUBSCRIBELEVEL1
      if (['SubscribeLevel1', 'Level1UpdateEvent'].includes(channel)) {
        setCoins((prevState) => {
          return prevState.map((coin) => {
            if (data.InstrumentId !== coin.InstrumentId) return coin;
            if (
              data.LastTradedPx === coin.LastTradedPx &&
              data.Rolling24HrVolume === coin.Rolling24HrVolume &&
              data.Rolling24HrPxChange === coin.Rolling24HrPxChange
            ) {
              return coin;
            }
            return {
              ...coin,
              LastTradedPx: data.LastTradedPx,
              Rolling24HrVolume: data.Rolling24HrVolume,
              Rolling24HrPxChange: data.Rolling24HrPxChange,
            };
          });
        });
      }
    };
  }, []);

  return (
    <S.Wrapper>
      <S.Title>Foxbit - Frontend Challenge</S.Title>
      <S.Content>
        {coins.map((coin: CoinType) => {
          return (
            <Card
              key={coin.InstrumentId}
              coin={coin}
              datatest-id={`card_test_id_${coin.InstrumentId}`}
            />
          );
        })}
      </S.Content>
    </S.Wrapper>
  );
}
