# Use an official Python runtime as a parent image
FROM python:3.12.1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5002
# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD ["python", "user.py", "--host=0.0.0.0"]`