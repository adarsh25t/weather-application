# weather-application Project

## Overview
This project is a weather-application application that allows users to register, log in, and view current, forecasted, and historical weather data for various cities. Users can also save their favorite cities and easily access weather information for those cities.

You can view the live frontend of the project (https://weather-application-eta-tawny.vercel.app/).

## Features
1. **User Authentication**:
   - Register and login using JWT (JSON Web Tokens).
   - Passwords are hashed and securely stored.

2. **Weather Data Integration**:
   - Integration with a third-party weather API (e.g., OpenWeatherMap or Weatherstack).
   - Users can search for weather information by city.

3. **Weather Dashboard**:
   - Display current weather, 7-day forecast, and historical weather data for the past 7 days for a searched city.
   - Include details like temperature, humidity, wind speed, and weather conditions.

4. **Favorite Cities**:
   - Allow users to save their favorite cities.
   - Display weather data for the user’s favorite cities on their dashboard.

5. **API Endpoints**:
   - `POST /register` - Register a new user.
   - `POST /login` - Authenticate a user and return a JWT.
   - `GET /weather/current?city={city}` - Get current weather for a city.
   - `GET /weather/forecast?city={city}` - Get 7-day weather forecast for a city.
   - `GET /weather/historical?city={city}` - Get historical weather data for the past 7 days for a city.
   - `POST /favorites` - Add a city to the user’s favorites.
   - `GET /favorites` - Get the user’s favorite cities and their weather data.

6. **Database**:
   - Use PostgreSQL to store user data and favorite cities.
   - Use Prisma for modeling and interacting with the database.

7. **Validation and Error Handling**:
   - Implement input validation and error handling for all endpoints.
   - Return appropriate HTTP status codes and error messages.

8. **Documentation**:
   - Document the API endpoints and their usage.
   - Include examples of requests and responses.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm (Node Package Manager)
- An API key from a weather data provider (e.g., OpenWeatherMap)

### Environment Variables
Create a `.env` file in the root of your project and add the following variables:
1. DATABASE_URL
2. PORT
3. JWT_SECRET


### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/weather-application.git
   cd weather-application

2. Install dependencies:
   npm install

3. Setup the database:
    npx prisma migrate dev --name init

### Running the Application

1. Start the development server:
   npm run dev

### API Endpoints:

1. Register a new user:
   POST /register
      {
        "name": "name",
         "email": "email",
        "password": "password"
      }

2. Login a user:
    POST /login
    {
      "email": "email",
      "password": "password"
    }

3. Add a city to the user’s favorites:
    POST /favorites
      {
        "city": "London"
      }

4. Get the user’s favorite cities and their weather data:
    GET /favorites


   
