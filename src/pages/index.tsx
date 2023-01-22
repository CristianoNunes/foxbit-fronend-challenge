import { useEffect, useState } from 'react';
import Card from '../components/Card';
import ListCard from '../components/ListCards';
import Title from '../components/Title';

interface CoinType {
  OMSId?: number;
  InstrumentId?: number;
  LastTradedPx?: number;
  Rolling24HrVolume?: number;
  Rolling24HrPxChange?: number;
}

export default function Home() {
  const [coins, setCoins] = useState<CoinType[]>([]);

  useEffect(() => {
    const ws = new WebSocket('wss://api.foxbit.com.br/');

    ws.addEventListener('open', function open() {
      console.log('connected');

      // GET INSTRUMENTS
      const payloadInstruments = {
        m: 0,
        i: 2,
        n: 'GetInstruments',
        o: JSON.stringify({}),
      };

      ws.send(JSON.stringify(payloadInstruments));
    });

    ws.addEventListener('close', function close() {
      console.log('disconnected');
    });

    ws.addEventListener('message', function message(response) {
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
    });
  }, []);

  return (
    <main>
      <Title>Foxbit - Frontend Challenge</Title>
      <ListCard>
        {coins.map((coin: CoinType) => {
          return <Card key={coin.InstrumentId} coin={coin} />;
        })}
      </ListCard>
    </main>
  );
}
