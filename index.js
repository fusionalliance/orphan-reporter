'use strict';

const fs = require('fs');
const _ = require('lodash');

// -----------------
// Private Functions
// -----------------

// ----------------
// Public Functions
// ----------------
/**
 * Getter for the filename of the asset list so it can be set in a single place
 */
function getAssetListFileName() {
  return 'assetlist.json';
}

/**
 * Check that the asset list file exists and if not, create it with the base json structure.
 */
function checkListFileExists() {
  // Check for existence of svglist and create it if it doesn't exist
  if (!fs.existsSync(getAssetListFileName())) {
    const jsonStructure = {
      images: [],
      pdfs: [],
    };
    const jsonString = JSON.stringify(jsonStructure, null, 2);

    fs.writeFileSync(getAssetListFileName(), jsonString);
  }
}

/**
 * Checks the obj[arraykey] for duplicates by using addition.path to find matches
 * @param {*} obj the json object
 * @param {*} arrayKey the array within the json object ['images', 'pdfs']
 * @param {*} addition the object to add to the array
 */
function checkDuplicates(obj, arrayKey, addition) {
  // Check if images array contains an obj with this image path
  const newObj = { ...obj };
  const newAddition = { ...addition };
  const duplicateIndex = _.findIndex(newObj[arrayKey], o => o.path === addition.path);
  if (duplicateIndex > -1) {
    // then ++ occurance
    newObj[arrayKey][duplicateIndex].occurances += 1;
  } else {
    // else push with occurances: 1
    newAddition.occurances = 1;
    obj[arrayKey].push(addition);
  }

  return newObj;
}

/**
 * Checks the json file to see if the image already exists in the list,
 * if so, incrememnt the occurances property,
 * if not, add the image to the list and set occurances to 1
 * @param {path of the image or pdf} pathName
 * @param {the key of the array in the json object} type
 */
function writeToList(pathName, type) {
  // Create an object for this image to put in the log of inlined svgs
  const jsonObj = {
    "path": pathName, // eslint-disable-line
  };

  // Read the current log of inlined files and push the new image and re-write the file
  const data = fs.readFileSync(getAssetListFileName());
  const obj = JSON.parse(data); // now it an object
  const newObj = checkDuplicates(obj, type, jsonObj);

  const json = JSON.stringify(newObj, null, 2); // convert it back to json
  fs.writeFileSync(getAssetListFileName(), json); // write it back
}

module.exports = {
  getAssetListFileName,
  checkListFileExists,
  writeToList,
};
