import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { BaseRequest } from "../../services/interfaces";
import { ModifyMetaXMLFile } from "../../services/modifymetaxmlfile";
import * as constants from "../../constants/constants";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(
  "salesforce-apiversion-upgrade",
  "messages"
);

export default class UpgradeAPIVersion extends SfdxCommand {
  // SFDX CLI specific configuration
  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  // Define flags and options
  protected static flagsConfig = {
    metadata: flags.array({
      char: "m",
      description: messages.getMessage("metadatatype"),
      required: true,
      delimiter: "/",
      map: (val: string) => {
        if (!constants.acceptedMetadata.includes(val)) {
          console.log(
            "Metadata of type: " +
              val +
              " is not supported. Possible values are: classes/triggers/pages/components/aura/lwc"
          );
          process.exit();
        } else {
          return val;
        }
      },
    }),
    path: flags.string({
      char: "p",
      description: messages.getMessage("path"),
      required: true,
    }),
    sourceversion: flags.number({
      char: "s",
      description: messages.getMessage("sourceapi"),
      min: 10,
      max: 50,
    }),
    targetversion: flags.number({
      char: "t",
      description: messages.getMessage("targetapi"),
      min: 30,
      max: 51,
    }),
    fileprefix: flags.string({
      char: "x",
      description: messages.getMessage("prefix"),
    }),
    dryrun: flags.boolean({
      char: "d",
      description: messages.getMessage("dryrun"),
    }),
  };

  public async run(): Promise<void> {
    this.ux.styledHeader(messages.getMessage("pluginTitle"));
    this.ux.startSpinner("Running...");

    // Construct the request object based on user's input or defaults
    let baseRequest: BaseRequest = {
      metadata: this.flags.metadata,
      sourceversion: this.flags.sourceversion
        ? this.flags.sourceversion
        : constants.DEFAULT_SOURCE_API_VERSION,
      targetversion: this.flags.targetversion
        ? this.flags.targetversion
        : constants.DEFAULT_TARGET_API_VERSION,
      fileprefix: this.flags.fileprefix ? this.flags.fileprefix : "",
      path: this.flags.path,
      dryrun: this.flags.dryrun ? this.flags.dryrun : false,
    };

    let service: ModifyMetaXMLFile = new ModifyMetaXMLFile();
    service.applyProcess(baseRequest).then(() => {
      this.ux.stopSpinner("Done!");
    });
  }
}
