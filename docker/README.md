Docker Image for Match and Trade Web UI
=======================================

Building a New Image
--------------------
When a new `matchandtrade-web-ui` version is released we need to update
the docker image to reflect the newly released version.

```
# Build 'matchandtrade-web-ui'
ng build --prod --build-optimizer

# Copy the distribution folder to `docker/dist
cp -r dist/ docker/

# Build the docker image with a new tag
sudo docker build -t rafaelsantosbra/matchandtrade-web-ui:0.0-SNAPSHOT docker/

# Start the docker image: 'docker-compose up'
sudo docker-compose --file docker/docker-compose.yml up

# Verify if the application started correctly.
curl http://localhost:8080

# Sign-in to dockerhub
sudo docker login

# Push the new tag.
sudo docker push rafaelsantosbra/matchandtrade-web-ui:0.0-SNAPSHOT

```
