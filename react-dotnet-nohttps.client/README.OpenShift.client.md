## OpenShift Client app

npm run dev  
  


docker build -f ./Dockerfile.OpenShift -t quay.io/dbrugger946/vite-weather-client:latest .  
OR  
docker build -f ./Dockerfile.OpenShift.dev -t quay.io/dbrugger946/vite-weather-client:latest .  
docker run --name weather-client -p 3000:3000 quay.io/dbrugger946/vite-weather-client:latest  
docker push quay.io/dbrugger946/vite-weather-client:latest  

docker compose up
docker compose down  
OR  
podman compose --file compose.yaml up
podman compose down

### multi platform
docker/podman build -f ./Dockerfile.OpenShift -t quay.io/dbrugger946/vite-weather-client:latest --platform linux/amd64,linux/arm64 .
