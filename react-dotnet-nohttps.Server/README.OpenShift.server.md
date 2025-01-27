# For OpenShift Deployments
**NOTE: These are just example commands you will need to adjust them to fit your organization's registries, and may also need to adjust ubi(s) and commands in Dockerfiles.**
### Best Docker/Podman container image build approach
#### This fully removes any client artifacts and uses best practices build approach
NOTE:  Notice that you need to create a separate "new minimal" .Server project file and remove client app dependency  
cd react-dotnet-nohttps.Server  
podman build  -f ./Dockerfile.OpenShift.v2 -t quay.io/dbrugger946/weather-server:latest  .  
OR  
docker build -f ./Dockerfile.OpenShift.v2 -t quay.io/dbrugger946/weather-server:latest .  
NOTE: **adding  --platform linux/amd64,linux/arm64** can create issues depending upon what platform you are building on.
  
Example local invocation after running container  
curl http://localhost:8888/api/weatherforecast

### Openshift example cli's for deployment
oc new-app quay.io/dbrugger946/weather-server:latest --name=weather-server  
oc expose service/weather-server  
oc delete all -l app=weather-server  

### Other Docker build with less optimized Dockerfile
Run the build from the base solution directory  
docker build  -f react-dotnet-nohttps.Server/Dockerfile.OpenShift -t quay.io/dbrugger946/weather-server:latest  .  
docker run -p 8888:8080 quay.io/dbrugger946/weather-server:latest  
docker push quay.io/dbrugger946/weather-server:latest
