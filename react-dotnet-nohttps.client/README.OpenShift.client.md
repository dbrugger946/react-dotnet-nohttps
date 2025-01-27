## OpenShift Client app
**NOTE: These are just example commands you will need to adjust them to fit your organization's registries, and may also need to adjust ubi(s) and commands in Dockerfiles.**

### nginx based build
podman build  -f ./Dockerfile.OpenShift.nginx -t quay.io/dbrugger946/vite-weather-client:latest  .  
podman push quay.io/dbrugger946/vite-weather-client:latest  

### example OpenShift cli app deployment routines
oc new-app quay.io/dbrugger946/vite-weather-client:latest --name=weather-client-ts  
oc expose service/weather-client-ts  
oc delete all -l app=weather-client-ts  


### create/manage configmap and volume mounts   
**Needed for setting up reverse proxy in nginx**  
oc create cm  nginx-conf-cm  --from-file=nginx-proxy.conf=openshift/nginx-proxy.conf  
oc delete cm nginx-conf-cm  

oc set volume deployment/weather-client-ts --add --name nginx-conf-vol --mount-path /opt/app-root/etc/nginx.default.d/nginx-proxy.conf  --configmap-name=nginx-conf-cm --sub-path=nginx-proxy.conf  

oc set volume deployment/weather-client-ts --add ***--overwrite*** --name nginx-conf-vol --mount-path /opt/app-root/etc/nginx.default.d/nginx-proxy.conf  --configmap-name=nginx-conf-cm --sub-path=nginx-proxy.conf  

oc set volume deployment/weather-client-ts ***--remove*** --name nginx-conf-vol  


### Various local run and build approach including docker/podman/compose 
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



