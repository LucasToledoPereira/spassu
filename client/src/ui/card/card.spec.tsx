import { cleanup, render, screen } from '@testing-library/react';
import { Card } from './card';

describe('Card Test Suitecase', () => {
  afterEach(cleanup);
  beforeEach(() =>
    render(
      <Card>
        <div>Im inside a card</div>
      </Card>
    )
  );

  it('Expect card component to be present with a div content', async () => {
    const card = await screen.queryByTestId('ui-card');
    expect(card).not.toBeNull();
    expect(card?.firstElementChild?.textContent).toBe('Im inside a card');
  });
});
