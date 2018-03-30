'use strict';

module.exports = function(Files) {
    const fs = require('fs');
    var response;

    Files.list = function(cb) {
      fs.readdir('./', (err, files) => {
          this.response = files;
      })
      cb(null, this.response);
    };
    Files.remoteMethod(
      'list', {
        http: {
          path: '/list',
          verb: 'get'
        },
        returns: {
          arg: 'list',
          type: 'json'
        }
      }
    );
  };