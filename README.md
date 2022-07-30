

# Migration Project
Migration project for moving JET Learning Path from MVVM Architecture to VDOM Architecture.

&nbsp;

The existing Learning Path for _Building a web application with Oracle JET_ uses TypeScript and the MVVM architecture.
http://www.oracle.com/pls/topic/lookup?ctx=jetlatest&id=jet-learning-paths

This project will take that Learning Path's final application and migrate it to the new JET Virtual DOM (VDOM) Architecture.

&nbsp;

## Prerequisites
* Nodejs v14 or higher (latest LTS recommended)
* Latest JET CLI installed (or use the NPM scripts as described below)


&nbsp;

## Setup
* Clone the project
* run *npm run restore* from the root of the project
* run *npm run serve* from the root of the project
  
&nbsp;

## Alternate Configurations

### Running two projects simultaneously
>If you are running both the MVVM and new VDOM project ( this project) at the same time, the MVVM app must run on port 8000 to use the live external REST service.

>You can run the VDOM project during development from a different server and livereload port. The NPM scripts included in the package.json file now do this automatically for you when you use the below command.

>*npm run serve*

&nbsp;

