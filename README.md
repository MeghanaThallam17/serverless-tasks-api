# 📋 Serverless Tasks API

A **full-stack serverless To-Do List application** with a simple **HTML/CSS frontend** and a powerful **REST API backend** powered by **AWS Lambda, API Gateway, and DynamoDB**.

Users can add, delete modify  tasks; each stored in a DynamoDB table using a unique `id`. Built entirely on a serverless architecture for scalability, flexibility, and zero infrastructure management.

---

## 🚀 Tech Stack

- **Frontend**: HTML, CSS
- **Backend**: AWS Lambda (Node.js / Python)
- **API Gateway**: RESTful endpoints
- **Database**: Amazon DynamoDB (NoSQL)
- **Architecture**: Fully serverless on AWS

---

## 📂 Features

- ✅ Add new tasks with task name, number, and date
- ✅ Deletes and modifies existing tasks by ID
- ✅ Store tasks in DynamoDB
- ✅ Lightweight and responsive frontend
- ✅ Scalable and cost-efficient backend

---

## 📁 Folder Structure

serverless-tasks-api/
├── frontend/
│ └── index.html # Frontend UI
├── backend/
│ └── index.mjs # Backend logic (AWS Lambda handler)
├── postman_tests/
│ └── tasks_api_postman_collection.json # Postman API testing collection
├── README.md # Project documentation
└── LICENSE # MIT License


---

## 📌 Prerequisites

- AWS Account with:
  - Lambda
  - API Gateway
  - DynamoDB
- Basic knowledge of AWS IAM and permissions

---

## 📦 How to Deploy

1. Create a DynamoDB table with `id` as the primary key.
2. Set up a single AWS Lambda function (`index.mjs`) to handle multiple HTTP methods: `POST`, `GET`, `PUT`, `PATCH`, and `DELETE`.
3. Connect your Lambda to API Gateway and configure routes for each method.
4. Point your frontend form or JavaScript to the appropriate API Gateway endpoints.
5. Host your frontend (index.html) on S3 or run it locally in a browser.

---

## 🛡 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙋‍♀️ Author

**Meghana Thallam**  
🔗 [GitHub Profile](https://github.com/MeghanaThallam17)

---




