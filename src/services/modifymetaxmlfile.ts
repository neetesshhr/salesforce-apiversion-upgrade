import { BaseRequest } from "./interfaces";
const replace = require("replace-in-file");
const pathModule = require("path");
export class ModifyMetaXMLFile {
  async applyProcess(request: BaseRequest): Promise<any> {
    let {
      metadata,
      sourceversion,
      targetversion,
      fileprefix,
      path,
      dryrun
    } = request;

    let fileName = `${fileprefix}*-meta.xml`;
    let selectedFiles = [];

    for (let i = 0; i < metadata.length; i++) {
      if (metadata[i] == "classes") {
        selectedFiles.push(pathModule.join(path, "classes", fileName));
      }
      if (metadata[i] == "triggers") {
        selectedFiles.push(pathModule.join(path, "triggers", fileName));
      }
      if (metadata[i] == "pages") {
        selectedFiles.push(pathModule.join(path, "pages", fileName));
      }
      if (metadata[i] == "components") {
        selectedFiles.push(pathModule.join(path, "components", fileName));
      }
      if (metadata[i] == "aura") {
        selectedFiles.push(pathModule.join(path, "aura", "**", fileName));
      }
      if (metadata[i] == "lwc") {
        selectedFiles.push(pathModule.join(path, "lwc", "**", fileName));
      }
    }

    // Set the Regex to match the max requested API version
    let firstDigit = sourceversion.toString()[0];
    let secondDigit = sourceversion.toString()[1];
    let regex = `<apiVersion>([0-${+firstDigit -
      1}][0-9]|[${firstDigit}-${firstDigit}][0-${+secondDigit}]).0</apiVersion>`;

    let options = {
      files: selectedFiles,
      from: new RegExp(regex, "g"),
      to: `<apiVersion>${targetversion}.0</apiVersion>`,
      dry: dryrun
    };

    console.log(options);

    try {
      let numberOfFilesChanged = 0;
      const results = replace.sync(options);
      for (let i = 0; i < results.length; i++) {
        if (results[i].hasChanged == true) {
          numberOfFilesChanged += 1;
        }
      }
      console.log(numberOfFilesChanged + " files have been changed!");
      return true;
    } catch (error) {
      console.error("Error occurred:", error);
      return false;
    }
  }
}
