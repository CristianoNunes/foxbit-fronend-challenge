import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../../utils/tests/helpers';

import MainLayout from '../index';

describe('MainLayout', () => {
  it('should render the title component MainLayout', () => {
    renderWithTheme(<MainLayout />);

    expect(screen.getByText('Foxbit - Frontend Challenge')).toBeInTheDocument();
  });
});
