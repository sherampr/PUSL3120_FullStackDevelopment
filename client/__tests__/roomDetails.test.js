import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RoomDetails from '../src/pages/RoomDetails';
import { BrowserRouter } from 'react-router-dom';

// Mocks
jest.mock('socket.io-client');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'testId',
  }),
  useNavigate: jest.fn(),
}));

// Helper function to render the component within a Router
const renderRoomDetails = () => {
  render(
    <BrowserRouter>
      <RoomDetails />
    </BrowserRouter>
  );
};

describe('RoomDetails', () => {
  it('renders without crashing', async () => {
    renderRoomDetails();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // More tests go here...
});
