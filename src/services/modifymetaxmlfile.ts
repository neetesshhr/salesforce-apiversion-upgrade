import {BaseRequest} from "./interfaces"
const replace = require("replace-in-file");
export class ModifyMetaXMLFile {
    async applyProcess(argv: BaseRequest): Promise<any> {
        let prefix = "";
        let searchForAPILowerThan = 46;
        let replaceWithAPI = 47;
        let dryRun = false;
        let selectedFiles = [];
        let errors = [];
        let src = "";

        /*if (argv.helpme != null) {
        console.log("This command accepts the following parameters:");
        console.log("MANDATORY:");
        console.log("--src path to your src folder followed by /");
        console.log(
            "--metadata classes/triggers/pages/components/aura/lwc. pick what you would like"
        );
        console.log("OPTIONAL:");
        console.log(
            "--fileprefix BP -> only files starting with BP* will be picked up. by default will take all files"
        );
        console.log(
            "--apithreshold 35 -> only api version lower than 35 will be changed. default is 46"
        );
        console.log(
            "--newapi 47 -> all files will be changed to api version 47. default is 47"
        );
        console.log("--dryrun true -> will do test-only. default is false");
        return;
        }*/

        // validate and process the args
        if (argv.fileprefix != null) {
            prefix = argv.fileprefix;
        }

        if (argv.path == null) {
            errors.push(
                "--path has to be specified and it has to point to your src folder, followed by /"
            );
        } else {
        src = argv.path;
        }

        if (argv.metadata == null) {
            errors.push(
                "--metadata has to be specified. possible values: classes/triggers/pages/components/aura/lwc"
            );
        } else {
        let metadataList = argv.metadata.split("/");
        for (let i = 0; i < metadataList.length; i++) {
            if (metadataList[i] == "apex") {
            selectedFiles.push(`${src}\\classes\\${prefix}*-meta.xml`);
            }
            if (metadataList[i] == "triggers") {
            selectedFiles.push(`${src}\\triggers\\${prefix}*-meta.xml`);
            }
            if (metadataList[i] == "pages") {
            selectedFiles.push(`${src}\\pages\\${prefix}*-meta.xml`);
            }
            if (metadataList[i] == "components") {
            selectedFiles.push(`${src}\\components\\${prefix}*-meta.xml`);
            }
            if (metadataList[i] == "aura") {
            selectedFiles.push(`${src}\\aura\\**\\${prefix}*-meta.xml`);
            }
            if (metadataList[i] == "lwc") {
            selectedFiles.push(`${src}\\lwc\\**\\${prefix}*-meta.xml`);
            }
        }
        }

        if (argv.sourceversion != null) {
        if (argv.sourceversion < 10 || argv.sourceversion > 46) {
            errors.push("--apithreshold can be set between 10 and 46");
        } else {
            searchForAPILowerThan = argv.sourceversion;
        }
        }

        if (argv.targetversion != null) {
        if (argv.targetversion < 30 || argv.targetversion > 47) {
            errors.push("--newapi can be set between 30 and 47");
        } else {
            replaceWithAPI = argv.targetversion;
        }
        }

        if (errors.length != 0) {
        errors.push("--helpme to see a list of possible arguments");
        return console.log(errors);
        }

        if (argv.dryrun) {
        dryRun = true;
        }

        // Set the Regex to match the max requested API version
        let firstDigit = searchForAPILowerThan.toString()[0];
        let secondDigit = searchForAPILowerThan.toString()[1];
        let regex = `<apiVersion>([0-${+firstDigit - 1}][0-9]|[0-${firstDigit}][0-${+secondDigit}]).0</apiVersion>`;

        let options = {
        files: selectedFiles,
        from: new RegExp(regex, "g"),
        to: `<apiVersion>${replaceWithAPI}.0</apiVersion>`,
        dry: dryRun, //set this to false to actually perform the changes
        countMatches: true
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
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
}
