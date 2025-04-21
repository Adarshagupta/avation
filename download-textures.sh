#!/bin/bash

# Download Earth blue marble texture
curl -o public/images/earth-blue-marble.jpg https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg

# Download Earth topology (bump map)
curl -o public/images/earth-topology.png https://unpkg.com/three-globe@2.24.10/example/img/earth-topology.png

echo "Earth textures downloaded successfully!" 