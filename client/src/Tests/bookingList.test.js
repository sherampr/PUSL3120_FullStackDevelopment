import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import BookingList from '../pages/BookingList'; // Adjust the path based on your project structure


// Mocking axios
jest.mock('axios');

// Mocking the bookings data
const mockBookings = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    roomType: 'Standard',
    checkinDate: '2022-01-10',
    checkoutDate: '2022-01-15',
    price: 150,
  },
  // Add more mock bookings as needed
];

describe('BookingList Component', () => {
  beforeEach(() => {
    // Reset mock state before each test
    jest.clearAllMocks();
  });

  test('renders BookingList component with loading state', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // Mock an empty array for bookings

    render(<BookingList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Bookings available')).toBeInTheDocument();
    });
  });

  test('renders BookingList component with bookings data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockBookings }); // Mock bookings data

    render(<BookingList />);

    await waitFor(() => {
      expect(screen.getByText('Bookings available')).toBeInTheDocument();

      mockBookings.forEach((booking) => {
        expect(screen.getByText(`${booking.firstName} ${booking.lastName}`)).toBeInTheDocument();
        expect(screen.getByText(booking.roomType)).toBeInTheDocument();
        expect(screen.getByText(booking.price.toString())).toBeInTheDocument();
        expect(screen.getByText(booking.checkinDate)).toBeInTheDocument();
        expect(screen.getByText(booking.checkoutDate)).toBeInTheDocument();
      });
    });
  });

  test('renders BookingList component with error state', async () => {
    const errorMessage = 'Error fetching bookings. Please try again later.';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<BookingList />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
