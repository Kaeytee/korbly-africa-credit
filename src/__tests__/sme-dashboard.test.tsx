import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Import jest-dom types for TypeScript support
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import SmeDashboard from '@/pages/SmeDashboard';
import { USER_TYPES } from '@/lib/constants';

// Mock the authentication hook
jest.mock('@/contexts/AuthContext', () => ({
  ...jest.requireActual('@/contexts/AuthContext'),
  useAuth: () => ({
    isAuthenticated: true,
    user: {
      id: '7', 
      email: 'demo.sme@korbly.com',
      name: 'John Mensah',
      role: USER_TYPES.SME,
      organization: 'TechGrow Ghana'
    },
  }),
}));

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SME Dashboard Integration', () => {
  beforeEach(() => {
    // Setup a DOM element as a render target
    render(
      <BrowserRouter>
        <SmeDashboard />
      </BrowserRouter>
    );
  });

  it('renders the SME dashboard with the Overview component by default', async () => {
    // Check that the Overview component is rendered by default
    expect(screen.getByText('Raise Capital & Build Trust')).toBeInTheDocument();
    expect(screen.getByText('Create New Pitch')).toBeInTheDocument();
    expect(screen.getByText('Upload Documents')).toBeInTheDocument();
  });

  it('switches to Submit Pitch tab when clicked', async () => {
    // Click on the Submit Pitch tab
    fireEvent.click(screen.getByText('Submit Pitch'));
    
    // Check that the Submit Pitch component is rendered
    await waitFor(() => {
      expect(screen.getByText(/Create Your Investment Pitch/i)).toBeInTheDocument();
    });
  });

  it('switches to Funding Progress tab when clicked', async () => {
    // Click on the Funding Progress tab
    fireEvent.click(screen.getByText('Funding Progress'));
    
    // Check that the Funding Progress component is rendered
    await waitFor(() => {
      expect(screen.getByText(/Funding Goals & Progress/i)).toBeInTheDocument();
    });
  });

  it('switches to Investor Engagement tab when clicked', async () => {
    // Click on the Investor Engagement tab
    fireEvent.click(screen.getByText('Investor Engagement'));
    
    // Check that the Investor Engagement component is rendered
    await waitFor(() => {
      expect(screen.getByText(/Investor Interest/i)).toBeInTheDocument();
    });
  });

  it('switches to Due Diligence tab when clicked', async () => {
    // Click on the Due Diligence Vault tab
    fireEvent.click(screen.getByText('Due Diligence Vault'));
    
    // Check that the Due Diligence component is rendered
    await waitFor(() => {
      expect(screen.getByText(/Document Management/i)).toBeInTheDocument();
    });
  });

  it('switches to Support tab when clicked', async () => {
    // Click on the Support & Help tab
    fireEvent.click(screen.getByText('Support & Help'));
    
    // Check that the Support component is rendered
    await waitFor(() => {
      expect(screen.getByText(/Help Center/i)).toBeInTheDocument();
    });
  });

  it('navigates from Overview to Submit Pitch when Create New Pitch is clicked', async () => {
    // First make sure we're on the Overview tab
    fireEvent.click(screen.getByText('Overview'));
    
    // Find and click the Create New Pitch button
    const createPitchButton = screen.getByText('Create New Pitch');
    fireEvent.click(createPitchButton);
    
    // Check that we're now on the Submit Pitch tab
    await waitFor(() => {
      expect(screen.getByText(/Create Your Investment Pitch/i)).toBeInTheDocument();
    });
  });

  it('navigates from Overview to Due Diligence when Upload Documents is clicked', async () => {
    // First make sure we're on the Overview tab
    fireEvent.click(screen.getByText('Overview'));
    
    // Find and click the Upload Documents button
    const uploadDocumentsButton = screen.getByText('Upload Documents');
    fireEvent.click(uploadDocumentsButton);
    
    // Check that we're now on the Due Diligence tab
    await waitFor(() => {
      expect(screen.getByText(/Document Management/i)).toBeInTheDocument();
    });
  });
});
