'use strict';

var GitHubApi = require("github");
module.exports = class AwesomeStaticComments {

  constructor(config) {
    this.firstName = config.firstName;
    this.lastName = config.lastName;

    this._initGitHub(config.gitHub);
  }

  comment(input) {
    return new Promise(function(resolve, reject) {

      if(input.text === undefined) {
        reject(Error('No text'));
      }
      resolve('Comment saved!');
    })
  }

  _initGitHub(gitHubConfig) {
    this._github = new GitHubApi({
      // optional args
      debug: true,
      protocol: "https",
      host: "github.my-GHE-enabled-company.com", // should be api.github.com for GitHub
      pathPrefix: "/api/v3", // for some GHEs; none for GitHub
      headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
      },
      //Promise: require('bluebird'),
      followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
      timeout: 5000
    });

    this._github.authenticate({
      type: "token",
      token: gitHubConfig.token,
    });
  }
};