/**
  Copyright (c) 2015, 2022, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/

"use strict";
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
    console.log("Running after_build hook.");
    //create dist folder at root of project to hold the archive
    fs.mkdir(path.join(__dirname, "../../dist"), { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully!");
    });

    //change the extension of the my-archive.xxx file from .zip to .war as needed
    const output = fs.createWriteStream("./dist/my-archive.zip");
    //leave unchanged, compression is the same for WAR or Zip file
    const archive = archiver("zip");

    output.on("close", () => {
      console.log("Files were successfully archived.");
      resolve();
    });

    archive.on("warning", (error) => {
      console.warn(error);
    });

    archive.on("error", (error) => {
      reject(error);
    });

    archive.pipe(output);
    archive.directory("web", false);
    archive.finalize();

    resolve(configObj);
  });
};
