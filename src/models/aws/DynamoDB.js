require('dotenv').config()
const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1",
});
const DynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = {
    async PutItem(table_params) {
        console.log(table_params)
        const new_item = await DynamoDB.put(table_params).promise()
        return new_item
    },
    async GetItem(table_params) {
        const get_item = await DynamoDB.get(table_params).promise()
        return get_item
    },
    async ScanTable(params) {
        const scan_table = await DynamoDB.scan(params).promise()
        return scan_table
    },
    async UpdateItem(table_params) {
        const update_item = await DynamoDB.update(table_params).promise()
        return update_item;
    },
    async CreateNewError(item) {
        const table_params = {
            TableName: process.env.AWS_ERROR_TABLE,
            Item: { ...item }
        }
        return "Done"
    },
    TableParams: {
        'TableName': '',
        'Item': {}
    }
}