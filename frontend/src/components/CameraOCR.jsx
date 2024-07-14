import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CameraOCR = () => {
    const videoRef = useRef(null);
    const [ocrResult, setOcrResult] = useState([]);
    const [detectedText, setDetectedText] = useState(null);

    useEffect(() => {
        const getVideo = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    let video = videoRef.current;
                    if (video && !video.srcObject) {
                        video.srcObject = stream;
                        video.onloadedmetadata = () => {
                            video.play().catch((err) => {
                                console.error("Error playing video: ", err);
                            });
                        };
                    }
                })
                .catch((err) => {
                    console.error("Error accessing camera: ", err);
                });
        };
        getVideo();
    }, []);

    const captureImage = async () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', { image: imageData }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Server response:', response.data);
            const detectedNumbers = response.data.text_result;

            setOcrResult(detectedNumbers);

            // Log the OCR result to the console for debugging
            if (detectedNumbers.length > 0) {
                console.log("Detected Numbers:", detectedNumbers);
                // Update carpark availability in the backend
                await axios.post('http://127.0.0.1:5000/update_carpark_availability', { availability: detectedNumbers[0] });
                // Update detected text state
                setDetectedText(detectedNumbers[0]);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            captureImage();
        }, 5000); // Capture image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Camera OCR</h1>
            <video ref={videoRef} style={{ width: '100%', maxWidth: '600px' }}></video>
            {ocrResult.length > 0 && (
                <div>
                    <h2>Detected Numbers:</h2>
                    <ul>
                        {ocrResult.map((text, index) => (
                            <li key={index}>{text}</li>
                        ))}
                    </ul>
                </div>
            )}
            {detectedText && (
                <div>
                    <h2>Detected Text:</h2>
                    <p>{detectedText}</p>
                </div>
            )}
        </div>
    );
};

export default CameraOCR;
