import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import PensionDashboard from '@/pages/institutional/PensionDashboard';
import Syndication from '@/pages/modules/Syndication';
import CreditEngine from '@/pages/modules/CreditEngine';
import Valuation from '@/pages/modules/Valuation';

// Utility to wrap components with AuthProvider and router
const renderWithAuth = (ui: React.ReactElement) =>
  render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );

describe('Logout Functionality', () => {
  it('logs out from PensionDashboard and redirects to login', async () => {
    renderWithAuth(<PensionDashboard />);
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('logs out from Syndication module', async () => {
    renderWithAuth(<Syndication />);
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('logs out from CreditEngine module', async () => {
    renderWithAuth(<CreditEngine />);
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('logs out from Valuation module', async () => {
    renderWithAuth(<Valuation />);
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });
});
