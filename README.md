
## Working with Apps built using Visual Studio 22 React(typescript) + WEB.API template
### Converting, Building, and Deploying on OpenShift

**NOTE:** There are separate readme files in the .client and .Server directories that provide more detailed instructions and example cli calls.  Start with the Server component and then move to the client project for best results.  
A large part of the effort was to create best practices custom Dockerfiles to build separate container images: one for the Server and one for the Client.  
Vite is used as the build framework for the client React TypeScript app, and you need to be careful with the vite.config.ts settings when using the proxy capability when connecting containers outside of OpenShift.  
There is also an example compose.yaml file in the .client directory to provide an example of how you can test the separate containers connecting and managing CORS issues through proxy setup.  
In all cases you will need to adjust some configuration settings and possibly modify Dockerfiles to meet your particular environment.  
When deploying/running containers on OpenShift ensure you properly configure the proxy settings for nginx, which is serving the client React app and also providing proxy services to the Server component.  

#### High level approach

- Start with the Server project  Follow the README instructions
- Note: Fix/adjust the Server project file based upon the "minimal*" example project file provided to remove client dependencies.
- Note: Adjust and run the .Server Dockerfile you choose to use. Dockerfile.OpenShift.v2 recommended (weather-server)
- Switch to the Client project and follow the instructions in its README
- Note: Adjust the vite.config.ts file in the .client project  (vite-weather-client), if you want to test locally first
- Note: Adjust and run the .client Dockerfile that supports the nginx approach
- Deploy the .Server  weather-server container based upon the Server README
- Deploy the vite-weather-client based upon the Client README
- Ensure you modify the openshift/nginx-proxy.conf file in the client project as it sets the proxy to the Server container.
- create a configmap from the cluster specific openshift/nginx-proxy.conf file
- mount the configmap as a volume to the client deployment on OpenShift

