import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../../utils/tests/helpers';

import MainLayout from '../index';

describe('MainLayout', () => {
  it('should render the title component MainLayout', () => {
    renderWithTheme(<MainLayout />);
    expect(screen.getByText('Foxbit - Frontend Challenge')).toBeInTheDocument();
  });

  it('should check if the websocket opened the connection', () => {
    renderWithTheme(<MainLayout />);
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL);

    ws.onopen = () => {
      console.log('connected');
      expect(console).toHaveBeenCalledWith('connected');
      expect(ws.readyState).toBe(WebSocket.OPEN);
    };
  });

  it('should check if the websocket closed the connection', () => {
    renderWithTheme(<MainLayout />);
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL);

    ws.onclose = () => {
      console.log('disconnected');
      expect(console).toHaveBeenCalledWith('disconnected');
      expect(ws.readyState).toBe(WebSocket.CLOSED);
    };
  });
});
