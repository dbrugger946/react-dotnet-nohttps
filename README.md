
## Working with Apps built using Visual Studio 22 React(typescript) + WEB.API template
### Converting, Building, and Deploying on OpenShift

**NOTE:** There are separate readme files in the .client and .Server directories that provide example approaches using custom Dockerfiles to build separate container images.  There is also an example compose.yaml file in the .client directory to provide an example of how you can test the separate containers connecting and managing CORS issues through proxy setup.

#### High level approach

- Adjust the project files
- Adjust and run the .Server Dockerfile (weather-server)
- Adjust the nginx.conf file in the .client project  (vite-weather-client), if you want to test locally first
- Adjust and run the .client Dockerfile that supports the nginx approach
- Create a nginx.conf file that represents the deployment/service, specifically the proxy_pass and other settings relevant to the OpenShift environment
- Deploy the .Server  weather-server container.
- Deploy the vite-weather-client
- create a secret from the cluster specific nginx.conf file
- mount the secret as a volume to the client deployment on OpenShift

