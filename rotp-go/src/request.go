package main

import (
	"encoding/json"
	"encoding/base64"
	"bytes"
	"errors"
)

// This is what we expect to be sent to our Lambda. In this case it's a base64 encoded file that looks like
// the test cases provided by Google for Revenge of the Pancakes.
type RequestBody struct {
	TestContents string `json:"testContents"`
}

// This function takes the encoded base64 string and turns it into a multi-line string for solving.
func decodeTestContents(body *RequestBody) error {
	decodedContents, err := base64.StdEncoding.DecodeString(body.TestContents)

	if err != nil {
		return errors.New("request: unable to parse test file contents to a valid string")
	}

	body.TestContents = string(decodedContents)

	return nil
}

// This function takes the body string provided by AWS and converts it to the RequestBody struct for application use.
func decodeStringBody(bodyStr string) (*RequestBody, error) {
	var body RequestBody
	// AWS gives us a string for body rather than a IOReader like http.* methods.
	// We convert that to a byte array and feed that into a new Decoder so we can decode it into a valid struct.
	err := json.NewDecoder(bytes.NewBuffer([]byte(bodyStr))).Decode(&body)

	if err != nil {
		return nil, errors.New("request: unable to parse request body to a valid struct")
	}

	return &body, nil
}

// This is the public function for getting the data we've received into a state for solving.
func ParseRequestBody(bodyStr string) (*RequestBody, error) {
	body, err := decodeStringBody(bodyStr)

	if err != nil {
		return nil, err
	}

	errBase64 := decodeTestContents(body)

	if errBase64 != nil {
		return nil, errBase64
	}

	return body, nil
}
