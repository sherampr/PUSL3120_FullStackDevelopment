const request = require('supertest');
const app = require('../index'); // Assuming you have an Express app
const RoomType = require('../models/roomTypeModel');

// Mock the RoomType model
jest.mock('../models/roomTypeModel');

const mockRoomTypes = [
    {
        _id: "657ef4fe7a87688e0578c51e",
        typeName: "Gruze Suite",
        typePrice: null, // Add typePrice if it's part of your model
        amenities: ["Amenity1", "Amenity2", "Amenity3"], // Replace with actual amenities
        typeDescription: "A spacious suite with ocean view",
        roomCapacity: 0,
        typeImages: [
            {
                url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070",
                contentType: "image/jpeg",
                isMain: true,
                _id: "657ef4fe7a87688e0578c51f"
            },
            {
                url: "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?q=80&w=19",
                contentType: "image/jpeg",
                isMain: false,
                _id: "657ef4fe7a87688e0578c520"
            }
        ],
       
    },
    {
        _id: "657fe9073d78af57245f0212",
        typeName: "Trefolo Ultra Luxury Suite",
        typePrice: 89000,
        amenities: ["Amenity1", "Amenity2", "Amenity3"], // Replace with actual amenities
        typeDescription: "A spacious ultra Luxury suite with mountain view",
        roomCapacity: 4,
        typeImages: [
            {
                url: "https://images.unsplash.com/photo-1702411200201-3061d0eea802?q=80&w=19",
                contentType: "image/jpeg",
                isMain: true,
                _id: "657fe9073d78af57245f0213"
            },
            {
                url: "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?q=80&w=19",
                contentType: "image/jpeg",
                isMain: false,
                _id: "657fe9073d78af57245f0214"
            }
        ],
        
    }
];

const mockRoomType = [
    {
        _id: "657fe9073d78af57245f0212",
        typeName: "Trefolo Ultra Luxury Suite",
        typePrice: 89000,
        amenities: ["Amenity1", "Amenity2", "Amenity3"], // Replace with actual amenities
        typeDescription: "A spacious ultra Luxury suite with mountain view",
        roomCapacity: 4,
        typeImages: [
            {
                url: "https://images.unsplash.com/photo-1702411200201-3061d0eea802?q=80&w=19",
                contentType: "image/jpeg",
                isMain: true,
                _id: "657fe9073d78af57245f0213"
            },
            {
                url: "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?q=80&w=19",
                contentType: "image/jpeg",
                isMain: false,
                _id: "657fe9073d78af57245f0214"
            }
        ],
        
    }
];


const expectedRoomTypes = [
    {
        _id: "657ef4fe7a87688e0578c51e",
        typeName: "Gruze Suite",
        typePrice: null, // Add typePrice if it's part of your model
        amenities: ["Amenity1", "Amenity2", "Amenity3"], // Replace with actual amenities
        typeDescription: "A spacious suite with ocean view",
        roomCapacity: 0,
        typeImages: [
            {
                url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070",
                contentType: "image/jpeg",
                isMain: true,
                _id: "657ef4fe7a87688e0578c51f"
            },
            {
                url: "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?q=80&w=19",
                contentType: "image/jpeg",
                isMain: false,
                _id: "657ef4fe7a87688e0578c520"
            }
        ],
       
    },
    {
        _id: "657fe9073d78af57245f0212",
        typeName: "Trefolo Ultra Luxury Suite",
        typePrice: 89000,
        amenities: ["Amenity1", "Amenity2", "Amenity3"], // Replace with actual amenities
        typeDescription: "A spacious ultra Luxury suite with mountain view",
        roomCapacity: 4,
        typeImages: [
            {
                url: "https://images.unsplash.com/photo-1702411200201-3061d0eea802?q=80&w=19",
                contentType: "image/jpeg",
                isMain: true,
                _id: "657fe9073d78af57245f0213"
            },
            {
                url: "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?q=80&w=19",
                contentType: "image/jpeg",
                isMain: false,
                _id: "657fe9073d78af57245f0214"
            }
        ],
        
    }
];

const expectedRoomType= [
    {
        _id: "657fe9073d78af57245f0212",
        typeName: "Trefolo Ultra Luxury Suite",
        typePrice: 89000,
        amenities: ["Amenity1", "Amenity2", "Amenity3"], // Replace with actual amenities
        typeDescription: "A spacious ultra Luxury suite with mountain view",
        roomCapacity: 4,
        typeImages: [
            {
                url: "https://images.unsplash.com/photo-1702411200201-3061d0eea802?q=80&w=19",
                contentType: "image/jpeg",
                isMain: true,
                _id: "657fe9073d78af57245f0213"
            },
            {
                url: "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?q=80&w=19",
                contentType: "image/jpeg",
                isMain: false,
                _id: "657fe9073d78af57245f0214"
            }
        ],
        
    }
];

describe('Room Type API', () => {
    // Test for GET all room types
    describe('GET /roomTypes', () => {
        test('should return all room types', async () => {
            RoomType.find.mockResolvedValue(mockRoomTypes);
            const response = await request(app).get('/api/roomtypes');
expect(response.statusCode).toBe(200);
expect(response.body).toEqual(expectedRoomTypes);
        });

        // Add more tests for error scenarios
    });

    // Test for GET a single room type
    describe('GET /roomTypes/:id', () => {
        test('should return a room type', async () => {
            RoomType.findById.mockResolvedValue(mockRoomType);
            const response = await request(app).get('/api/roomtypes/some-id');
expect(response.statusCode).toBe(200);
expect(response.body).toEqual(expectedRoomType);
        });

        // Add more tests for error scenarios
    });

    // Similar test suites for POST, DELETE, and PUT endpoints
});

afterEach(() => {
    jest.clearAllMocks();
});
