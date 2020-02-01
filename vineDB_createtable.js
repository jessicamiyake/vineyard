var AWS = require('aws-sdk');
AWS.config.update({region:'REGION'});
var vineDB = new AWS.DynamoDB({apiVersion:'2012-08-10'});

var params = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        },
        {
            AttributeName: 'url',
            AttributeType: 'S'
        },
        {
            AttributeName: 'dialogue',
            AttributeType: 'S'
        },
        {
            AttributeName: 'description',
            AttributeType: 'S'
        },
        {
            AttributeName: 'tags',
            AttributeType: 'SS'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'url',
            KeyType: 'RANGE'
        },
        {
            AttributeName: 'dialogue',
            KeyType: 'RANGE'
        },
        {
            AttributeName: 'description',
            KeyType: 'RANGE'
        },
        {
            AttributeName: 'tags',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'VINES',
    StreamSpecification: {
        StreamEnabled: false
    }
};

vineDB.createTable(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Created", data);
    }
});