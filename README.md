# npm-packages

bootstrap-env is a package used for setting up startup environment for running modern JavaScript/es6 Code outside browser. You can download the package and follow below steps to setup a project for running JavaScript code. This package saves your time of configuring the project for code transpilation.

1) Open the downloaded project with vscode or visual studio 

2) Ensure you have node and npm installed on your system

3) Open the terminal 

4) run --> npm install in the terminal in vscode

5) run --> npm install location-of-downloaded-package

After above step you can access the bootstrap-env globally

6) Create any workspace folder

7) open cmd prompt in the workspace 

8) run --> bootstrap-env. You will be having a proper folder structure fully configured for transpiling the es6 code to es5
  
9) you are ready to run modern JavaScript based on es6 

10) Write the code in --> ./bin/index.js

11) run using --> npm run build

Though you can install node and directly run any Javascript code. This package will help you get a proper project structure and also you will be able to see the es5 code generated after transpilation by Babel
