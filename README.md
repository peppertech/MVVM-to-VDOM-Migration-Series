

# Migration Project
Migration project for moving JET Learning Path from MVVM Architecture to VDOM Architecture.

&nbsp;

The existing Learning Path for _Building a web application with Oracle JET_ uses TypeScript and the MVVM architecture.
http://www.oracle.com/pls/topic/lookup?ctx=jetlatest&id=jet-learning-paths

This project will take that Learning Path's final application and migrate it to the new JET Virtual DOM (VDOM) Architecture.

&nbsp;

## Prerequisites
* Nodejs v12 or higher (latest LTS recommended)
* Latest JET CLI installed (or use NPX as described below)


&nbsp;

## Setup
* Clone the project
* run *ojet restore* from the root of the project
* run *ojet serve* from the root of the project
  
&nbsp;

## Alternate Configurations

### Running two projects simultaneously
>If you are running both the MVVM and new VDOM project ( this project) at the same time, the MVVM app must run on port 8000 to use the live external REST service.

>You can run the VDOM project during development from a different server and livereload port by using the below command.

>*ojet serve --server-port=8001 --livereload-port=35723*

&nbsp;

### Using two different versions of the JET CLI

>If you have two projects running different versions of JET, you will need to have two different versions of the CLI to match those runtime versions.  You can use __NPX__ for this scenario.

>_npx @oracle/ojet-cli@&lt;version> serve_

>where &lt;version> is the version of the CLI you wish to use.  Leaving off the version will use the latest production release.