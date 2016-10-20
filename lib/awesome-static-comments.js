'use strict';

var GitHubApi = require("github");
var uuid = require("node-uuid");
var yaml = require("js-yaml");

module.exports = class AwesomeStaticComments {

  constructor(config) {
    this.config = config;
    this.firstName = config.firstName;
    this.lastName = config.lastName;

    this._initGitHub(config.gitHub);
  }

  comment(input) {
    return new Promise((resolve, reject) => {


      // TODO: make it with Promise

      input.uuid = uuid();

      if(input.text === undefined) {
        reject(Error("No text"));
      }
      resolve(this._formatCommentData(input));
    })
  }


  _formatCommentData (commentData) {
    return new Promise((resolve, reject) => {
      switch (this.config.comments.format.toLowerCase()) {
        case 'json':
          return resolve(JSON.stringify(commentData))

        case 'yaml':
        case 'yml':
          try {
            var output = yaml.safeDump(commentData)

            return resolve(output)
          } catch (err) {
            return reject(err)
          }

        default:
          return reject('INVALID_FORMAT')
      }
    })
  };

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