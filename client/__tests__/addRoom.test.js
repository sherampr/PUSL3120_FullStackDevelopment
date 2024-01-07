import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Updated import
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import NewRoom from '../src/staff/pages/NewRoom'; // Adjust the import path as necessary

jest.mock('axios');

describe('NewRoom Component', () => {

  it('renders without crashing', () => {
    render(<NewRoom />);
    expect(screen.getByText('Add a Room Type')).toBeInTheDocument();
  });

  it('updates typeName input field', () => {
    render(<NewRoom />);
    const typeNameInput = screen.getByLabelText('Room Type Name');
    fireEvent.change(typeNameInput, { target: { value: 'Deluxe Suite' } });
    expect(typeNameInput.value).toBe('Deluxe Suite');
  });

  // ... other tests
it('submits the form with correct data', async () => {
    render(<NewRoom />);
    const mockResponse = { data: 'some data' };
    axios.post.mockResolvedValueOnce(mockResponse);

    // Fill in the form fields
    await userEvent.type(screen.getByLabelText('Room Type Name'), 'Deluxe Suite', { delay: 1 });
    await  userEvent.type(screen.getByLabelText('Room Type Price'), { delay: 1 });
    await userEvent.type(screen.getByLabelText('Amenities'), 'Pool, Spa, Wi-Fi', { delay: 1 });
    await  userEvent.type(screen.getByLabelText('Room Type Description'), 'A luxurious suite with all amenities.', { delay: 1 });
    await userEvent.type(screen.getByLabelText('Room Capacity'), '4', { delay: 1 });
    await userEvent.type(screen.getByLabelText('Room Type Images'), { delay: 1 });

    // Submit the form
    fireEvent.submit(screen.getByTestId('form')); // Changed line

    // Wait for async actions to complete
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('/api/roomtypes', {
            typeName: 'Deluxe Suite',
            typePrice: '150',
            amenities: ['Pool', 'Spa', 'Wi-Fi'],
            typeDescription: 'A luxurious suite with all amenities.',
            roomCapacity: '4',
            displayInHome: false,
            imageUrls: [{ url: 'image1.jpg', isMain: true }, { url: 'image2.jpg', isMain: false }]
        });
    });
});


  // ... additional tests
});
