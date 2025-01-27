## OpenShift Client app
**NOTE: These are just example commands you will need to adjust them to fit your organization's registries, and may also need to adjust ubi(s) and commands in Dockerfiles.**

### 1: nginx based build
podman build  -f ./Dockerfile.OpenShift.nginx -t quay.io/dbrugger946/vite-weather-client:latest  .  
podman push quay.io/dbrugger946/vite-weather-client:latest  

### 2: example OpenShift cli app deployment routines
(deploy the client app) oc new-app quay.io/dbrugger946/vite-weather-client:latest --name=weather-client-ts   --as-deployment-config=false  
(http route) oc expose service/weather-client-ts
OR  
(https route) oc create route edge --service=weather-client-ts  

(if need be:) oc delete all -l app=weather-client-ts  


### 3: create/manage configmap and volume mounts   
**Needed for setting up reverse proxy in nginx**  
(i. create a config map from the file)  
oc create cm  nginx-conf-cm  --from-file=nginx-proxy.conf=openshift/nginx-proxy.conf  

(if need be:) oc delete cm nginx-conf-cm  

(ii. link the configmap to the deployment)  
oc set volume deployment/weather-client-ts --add --name=nginx-conf-vol --mount-path=/opt/app-root/etc/nginx.default.d/nginx-proxy.conf  --configmap-name=nginx-conf-cm --sub-path=nginx-proxy.conf  
(***^confirm the mount-path is set correctly for your particular nginx image -- ALSO. cli calls from windows bash/cmd/PS sometimes mangle the path)***  

(if you need to modify it)  
oc set volume deployment/weather-client-ts --add ***--overwrite*** --name nginx-conf-vol --mount-path /opt/app-root/etc/nginx.default.d/nginx-proxy.conf  --configmap-name=nginx-conf-cm --sub-path=nginx-proxy.conf  

(if need be:) oc set volume deployment/weather-client-ts ***--remove*** --name nginx-conf-vol  


### Other Scenarios: Various local run and build approach including docker/podman/compose 
npm run dev  
  
**You can use these approaches to create "local" developer testing scenarios.  You will need to make adjustments to some configuration files to meet your environment**  
from the *react-dotnet-nohttps.client* directory  
docker build -f ./Dockerfile.OpenShift -t quay.io/dbrugger946/vite-weather-client:latest .  
OR  
docker build -f ./Dockerfile.OpenShift.dev -t quay.io/dbrugger946/vite-weather-client:latest .  

***OR the following copies the nginx.conf file into the nginx build version of the image 
For OpenShift deployments you would want to use best practices and use the configmap / volume approach from above also***   
podman build  -f ./Dockerfile.OpenShift.nginx.alt -t quay.io/dbrugger946/vite-weather-client:latest  .  

docker run --name weather-client -p 3000:3000 quay.io/dbrugger946/vite-weather-client:latest  
docker push quay.io/dbrugger946/vite-weather-client:latest  

docker compose up  
docker compose down  
OR  
podman compose --file compose.yaml up  
podman compose down  


### multi platform build for container image :  
#### Caution intended for support of Mac envs, but usually this fails when building on a Mac, when building on a Mac avoid --platform option 
docker/podman build -f ./Dockerfile.OpenShift -t quay.io/dbrugger946/vite-weather-client:latest --platform linux/amd64,linux/arm64 .  



