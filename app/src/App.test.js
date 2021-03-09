import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });

  test('App', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const div = getByText('U.S. DHHS');
    expect(div).toBeTruthy();
  });
});
