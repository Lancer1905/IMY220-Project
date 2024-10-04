# IMY220-Project

## Create DOcker Image and run a container
1. Open a terminal in the folder where the Dockerfile is located
2. run "docker-compose up --build" in the terminal

# Additional commands 
Detached mode: docker-compose up --build -d
Stop services: docker-compose down
Start services: docker-compose start
Stop services: docker-compose stop


#old details
2. Run in termial "docker build -t imy220-project ."
3. docker run --name imy220-project-container -p 3000:3000 imy220-project
4. To run already created container: "docker start imy220-project-container"
5. To stop running container: "docker stop imy220-project-container"