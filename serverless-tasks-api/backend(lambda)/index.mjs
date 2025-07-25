import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  let response;

  switch (event.httpMethod) {
    case "GET":
      response = await handleGetRequest();
      break;

    case "POST":
      response = await handlePostRequest(event, context);
      break;

    case "DELETE":
      response = await handleDeleteRequest(event);
      break;

    case "PUT":
      response = await handlePutRequest(event);
      break;

    case "PATCH":
      response = await handlePatchRequest(event);
      break;

    case "OPTIONS":
      response = handleOptionsRequest();
      break;

    default:
      response = {
        statusCode: 405,
        body: JSON.stringify({ message: `Method ${event.httpMethod} not allowed.` }),
      };
  }

  return {
    ...response,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  };
};

// ✅ GET all tasks
const handleGetRequest = async () => {
  const command = new ScanCommand({ TableName: "Tasks" });
  const result = await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};

// ✅ POST a new task
const handlePostRequest = async (event, context) => {
  const { name, date, completed } = JSON.parse(event.body);

  const command = new PutCommand({
    TableName: "Tasks",
    Item: {
      id: context.awsRequestId,
      name,
      date,
      completed,
    },
  });

  await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task created successfully" }),
  };
};

// ✅ DELETE a task
const handleDeleteRequest = async (event) => {
  const { id } = JSON.parse(event.body);

  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: { id },
  });

  await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task deleted successfully" }),
  };
};

// ✅ PUT to fully update a task
const handlePutRequest = async (event) => {
  const { id, name, date, completed } = JSON.parse(event.body);

  const command = new UpdateCommand({
    TableName: "Tasks",
    Key: { id },
    UpdateExpression: "set #n = :name, #d = :date, #c = :completed",
    ExpressionAttributeNames: {
      "#n": "name",
      "#d": "date",
      "#c": "completed",
    },
    ExpressionAttributeValues: {
      ":name": name,
      ":date": date,
      ":completed": completed,
    },
  });

  await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task updated successfully" }),
  };
};

// 🆕 PATCH to partially update task (e.g., only status)
const handlePatchRequest = async (event) => {
  const { id, completed } = JSON.parse(event.body);

  const command = new UpdateCommand({
    TableName: "Tasks",
    Key: { id },
    UpdateExpression: "set #c = :completed",
    ExpressionAttributeNames: {
      "#c": "completed",
    },
    ExpressionAttributeValues: {
      ":completed": completed,
    },
  });

  await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task partially updated" }),
  };
};

// ✅ OPTIONS for CORS preflight
const handleOptionsRequest = () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "CORS preflight passed" }),
  };
};

