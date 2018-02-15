# Revenge of the Pancakes

### What is this?

A short, personal, implementation of the the RotP challenge. This example actually sets
up an AWS Lambda that exposes an endpoint to send the test-cases over that you want solved.
It was a fun little experiment taking just the base of the project a little further and testing
the waters with Go Lambda's and the Serverless framework.

---

### Made with :heartpulse: using:

| Name             | Info                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------|
| Go 1.9.4         | [Go Website](https://golang.org/)                                                           |
| AWS Lambda       | [AWS Lambda Go](https://aws.amazon.com/blogs/compute/announcing-go-support-for-aws-lambda/) |
| Serverless FW    | [Serverless Framework Website](https://serverless.com/)


---

### Getting Started

PRE) Make sure you have the [serverless](https://serverless.com/framework/docs/providers/aws/guide/installation/) 
framework installed and your [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) configured to 
your own account.

-----

1) Create your lambda: `$ make && serverless deploy`
2) Test your lambda: `$ serverless invoke -f rotp-go -p data.json`

### More info

I've setup a sample request for the serverless framework that can be invoked to sends over 
the following (Base64 encoded) to the endpoint:

```
5
-
-+
+-
+++
--+-
```

Which should respond with the results of the test like so:

```json
{
  "statusCode": 200,
  "headers": null,
  "body": {
    "data" : [
      {
          "result" : 1,
          "testNumber" : 1,
          "testPattern" : "-"
      },
      {
          "result" : 1,
          "testNumber" : 2,
          "testPattern" : "-+"
      },
      {
          "result" : 2,
          "testNumber" : 3,
          "testPattern" : "+-"
      },
      {
          "result" : 0,
          "testNumber" : 4,
          "testPattern" : "+++"
      },
      {
          "result" : 3,
          "testNumber" : 5,
          "testPattern" : "--+-"
      }
    ]
  }
}
```

### Testing

:feelsgood:

###### SOON™