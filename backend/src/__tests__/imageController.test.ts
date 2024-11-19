import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { uploadImage } from '../controllers/imageController';
import { Hotel } from '../models/hotelModel';
import * as hotelController from '../controllers/hotelController';

// Mock dependencies
jest.mock('fs');
jest.mock('multer');
jest.mock('./hotelController');

describe('ImageController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockFs: jest.Mocked<typeof fs>;
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock response
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    // Setup mock request
    mockRequest = {
      body: {},
      files: [],
    };
    
    // Setup mock fs
    mockFs = fs as jest.Mocked<typeof fs>;
    mockFs.existsSync = jest.fn().mockReturnValue(true);
    mockFs.promises = {
      writeFile: jest.fn().mockResolvedValue(undefined),
    } as any;
  });

  describe('uploadImage', () => {
    it('should return 400 if identifier is missing', async () => {
      // Arrange
      mockRequest.body = {};

      // Act
      await uploadImage(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Identifier is required'
      });
    });

    it('should return 404 if hotel is not found', async () => {
      // Arrange
      mockRequest.body = { identifier: '123' };
      (hotelController.getHotelFilePath as jest.Mock).mockReturnValue('path/to/hotel');
      mockFs.existsSync.mockReturnValue(false);
      (hotelController.findHotelBySlug as jest.Mock).mockResolvedValue(null);

      // Act
      await uploadImage(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Hotel not found'
      });
    });

    it('should successfully upload images when using hotel ID', async () => {
      // Arrange
      const mockHotel: Hotel = {
        id: 123,
        name: 'Test Hotel',
        images: [],
      };
      
      mockRequest.body = { identifier: '123' };
      mockRequest.files = [
        { filename: 'test1.jpg' },
        { filename: 'test2.jpg' }
      ] as Express.Multer.File[];

      mockFs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockHotel));
      (hotelController.getHotelFilePath as jest.Mock).mockReturnValue('path/to/hotel');

      // Act
      await uploadImage(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Image uploaded successfully',
        images: ['/images/test1.jpg', '/images/test2.jpg']
      });
      expect(mockFs.promises.writeFile).toHaveBeenCalled();
    });

    it('should successfully upload images when using hotel slug', async () => {
      // Arrange
      const mockHotel: Hotel = {
        id: 123,
        name: 'Test Hotel',
        images: ['/images/existing.jpg'],
      };
      
      mockRequest.body = { identifier: 'test-hotel' };
      mockRequest.files = [
        { filename: 'new.jpg' }
      ] as Express.Multer.File[];

      (hotelController.findHotelBySlug as jest.Mock).mockResolvedValue(mockHotel);
      (hotelController.getHotelFilePath as jest.Mock).mockReturnValue('path/to/hotel');

      // Act
      await uploadImage(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Image uploaded successfully',
        images: ['/images/existing.jpg', '/images/new.jpg']
      });
      expect(mockFs.promises.writeFile).toHaveBeenCalled();
    });

    it('should handle multer errors', async () => {
      // Arrange
      const multerError = new Error('File too large');
      mockRequest.body = { identifier: '123' };
      
      // Mock multer error
      require('multer')().array = jest.fn().mockImplementation(
        (fieldName: string, maxCount: number) => {
          return (req: Request, res: Response, callback: Function) => {
            callback(multerError);
          };
        }
      );

      // Act
      await uploadImage(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'File too large'
      });
    });

    it('should initialize images array if it does not exist', async () => {
      // Arrange
      const mockHotel: Hotel = {
        id: 123,
        name: 'Test Hotel',
      };
      
      mockRequest.body = { identifier: '123' };
      mockRequest.files = [
        { filename: 'test.jpg' }
      ] as Express.Multer.File[];

      mockFs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockHotel));
      (hotelController.getHotelFilePath as jest.Mock).mockReturnValue('path/to/hotel');

      // Act
      await uploadImage(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Image uploaded successfully',
        images: ['/images/test.jpg']
      });
      
      // Verify the hotel was saved with initialized images array
      const savedHotel = JSON.parse(
        (mockFs.promises.writeFile as jest.Mock).mock.calls[0][1]
      );
      expect(savedHotel.images).toEqual(['/images/test.jpg']);
    });

    it('should handle internal server errors gracefully', async () => {
      // Arrange
      mockRequest.body = { identifier: '123' };
      mockFs.readFileSync = jest.fn().mockImplementation(() => {
        throw new Error('Disk error');
      });

      // Act
      await uploadImage(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Disk error'
      });
    });
  });
});