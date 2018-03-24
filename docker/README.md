Docker Image for Match and Trade Web UI
========================================

Building a New Image
--------------------
When a new `matchandtrade-web-ui` version is released we need to update
the docker image to reflect the newly released version.

1. Build `matchandtrade-web-ui` with: `ng build --prod --build-optimizer`
2. Copy the distribution folder to `docker/dist`
Example: `cp -r dist/ docker/`
3. Build the docker image with a new tag
Example: `docker build -t rafaelsantosbra/matchandtrade-web-ui:v0.1 .`
4. Start the docker image: `docker-compose up`
5. Verify if the application started correctly.
Example: `http://localhost`
6. Sign-in to dockerhub: `docker login`
7. Push the new tag.
Example: `docker push rafaelsantosbra/matchandtrade-web-ui:v0.1`
