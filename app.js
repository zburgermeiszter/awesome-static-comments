'use strict';

var ASC = require('./lib/awesome-static-comments.js');
const config = require('./config.js');

console.log(config);

var asc = new ASC(config);

function handler(event, context, callback) {
    if(event.type == 'comment') {
        handleCommentEvent(event);
    }
}

function handleCommentEvent(event) {
    console.log(event);
    asc
        .comment(event.data)
        .then(
            function(result){
                console.log("SUCCESS: ", result)
            },
            function(err){
                console.error("ERROR:", err);
            }
        );
}



module.exports.handler = handler;
handler({
    type: 'comment',
    data: {
        text: 'Hello World'
    }
});