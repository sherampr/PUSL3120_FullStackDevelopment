import { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const bookingReducer = (state, action) => {
 switch (action.type) {
    case 'SET_CHECKIN_DATE':
      return { ...state, checkInDate: action.payload };
    case 'SET_CHECKOUT_DATE':
      return { ...state, checkOutDate: action.payload };
    default:
      return state;
 }
};

export const useBooking = () => {
 const context = useContext(BookingContext);
 if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
 }
 return context;
};

export const BookingProvider = ({ children }) => {
 const [state, dispatch] = useReducer(bookingReducer, {
    checkInDate: null,
    checkOutDate: null,
 });

 const value = { state, dispatch };

 return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
 );
};