# React Assignment - Hotel Details Application

## Task Overview

This project involves converting an initial HTML and CSS design into a server-side, component-based application using React and Next.js. The application fetches hotel data dynamically using an API developed with Node.js and Express.js. TypeScript is used throughout the project to ensure type safety, and unit tests are written for critical components and functionality.

## Technologies Used
- **React** and **Next.js** for building the frontend application
- **TypeScript** for type safety
- **Node.js** and **Express.js** for the backend API
- **Jest** and **React Testing Library** for unit tests

## Project Descriptions

### API Endpoint
- **Endpoint**: `GET /hotel/{hotel-id}`
- **Description**: Fetches the details of a hotel based on the provided `hotel-id`. The API should be developed using Node.js and Express.js and integrated into the frontend.

### Frontend Page
- **Page URL Structure**: `/hotel-details/{slug}/{hotel-id}`
  - Example: `http://localhost:8080/hotel-details/radisson-blu/76512`
  - The `slug` is a URL-friendly version of the hotel name, and the `hotel-id` is the unique identifier.

### Styling
- Converted previous HTML/CSS design into reusable React components.
- Used Tailwind CSS  for styling.

### TypeScript
- TypeScript was used throughout the project for type safety, especially for defining types for hotel data.



## Setup and Run Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Marjia029/Assignment-4_w3.git
   cd Assignment-4_w3
   ```

2. **Install Dependencies for Server**:
    ```bash
    cd backend
    npm install
    ```
3.  **Run the Server**:
  To start the development server:

    ```bash
    cd backend
    npm run dev
    ```
    The server will run on -
    ```
    http://localhost:5000
    ```

4. **Install Dependencies for Client**:
    ```bash
    cd frontend
    npm install --legacy-peer-deps
    ```

5.  **Run the Client Site**:
    To start the development server-

    ```bash
    cd frontend
    npm run dev
    ```

    The site will run on -
    ```
    http://localhost:3000
    ```
    Click the go go to the server. In the Landing Page, there will be cards for every hotels. Click the cards to navigate to the hotel details.




## Hotel Data Schema

Each hotel record is stored in a separate JSON file named `hotel-id.json`, where `hotel-id` is the unique identifier for the hotel. The hotel data follows this structure:

### Hotel Object

- **Hotel ID**: A unique identifier for the hotel (e.g., `1`, `2`, `3`).
- **Slug**: A URL-friendly version of the hotel title, generated from the hotel title (e.g., "seaside-retreat").
- **Title**: The name of the hotel (e.g., "Seaside Retreat").
- **Description**: A short description of the hotel (e.g., "A luxurious hotel by the beach with breathtaking views.").
- **Guest Count**: The number of guests the hotel can accommodate (e.g., `150`).
- **Bedroom Count**: The number of bedrooms in the hotel (e.g., `75`).
- **Bathroom Count**: The number of bathrooms in the hotel (e.g., `75`).
- **Amenities**: A list of amenities offered by the hotel (e.g., `["Free Wi-Fi", "Outdoor Pool", "Spa"]`).
- **Host Information**: Information about the host (e.g., `Jane Doe, Owner, janedoe@example.com`).
- **Address**: The location of the hotel (e.g., `123 Seaside Blvd, Beach City`).
- **Latitude and Longitude**: Geographical coordinates of the hotel (e.g., `latitude: 34.0522`, `longitude: -118.2437`).

### Room Information

Each hotel contains multiple rooms, and each room has the following details:

- **Room Slug**: A unique identifier for the room, usually generated from the room title (e.g., `ocean-view-suite`).
- **Room Image**: The URL of the image representing the room (e.g., `https://example.com/images/room1.jpg`).
- **Room Title**: The name of the room (e.g., `Ocean View Suite`).
- **Bedroom Count**: The number of bedrooms in the room (e.g., `2`).



## Endpoints For Data Creation in Server
### 1. POST/hotels
Url for creating a new hotel record is - ```http://localhost:5000/hotels```

The json format of sending data-
```json
{
  "title": "Seaside Retreat",
  "description": "A luxurious hotel by the beach with breathtaking views.",
  "guestCount": 150,
  "bedroomCount": 75,
  "bathroomCount": 75,
  "amenities": [
    "Free Wi-Fi",
    "Outdoor Pool",
    "Spa",
    "Gym",
    "Bar"
  ],
  "hostInfo": "Jane Doe, Owner, janedoe@example.com",
  "address": "123 Seaside Blvd, Beach City",
  "latitude": 34.0522,
  "longitude": -118.2437,
  "rooms": [
    {
      "hotelSlug": "seaside-retreat",
      "roomSlug": "ocean-view-suite",
      "roomImage": " ",
      "roomTitle": "Ocean View Suite",
      "bedroomCount": 2
    },
    {
      "hotelSlug": "seaside-retreat",
      "roomSlug": "garden-view-room",
      "roomImage": " ",
      "roomTitle": "Garden View Room",
      "bedroomCount": 1
    }
  ]
}
```
the "images" field is not required.

#### Response:
```json
{
    "message": "Hotel created successfully",
    "hotel": {
        "id": auto-generated,
        "slug": "seaside-retreat",
        "title": "Seaside Retreat",
        "description": "A luxurious hotel by the beach with breathtaking views.",
        "guestCount": 150,
        "bedroomCount": 75,
        "bathroomCount": 75,
        "amenities": [
            "Free Wi-Fi",
            "Outdoor Pool",
            "Spa",
            "Gym",
            "Bar"
        ],
        "hostInfo": "Jane Doe, Owner, janedoe@example.com",
        "address": "123 Seaside Blvd, Beach City",
        "latitude": 34.0522,
        "longitude": -118.2437,
        "rooms": [
            {
            "hotelSlug": "seaside-retreat",
            "roomSlug": "ocean-view-suite",
            "roomImage": " ",
            "roomTitle": "Ocean View Suite",
            "bedroomCount": 2
            },
            {
            "hotelSlug": "seaside-retreat",
            "roomSlug": "garden-view-room",
            "roomImage": " ",
            "roomTitle": "Garden View Room",
            "bedroomCount": 1
            }
        ]
        
    }
}
```
The records are saved ad hotel-id.json format in ***/data/hotels*** directory. You can create hotel either using ***POSTMAN*** application or ***THUNDER CLIENT*** extension from vs code.
### 2. GET/hotels/:hotel-id
Retrieve detailed information about a hotel using its unique ID. Url - ```http://localhost:5000/hotels/:hotel-id``` or ```http://localhost:5000/hotels/:hotel-slug```
- **Response**: A JSON object containing hotel details, including image URLs.
The server will return the response of the specified hotel.

#### Example Response:
```json
{
  "id": 1,
  "slug": "seaside-retreat",
  "images": [
    "https://example.com/images/hotel1.jpg",
    "https://example.com/images/hotel2.jpg"
  ],
  "title": "Seaside Retreat",
  "description": "A luxurious hotel by the beach with breathtaking views.",
  "guestCount": 150,
  "bedroomCount": 75,
  "bathroomCount": 75,
  "amenities": [
    "Free Wi-Fi",
    "Outdoor Pool",
    "Spa",
    "Gym",
    "Bar"
  ],
  "hostInfo": "Jane Doe, Owner, janedoe@example.com",
  "address": "123 Seaside Blvd, Beach City",
  "latitude": 34.0522,
  "longitude": -118.2437,
  "rooms": [
    {
      "hotelSlug": "seaside-retreat",
      "roomSlug": "ocean-view-suite",
      "roomImage": "https://example.com/images/room1.jpg",
      "roomTitle": "Ocean View Suite",
      "bedroomCount": 2
    }
  ]
}
```

### 3. PUT/hotels/:hotel-id
Update information about a hotel using its unique ID. Url - ```http://localhost:5000/hotels/:hotel-id``` 

### 4. POST/images
Updates the **images** associated with the slug. Url - ```http://localhost:5000/images```
#### Instructions
- Open POSTMAN
- Set the htttp request method to POST
- Set the url to 
  ```http://localhost:5000/images```
- Go to Body and select form-data
- Set 2 key value pairs. 
  - 1st key-value pair: **Key=identifier, type=text, value='hotel-id or hotel-slug'** 
  - 2nd key-value pair:  **Key=images, type=file, value='imags of the hotel'**


### 5. POST/images/rooms/:hotelid/:room-slug
Updates the **roomImage** associated with the slug. Url - ```http://localhost:5000/images/rooms/:hotel-id/:room-slug```

#### Instructions
- Open POSTMAN
- Set the htttp request method to POST
- Set the url to ```http://localhost:5000/images/rooms/:hotel-id/:room-slug```
- Go to Body and select form-data
- Set the **Key** as **roomImage** and add image of the hotel-room to the value.

### Run the Unit Tests for Server
```bash
cd backend
npm test
```

### Run the Unit Tests for UI
```bash
cd frontend
npm test
```


