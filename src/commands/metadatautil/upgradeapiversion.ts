import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import {BaseRequest} from '../../services/interfaces'
import {ModifyMetaXMLFile} from '../../services/modifymetaxmlfile'

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('salesforce-apiversion-upgrade', 'org');

export default class UpgradeAPIVersion extends SfdxCommand {

  //public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  My hub org id is: 00Dxx000000001234
  `,
  `$ sfdx hello:org --name myname --targetusername myOrg@example.com
  Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    metadata: flags.string({char: 'm', description: messages.getMessage('metadatatype')}),
    sourceversion: flags.number({char: 's', description: messages.getMessage('sourceapi')}),
    targetversion: flags.number({char: 't', description: messages.getMessage('targetapi')}),//behaviour changes
    fileprefix: flags.string({char: 'x', description: messages.getMessage('prefix')}),//regex pattern
    path: flags.string({char: 'p', description: messages.getMessage('path')})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    this.ux.styledHeader( messages.getMessage('pluginTitle') );
		
		// Run the requested action
		let baseRequest : BaseRequest = {
      metadata: this.flags.metadata,
      sourceversion: this.flags.sourceversion,
      targetversion: this.flags.targetversion,
      fileprefix: this.flags.fileprefix,
      path: this.flags.path,
      dryrun: false
		};

    let service : ModifyMetaXMLFile = new ModifyMetaXMLFile();
    service.applyProcess(baseRequest);

    // Return an object to be displayed with --json
    return {};
  }
}
