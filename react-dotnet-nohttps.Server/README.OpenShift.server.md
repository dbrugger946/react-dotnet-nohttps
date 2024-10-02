# For OpenShift Deployments

### Docker build
Run the build from the base solution directory
docker build  -f react-dotnet-nohttps.Server/Dockerfile.OpenShift -t quay.io/dbrugger946/weather-server:latest  .  
docker run -p 8888:8080 quay.io/dbrugger946/weather-server:latest  
docker push quay.io/dbrugger946/weather-server:latest

OR  
docker/podman build  -f react-dotnet-nohttps.Server/Dockerfile.OpenShift -t quay.io/dbrugger946/weather-server:latest --platform linux/amd64,linux/arm64 . 