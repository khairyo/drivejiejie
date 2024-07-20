# Use an official Python runtime as a parent image
FROM python:3.10.8

RUN apt-get update && apt-get install -y \
  libgl1-mesa-glx \
  libglib2.0-0 \
  ffmpeg \
  libsm6 \
  libxext6

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app2.py

# Run app.py when the container launches
CMD ["python", "app2.py", "--host=0.0.0.0", "allow_unsafe_werkzeug=True"]`