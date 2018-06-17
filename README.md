Match and Trade Web UI
======================

Web interface for Match and Trade.

Development
-----------

Setup a development environment

```
# Install NodeJS v9.0
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
## Need to exit and reopen the current terminal so the changes take effect
exit
nvm install 9.0.0
node -v
npm -v

# Checkout the project
git clone https://github.com/rafasantos/matchandtrade-web-ui.git

# Install angular/cli
npm install -g @angular/cli

# Install node_modules
cd matchandtrade-web-ui
npm install
```

Useful commands

```
# Build
npm run build

# Build and run a localhost server on port 4200
npm start

# Run unit tests
npm run test

# Run end-to-end tests
npm run e2e
```
