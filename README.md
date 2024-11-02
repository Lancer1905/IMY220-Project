# IMY220-Project

## Create Docker Image and run a container
1. Open a terminal in the folder where the Dockerfile is located
2. run "docker-compose up --build" in the terminal

## Pull Docker Images and run container
1. Open terminal in Docker CLI and run following commands
2. docker pull pieter1905/d3-website:v1.0 
3. docker pull pieter1905/d3-api:v1.0
4. docker network create my_network
5. docker run -d --name d3-website --network my_network -p 3000:3000 pieter1905/d3-website:v1.0
6. docker run -d --name d3-api --network my_network -p 3005:3005 pieter1905/d3-api:v1.0

# Additional commands 
Detached mode: docker-compose up --build -d
Stop services: docker-compose down
Start services: docker-compose start
Stop services: docker-compose stop


# old details
2. Run in termial "docker build -t imy220-project ."
3. docker run --name imy220-project-container -p 3000:3000 imy220-project
4. To run already created container: "docker start imy220-project-container"
5. To stop running container: "docker stop imy220-project-container"
