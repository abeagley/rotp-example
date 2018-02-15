package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
)

// If we break things (We sure will) this is the JSON payload we should send out.
type ErrorResponse struct {
	Error string `json:"message"`
}

// If we didn't break things (Phew!) this is the JSON payload we should send out.
type Response struct {
	Data []*TestResult `json:"data"`
}

// We broke things, lets make sure we format the error with proper JSON for a UI to consume.
func CreateErrorResponse(message string) (events.APIGatewayProxyResponse) {
	msg, err := json.Marshal(ErrorResponse{
		Error: message,
	})

	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(),
			StatusCode: 500,
		}
	}

	return events.APIGatewayProxyResponse{
		Body: string(msg),
		StatusCode: 400,
	}
}

// We solved things (hopefully!), lets make sure we format the error with proper JSON for a UI to consume.
func CreateResponse(data []*TestResult) (events.APIGatewayProxyResponse) {
	respJSON, err := json.Marshal(Response{
		Data: data,
	})

	if err != nil {
		return CreateErrorResponse(err.Error())
	}

	return events.APIGatewayProxyResponse{
		Body: string(respJSON),
		StatusCode: 200,
	}
}
