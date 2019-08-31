#!/bin/bash

echo "Starting the Node server..."
node_modules/.bin/nodemon server.js &
echo "Starting the React app...."
cd client && npm start

