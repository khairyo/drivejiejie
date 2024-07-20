# DriveJieJie Web App

DriveJieJie is a comprehensive driving app that offers various features to make driving more convenient and less stressful. It includes real-time carpark availability updates, real-time gas station prices, and a chatbot for answering driving-related questions.

## Features

### Real-time Carpark Availability

The focus was on ensuring the camera live update functionality worked, which is why the carpark availability updates are currently hardcoded to Northpoint City South Wing Carpark. In real-life scenarios, the camera would be wired to an actual live carpark availability signboard for real-time updates.

**Overview**: Provides real-time updates on carpark availability.  
**Functionality**: When the camera detects a number in front of it, it updates the carpark availability within the Google location marker popup. This eliminates the need to physically drive to the carpark to check availability.

To ensure your center location is set to Yishun MRT and to enable testing of the OCR camera functionality, follow these steps:

1. Navigate to `/frontend/src/components/Map2.jsx`.
2. Comment out lines 35-55 to turn off live location:
    ```
    // useEffect(() => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         };
    //         setCurrentLocation(pos);
    //         if (map) {
    //           map.setCenter(pos);
    //         }
    //       },
    //       () => {
    //         console.error("Error: The Geolocation service failed.");
    //       }
    //     );
    //   } else {
    //     console.error("Error: Your browser doesn't support geolocation.");
    //   }
    // }, [map]);
    ```
    This ensures your center location is set to Yishun MRT. After doing this, when you select the carpark button, the map pin for "Northpoint City South Wing Carpark" will appear. Click on it to see the 'carpark availability' line in the popup.

3. Click the carpark button to display map pins for various carparks.
4. Select "Northpoint City South Wing Carpark" from the map pins.
5. In another browser tab, navigate to `http://localhost:3000/camera-ocr`.
6. Hold up a number to the camera. The camera takes snapshots every 5 seconds, and if it detects a number, it updates the carpark availability for "Northpoint City South Wing Carpark" in the popup.

### Real-time Gas Station Prices

**Overview**: Provides real-time gas station prices.  
**Functionality**: Click the gas station button to view real-time gas station prices for various brands. This helps in deciding which petrol station to drive to for the lowest prices.

### Chatbot

**Overview**: A chatbot built on Ollama AI that provides dynamic and insightful responses.  
**Functionality**: Click the chatbot icon on the bottom right and ask a question. The chatbot answers inquiries regarding driving, such as "how do I decide what type of petrol to buy" or "how do I change my car oil," adding convenience.

### Typical Map Features

**Overview**: Includes typical map features like live location and map pins/popups for locations.

## Prerequisites

- Ollama
- Docker
- Frontend: React
- Backend: Flask

## Backend Setup

To set up the backend, install the necessary packages:

```
pip install Flask==3.0.3
pip install flask-cors==4.0.1
pip install flask-socketio==5.3.6
pip install paddleocr==2.8.0
pip install paddlepaddle==2.6.1
pip install Pillow==10.4.0
pip install numpy==1.26.4
pip install requests==2.32.3
pip install regex==2023.6.3
pip install beautifulsoup4==4.12.3
pip install ollama==0.2.1
```

## Running the Application

Navigate to the backend directory and use the following command:
```
docker-compose up --build
```
Open three more separate terminals and execute the following commands, one in each:
```
python app.py
python app2.py
python chatbot.py
```

Navigate to the frontend directory and run the following commands:
```
npm install
npm start
```
The application is accessible at http://localhost:3000.

## Additional Notes
Make sure the Ollama service is running and accessible at http://localhost:11434.
