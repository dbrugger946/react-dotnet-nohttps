## Some alternate steps if using "vanilla" nginx container to run react app
***NOTE: In this approach one is using the "standard" nginx container image on the internet NOT the secure recommended Red Hat UBI build***
**The main differences will be pointed out in the following steps**  

**1: Build the client container image using a Dockerfile and:**  
- *ensure to COPY the react app into the **/usr/share/nginx/html** directory in the nginx image*  
- *make sure to adjust the user to a non root user*  
	- *an example Docker file is **Dockerfile.ocp.nginx-upstream***  





**2: Override both the main /etc/nginx/nginx.conf file and the /etc/nginx/conf.d/default.conf files**  
*Basically you need to create 2 configmaps and setup two volume mounts*  
- use the *openshift/upstream/conf/nginx.conf* file probably as is  
- use the *openshift/upstream/conf/default.conf*  **you should only have to adjust the ***proxy_pass*** setting**  


**3: Create the ConfigMap(s)**  
oc create cm nginx-conf-cm --from-file=nginx.conf=openshift/upstream/conf/nginx.conf  
oc create cm nginx-default-cm --from-file=default.conf=openshift/upstream/conf/default.conf

**4: Deploy the client app -- here using yamls that you will may need to adjust**  
oc create -f ./openshift/upstream/client-deployment-upstream.yaml  
oc create -f ./openshift/upstream/client-service.yaml  
oc create -f ./openshift/upstream/client-edge-route.yaml  





### Other Notes --not needed if the approaches above are used
**Optional Volume Mounts approach using cli**
**oc set volume deployment/weather-client-ts --add --name=nginx-conf-vol --mount-path=/etc/nginx/nginx.conf  --configmap-name=nginx-conf-cm --sub-path=nginx.conf**  
**oc set volume deployment/weather-client-ts --add --name=nginx-default-vol --mount-path=/etc/nginx/conf.d/default.conf  --configmap-name=nginx-default-cm --sub-path=default.conf**  
(^confirm the mount-path is set correctly for your particular nginx image -- ALSO. cli calls from windows bash/cmd/PS sometimes need to remove the first "/" in the path)  

**example docker build based upon example upstream nginx dockerfile approach**
docker build -f ./Dockerfile.ocp.nginx-upstream -t quay.io/dbrugger946/vite-weather-client-upstream:latest .


