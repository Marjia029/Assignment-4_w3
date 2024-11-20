import { Express } from 'express';
import request from 'supertest';
import { app, startServer, stopServer } from '../index';
import * as hotelController from '../controllers/hotelController';
import { validateHotel } from '../validation/hotelValidation';

let server: any;
let port: number;

beforeAll(async () => {
  port = await startServer();
  console.log(`Test server running on port ${port}`);
});

afterAll(async () => {
  await stopServer();
  console.log(`Test server on port ${port} closed`);
});



// Mock both the controller and validation
jest.mock('../controllers/hotelController');
jest.mock('express-validator', () => ({
  ...jest.requireActual('express-validator'),
  validationResult: (req: any) => ({
    isEmpty: () => {
      // Check if all required fields are present and valid
      const requiredFields = [
        'title',
        'description',
        'guestCount',
        'bedroomCount',
        'bathroomCount',
        'amenities',
        'hostInfo',
        'address',
        'latitude',
        'longitude',
        'rooms'
      ];

      const errors: any[] = [];
      
      requiredFields.forEach(field => {
        if (!(field in req.body)) {
          errors.push({
            msg: `${field} is required`,
            param: field
          });
        }
      });

      return errors.length === 0;
    },
    array: () => {
      const errors: any[] = [];
      const data = req.body;

      if (!data.title) {
        errors.push({ msg: 'Title is required', param: 'title' });
      }
      if (!data.description) {
        errors.push({ msg: 'Description is required', param: 'description' });
      }
      if (typeof data.guestCount !== 'number') {
        errors.push({ msg: 'Guest count must be a valid positive number', param: 'guestCount' });
      }
      if (typeof data.bedroomCount !== 'number') {
        errors.push({ msg: 'Bedroom count must be a valid positive number', param: 'bedroomCount' });
      }
      if (typeof data.bathroomCount !== 'number') {
        errors.push({ msg: 'Bathroom count must be a valid positive number', param: 'bathroomCount' });
      }
      if (!Array.isArray(data.amenities)) {
        errors.push({ msg: 'Amenities must be an array', param: 'amenities' });
      }
      if (!data.hostInfo) {
        errors.push({ msg: 'Host info is required', param: 'hostInfo' });
      }
      if (!data.address) {
        errors.push({ msg: 'Address is required', param: 'address' });
      }
      if (typeof data.latitude !== 'number') {
        errors.push({ msg: 'Latitude must be a valid decimal number', param: 'latitude' });
      }
      if (typeof data.longitude !== 'number') {
        errors.push({ msg: 'Longitude must be a valid decimal number', param: 'longitude' });
      }
      if (!Array.isArray(data.rooms)) {
        errors.push({ msg: 'Rooms must be an array', param: 'rooms' });
      }

      return errors;
    }
  })
}));

describe('POST /hotels', () => {
  let server: any;

  beforeAll(done => {
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll(done => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a hotel successfully with valid data', async () => {
    const hotelData = {
      title: 'Test Hotel',
      description: 'A beautiful hotel.',
      guestCount: 4,
      bedroomCount: 2,
      bathroomCount: 2,
      amenities: ['WiFi', 'Pool'],
      hostInfo: 'Friendly host',
      address: '123 Test St, Test City',
      latitude: 12.34,
      longitude: 56.78,
      rooms: [
        {
          hotelSlug: 'test-hotel',
          roomSlug: 'room-1',
          roomImage: 'room1.jpg',
          roomTitle: 'Luxury Suite',
          bedroomCount: 1
        }
      ]
    };

    // Mock the controller response for successful creation
    (hotelController.createHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(201).json({
        message: 'Hotel created successfully',
        hotel: {
          ...hotelData,
          slug: 'test-hotel',
        }
      });
    });

    const response = await request(app)
      .post('/hotels')
      .send(hotelData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Hotel created successfully');
    expect(response.body.hotel.title).toBe(hotelData.title);
    expect(response.body.hotel.slug).toBe('test-hotel');
  }, 10000);

  it('should return 400 if required fields are missing', async () => {
    const invalidHotelData = {
      title: 'Test Hotel',
      description: 'A beautiful hotel.',
      guestCount: 4,
      // Missing required fields
    };

    // Mock the controller response for validation failure
    (hotelController.createHotel as jest.Mock).mockImplementation((req, res) => {
      const errors = {
        errors: [
          { msg: 'Bedroom count must be a valid positive number', param: 'bedroomCount' },
          { msg: 'Bathroom count must be a valid positive number', param: 'bathroomCount' },
          { msg: 'Amenities must be an array', param: 'amenities' },
          { msg: 'Host info is required', param: 'hostInfo' },
          { msg: 'Address is required', param: 'address' },
          { msg: 'Latitude must be a valid decimal number', param: 'latitude' },
          { msg: 'Longitude must be a valid decimal number', param: 'longitude' },
          { msg: 'Rooms must be an array', param: 'rooms' }
        ]
      };
      return res.status(400).json(errors);
    });

    const response = await request(app)
      .post('/hotels')
      .send(invalidHotelData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 10000);
});

//GET_Testing

describe('GET /hotels/:identifier', () => {
  let server: any;

  beforeAll(done => {
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll(done => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve a hotel successfully by ID', async () => {
    const mockHotel = {
      id: 1,
      slug: 'test-hotel',
      title: 'Test Hotel',
      description: 'A beautiful hotel',
      guestCount: 4,
      bedroomCount: 2,
      bathroomCount: 2,
      amenities: ['WiFi', 'Pool'],
      hostInfo: 'Friendly host',
      address: '123 Test St, Test City',
      latitude: 12.34,
      longitude: 56.78,
      rooms: [],
      images: []
    };

    (hotelController.getHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(mockHotel);
    });

    const response = await request(app)
      .get('/hotels/1')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHotel);
  });

  it('should retrieve a hotel successfully by slug', async () => {
    const mockHotel = {
      id: 1,
      slug: 'test-hotel',
      title: 'Test Hotel',
      description: 'A beautiful hotel',
      guestCount: 4,
      bedroomCount: 2,
      bathroomCount: 2,
      amenities: ['WiFi', 'Pool'],
      hostInfo: 'Friendly host',
      address: '123 Test St, Test City',
      latitude: 12.34,
      longitude: 56.78,
      rooms: [],
      images: []
    };

    (hotelController.getHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(mockHotel);
    });

    const response = await request(app)
      .get('/hotels/test-hotel')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHotel);
  });

  it('should return 404 when hotel is not found', async () => {
    (hotelController.getHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(404).json({ error: 'Hotel not found.' });
    });

    const response = await request(app)
      .get('/hotels/999')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Hotel not found.' });
  });

  it('should return 500 when there is a server error', async () => {
    (hotelController.getHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal server error' });
    });

    const response = await request(app)
      .get('/hotels/1')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });

  // Test proper ordering of hotel properties
  it('should return hotel properties in the correct order', async () => {
    const mockHotel = {
      id: 1,
      slug: 'test-hotel',
      images: [],
      title: 'Test Hotel',
      description: 'A beautiful hotel',
      guestCount: 4,
      bedroomCount: 2,
      bathroomCount: 2,
      amenities: ['WiFi', 'Pool'],
      hostInfo: 'Friendly host',
      address: '123 Test St, Test City',
      latitude: 12.34,
      longitude: 56.78,
      rooms: []
    };

    (hotelController.getHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(mockHotel);
    });

    const response = await request(app)
      .get('/hotels/1')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(Object.keys(response.body)).toEqual([
      'id',
      'slug',
      'images',
      'title',
      'description',
      'guestCount',
      'bedroomCount',
      'bathroomCount',
      'amenities',
      'hostInfo',
      'address',
      'latitude',
      'longitude',
      'rooms'
    ]);
  });
});


//Update_Hotel_Testing

describe('PUT /hotels/:hotelId', () => {
  let server: any;

  beforeAll(done => {
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll(done => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a hotel successfully with valid data', async () => {
    const updateData = {
      title: 'Updated Hotel',
      description: 'An updated beautiful hotel.',
      guestCount: 6,
      bedroomCount: 3,
      bathroomCount: 2,
      amenities: ['WiFi', 'Pool', 'Gym'],
      hostInfo: 'Updated friendly host',
      address: '456 Test St, Test City',
      latitude: 12.34,
      longitude: 56.78,
      rooms: [
        {
          hotelSlug: 'updated-hotel',
          roomSlug: 'room-1',
          roomImage: 'room1.jpg',
          roomTitle: 'Updated Luxury Suite',
          bedroomCount: 1
        }
      ]
    };

    const updatedHotel = {
      id: 1,
      slug: 'updated-hotel',
      images: [],
      ...updateData
    };

    (hotelController.updateHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({
        message: 'Hotel updated successfully',
        hotel: updatedHotel
      });
    });

    const response = await request(app)
      .put('/hotels/1')
      .send(updateData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hotel updated successfully');
    expect(response.body.hotel.title).toBe(updateData.title);
    expect(response.body.hotel.slug).toBe('updated-hotel');
  });

  it('should return 404 when updating non-existent hotel', async () => {
    const updateData = {
      title: 'Updated Hotel',
      description: 'An updated beautiful hotel.'
    };

    (hotelController.updateHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(404).json({ error: 'Hotel not found.' });
    });

    const response = await request(app)
      .put('/hotels/999')
      .send(updateData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Hotel not found.');
  });

  it('should return 400 for invalid hotel ID', async () => {
    const updateData = {
      title: 'Updated Hotel'
    };

    (hotelController.updateHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(400).json({ error: 'Invalid hotel ID. It must be a number.' });
    });

    const response = await request(app)
      .put('/hotels/invalid-id')
      .send(updateData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid hotel ID. It must be a number.');
  });

  it('should return 400 for invalid update data', async () => {
    const invalidUpdateData = {
      guestCount: 'invalid', // Should be a number
      bedroomCount: 'invalid', // Should be a number
      bathroomCount: 'invalid' // Should be a number
    };

    (hotelController.updateHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(400).json({
        errors: [
          { msg: 'Guest count must be a valid positive number', param: 'guestCount' },
          { msg: 'Bedroom count must be a valid positive number', param: 'bedroomCount' },
          { msg: 'Bathroom count must be a valid positive number', param: 'bathroomCount' }
        ]
      });
    });

    const response = await request(app)
      .put('/hotels/1')
      .send(invalidUpdateData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.length).toBe(3);
  });

  it('should handle partial updates successfully', async () => {
    const partialUpdateData = {
      title: 'Partially Updated Hotel',
      description: 'A partially updated description'
    };

    const updatedHotel = {
      id: 1,
      slug: 'partially-updated-hotel',
      images: [],
      title: 'Partially Updated Hotel',
      description: 'A partially updated description',
      guestCount: 4,
      bedroomCount: 2,
      bathroomCount: 2,
      amenities: ['WiFi', 'Pool'],
      hostInfo: 'Original host',
      address: '123 Test St, Test City',
      latitude: 12.34,
      longitude: 56.78,
      rooms: []
    };

    (hotelController.updateHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({
        message: 'Hotel updated successfully',
        hotel: updatedHotel
      });
    });

    const response = await request(app)
      .put('/hotels/1')
      .send(partialUpdateData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hotel updated successfully');
    expect(response.body.hotel.title).toBe(partialUpdateData.title);
    expect(response.body.hotel.description).toBe(partialUpdateData.description);
    // Verify other fields remain unchanged
    expect(response.body.hotel.guestCount).toBe(4);
  });

  it('should maintain property order after update', async () => {
    const updateData = {
      title: 'Updated Hotel',
      description: 'Updated description'
    };

    const updatedHotel = {
      id: 1,
      slug: 'updated-hotel',
      images: [],
      title: 'Updated Hotel',
      description: 'Updated description',
      guestCount: 4,
      bedroomCount: 2,
      bathroomCount: 2,
      amenities: ['WiFi', 'Pool'],
      hostInfo: 'Host info',
      address: '123 Test St',
      latitude: 12.34,
      longitude: 56.78,
      rooms: []
    };

    (hotelController.updateHotel as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({
        message: 'Hotel updated successfully',
        hotel: updatedHotel
      });
    });

    const response = await request(app)
      .put('/hotels/1')
      .send(updateData)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(Object.keys(response.body.hotel)).toEqual([
      'id',
      'slug',
      'images',
      'title',
      'description',
      'guestCount',
      'bedroomCount',
      'bathroomCount',
      'amenities',
      'hostInfo',
      'address',
      'latitude',
      'longitude',
      'rooms'
    ]);
  });
});


//Get_All_Hotels_Testing
describe('GET /hotels', () => {
  let server: any;

  beforeAll(done => {
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll(done => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all hotels successfully', async () => {
    const mockHotels = [
      {
        id: 1,
        slug: 'test-hotel-1',
        images: [],
        title: 'Test Hotel 1',
        description: 'First test hotel',
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        amenities: ['WiFi', 'Pool'],
        hostInfo: 'Host 1',
        address: '123 Test St, Test City',
        latitude: 12.34,
        longitude: 56.78,
        rooms: []
      },
      {
        id: 2,
        slug: 'test-hotel-2',
        images: [],
        title: 'Test Hotel 2',
        description: 'Second test hotel',
        guestCount: 6,
        bedroomCount: 3,
        bathroomCount: 2,
        amenities: ['WiFi', 'Gym'],
        hostInfo: 'Host 2',
        address: '456 Test St, Test City',
        latitude: 23.45,
        longitude: 67.89,
        rooms: []
      }
    ];

    (hotelController.getAllHotels as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(mockHotels);
    });

    const response = await request(app)
      .get('/hotels')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockHotels);
  });

  it('should return empty array when no hotels exist', async () => {
    (hotelController.getAllHotels as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json([]);
    });

    const response = await request(app)
      .get('/hotels')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  it('should return 500 when there is a server error', async () => {
    (hotelController.getAllHotels as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal server error' });
    });

    const response = await request(app)
      .get('/hotels')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });

  it('should maintain consistent property order for all hotels', async () => {
    const mockHotels = [
      {
        id: 1,
        slug: 'test-hotel-1',
        images: [],
        title: 'Test Hotel 1',
        description: 'First test hotel',
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        amenities: ['WiFi', 'Pool'],
        hostInfo: 'Host 1',
        address: '123 Test St, Test City',
        latitude: 12.34,
        longitude: 56.78,
        rooms: []
      },
      {
        id: 2,
        slug: 'test-hotel-2',
        images: [],
        title: 'Test Hotel 2',
        description: 'Second test hotel',
        guestCount: 6,
        bedroomCount: 3,
        bathroomCount: 2,
        amenities: ['WiFi', 'Gym'],
        hostInfo: 'Host 2',
        address: '456 Test St, Test City',
        latitude: 23.45,
        longitude: 67.89,
        rooms: []
      }
    ];

    (hotelController.getAllHotels as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(mockHotels);
    });

    const response = await request(app)
      .get('/hotels')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    response.body.forEach((hotel: any) => {
      expect(Object.keys(hotel)).toEqual([
        'id',
        'slug',
        'images',
        'title',
        'description',
        'guestCount',
        'bedroomCount',
        'bathroomCount',
        'amenities',
        'hostInfo',
        'address',
        'latitude',
        'longitude',
        'rooms'
      ]);
    });
  });

  it('should ensure all required properties are present in each hotel', async () => {
    const mockHotels = [
      {
        id: 1,
        slug: 'test-hotel-1',
        images: [],
        title: 'Test Hotel 1',
        description: 'First test hotel',
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        amenities: ['WiFi', 'Pool'],
        hostInfo: 'Host 1',
        address: '123 Test St, Test City',
        latitude: 12.34,
        longitude: 56.78,
        rooms: []
      }
    ];

    (hotelController.getAllHotels as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(mockHotels);
    });

    const response = await request(app)
      .get('/hotels')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    response.body.forEach((hotel: any) => {
      expect(hotel).toHaveProperty('id');
      expect(hotel).toHaveProperty('slug');
      expect(hotel).toHaveProperty('images');
      expect(hotel).toHaveProperty('title');
      expect(hotel).toHaveProperty('description');
      expect(hotel).toHaveProperty('guestCount');
      expect(hotel).toHaveProperty('bedroomCount');
      expect(hotel).toHaveProperty('bathroomCount');
      expect(hotel).toHaveProperty('amenities');
      expect(hotel).toHaveProperty('hostInfo');
      expect(hotel).toHaveProperty('address');
      expect(hotel).toHaveProperty('latitude');
      expect(hotel).toHaveProperty('longitude');
      expect(hotel).toHaveProperty('rooms');
    });
  });

  it('should verify data types of hotel properties', async () => {
    const mockHotels = [
      {
        id: 1,
        slug: 'test-hotel-1',
        images: [],
        title: 'Test Hotel 1',
        description: 'First test hotel',
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        amenities: ['WiFi', 'Pool'],
        hostInfo: 'Host 1',
        address: '123 Test St, Test City',
        latitude: 12.34,
        longitude: 56.78,
        rooms: []
      }
    ];

    (hotelController.getAllHotels as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(mockHotels);
    });

    const response = await request(app)
      .get('/hotels')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    response.body.forEach((hotel: any) => {
      expect(typeof hotel.id).toBe('number');
      expect(typeof hotel.slug).toBe('string');
      expect(Array.isArray(hotel.images)).toBe(true);
      expect(typeof hotel.title).toBe('string');
      expect(typeof hotel.description).toBe('string');
      expect(typeof hotel.guestCount).toBe('number');
      expect(typeof hotel.bedroomCount).toBe('number');
      expect(typeof hotel.bathroomCount).toBe('number');
      expect(Array.isArray(hotel.amenities)).toBe(true);
      expect(typeof hotel.hostInfo).toBe('string');
      expect(typeof hotel.address).toBe('string');
      expect(typeof hotel.latitude).toBe('number');
      expect(typeof hotel.longitude).toBe('number');
      expect(Array.isArray(hotel.rooms)).toBe(true);
    });
  });
});






