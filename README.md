Easy to use tool for upgrading API versions salesforce meta xml files!
=============================
Helps in upgrading salesforce api version for selected metadata files. Specify a target api version and the plugin will take care of modifying all the meta xml files with the target api version!

[![Version](https://img.shields.io/npm/v/salesforce-apiversion-upgrade.svg)](https://npmjs.org/package/salesforce-apiversion-upgrade)
[![CircleCI](https://circleci.com/gh/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade/tree/master.svg?style=shield)](https://circleci.com/gh/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/salesforce-apiversion-upgrade/branch/master)
[![Codecov](https://codecov.io/gh/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade/branch/master/graph/badge.svg)](https://codecov.io/gh/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade)
[![Greenkeeper](https://badges.greenkeeper.io/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade/badge.svg)](https://snyk.io/test/github/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade)
[![Downloads/week](https://img.shields.io/npm/dw/salesforce-apiversion-upgrade.svg)](https://npmjs.org/package/salesforce-apiversion-upgrade)
[![License](https://img.shields.io/npm/l/salesforce-apiversion-upgrade.svg)](https://github.com/https://github.com/ganesh2109/salesforce-apiversion-upgrade/salesforce-apiversion-upgrade/blob/master/package.json)

<!-- toc -->

<!-- tocstop -->
Since this is a SFDX plugin, it is a pre-requisite to have salesforce CLI installed globally first.
Once that is in place, you can use the below to install this plugin!

```sh-session
Install the plugin
$ sfdx plugins:install salesforce-apiversion-upgrade

To check whether the plugin is installed
$ sfdx metadatautil:upgradeapiversion

To update the plugin to the latest version
$ sfdx plugins:update
```

```
USAGE:
  $ sfdx metadatautil:upgradeapiversion -m <array> -p <string> [-s <number>] [-t <number>] [-x <string>] [-d] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS:
  -d, --dryrun If present will only output the files changed without actually changing them
  -m, --metadata (required) Select metadata type. Possible values:  classes/pages/components/triggers/aura/lwc
  -p, --path (required) The path to your src folder
  -s, --sourceversion The API version threshold from which you wish to upgrade. Minimum: 10, Maximum: 46, Default: 46
  -t, --targetversion The API version you want to upgrade to. Minimum:30 Maximum:47 Default:47
  -x, --fileprefix Metadata filename prefix. E.g. App for App_Utils.cls. Default: none(all files)
  
EXAMPLES:
sfdx metadatautil:upgradeapiversion -m classes -s 40 -t 47 -p "C:\Users\SSSS\Project\src"
sfdx metadatautil:upgradeapiversion -m classes/pages -s 40 -t 47 -p "C:\Users\SSSS\Project\src" -x "App"
```
