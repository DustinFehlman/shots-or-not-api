import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "reviews",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            content: data.content,
            reviewId: uuid.v1(),
            title: data.title,
            createdAt: Date.now(),
            productId: data.productId
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}
