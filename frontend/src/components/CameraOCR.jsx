import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CameraOCR = () => {
    const videoRef = useRef(null);
    const [ocrResult, setOcrResult] = useState(null);

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
            setOcrResult(response.data.text_result);
            
            // Log the OCR result to the console for debugging
            if (response.data.text_result.length > 0) {
                console.log("Detected Numbers:", response.data.text_result);
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
            {ocrResult && (
                <div>
                    <h2>Detected Numbers:</h2>
                    <ul>
                        {ocrResult.map((text, index) => (
                            <li key={index}>{text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CameraOCR;
