package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// This is our base handler for our Lambda. It should always remain clean and delegate responsibility to
// other functions within the application. We do this for testability as well as keeping provider independent
// logic separate.
func Handler(req *events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	body, err := ParseRequestBody(req.Body)

	if err != nil {
		return CreateErrorResponse(err.Error()), nil
	}

	return CreateResponse(RunTestCases(body.TestContents)), nil
}

// Main only has one responsibility in this case. Boot up the Lambda RPC service and register our handler.
// This is actually a pretty cool implementation by Amazon and I think it's going to open a bunch of doors for
// other languages as well.
func main() {
	lambda.Start(Handler)
}
