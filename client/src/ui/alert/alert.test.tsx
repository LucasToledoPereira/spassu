import React from 'react';
import { fireEvent, screen, render, cleanup } from '@testing-library/react';
import { alert } from './alert';

describe('UIAlert Test Suitecase', () => {
  let confirm: any = undefined;
  const alertSubscriber = (confr: any) => {
    confirm = confr;
  };

  afterEach(() => {
    //Only necessary to remove the alert from body, the cleanup function only works with components rendered by render function
    const alert = screen.queryByTestId('ui-alert');
    alert && fireEvent.click(alert);
    cleanup();
  });

  beforeEach(() => {
    confirm = undefined;

    render(
      <button
        onClick={() => {
          alert({
            title: 'Title of my alert',
            confirmButtonText: 'Confirm Text',
            cancelButtonText: 'Cancel Text',
          }).subscribe(alertSubscriber);
        }}
      >
        Open Alert
      </button>
    );
  });
  it('Expected alert to be present after click', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByTestId('ui-alert')).not.toBeNull();
  });

  it('Expect alert title to be "Title of my alert"', () => {
    fireEvent.click(screen.getByRole('button'));
    const title = screen.getByTestId('ui-alert-title');
    expect(title.textContent).toBe('Title of my alert');
  });

  it('Expect alert subscribe to be called with true value', () => {
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByTestId('ui-alert-confirm-button'));
    expect(confirm).toBeTruthy();
  });

  it('Expect alert subscribe to be called with false value', () => {
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByTestId('ui-alert-cancel-button'));
    expect(confirm).toBeFalsy();
  });

  it('Expect alert to be close on click at overlay', () => {
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByTestId('ui-alert'));
    expect(screen.queryByTestId('ui-alert')).toBeNull();
  });

  it('Expect alert confirmation button text to be "Cancel Tex"', () => {
    fireEvent.click(screen.getByRole('button'));
    const btn = screen.getByTestId('ui-alert-cancel-button');
    expect(btn.textContent).toBe('Cancel Text');
  });

  it('Expect alert confirmation button text to be "Confirm Tex"', () => {
    fireEvent.click(screen.getByRole('button'));
    const btn = screen.getByTestId('ui-alert-confirm-button');
    expect(btn.textContent).toBe('Confirm Text');
  });
});
