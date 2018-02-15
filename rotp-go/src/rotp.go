package main

import (
	"bufio"
	"strings"
)

// Since we're being a little bit more fancy than the standard input/output from the challenge and
// using AWS lambda; Here's the individual response for a result of a test. The end result _should_
// be an array of these.
type TestResult struct {
	Result       int     `json:"result"`
	TestNumber   int     `json:"testNumber"`
	TestPattern  string  `json:"testPattern"`
}

// There's a bunch of different ways to solve this problem. It's a great problem, but I decided to
// go more for readability rather than pure optimization. This probably wouldn't win any speed competitions
// but I feel like it makes more sense to other developers, and still isn't slow by any means.
func solveSimple(input string, idx int) *TestResult {
	// Start with optimism :)
	lastChar := int32(43) // +
	maneuverCount := 0

	// Bottom ^ Up (RTL)
	// This is where my knowledge of go fades. In Python we can sort slices by a simple operator [::-1] to go
	// bottom up for example. I'm not sure if anything exists like that in Go, but it would be handy.

	// What does exist though (Instead of a backwards for construct for example) is this little function
	// that iterates through a string in reverse looking for a particular piece in the slice. I'd say a bit
	// more glamorous function wise vs a for construct personally.

	// Eat your heart out JS... just kidding I still love you and your quirks.
	strings.LastIndexFunc(input, func (val rune) bool {
		// Buffered input characters (runes): (43 = +, 45 = -).
		if lastChar != val {
			maneuverCount++
		}
		lastChar = val

		// Continue down the path until we reach the beginning.
		return false
	})

	// You could also solve this problem top -> down (LTR) using some fun stuff with reflection I'd imagine. I feel like
	// it would get pretty complicated at that point since you'd have to introduce a struct/interface for it to
	// work. You'd also check types rather than simple unicode values. It'd be a lot easier to maintain if it wasn't
	// just boolean logic we're dealing with though.
	//
	// The range operator is pretty neat for strings as well:
	// for _, val := range input {}
	// it'd be cool if they did something like
	// for _, val := revrange input {}
	// or something like that for reversing like Python does with the [::-1] syntax

	return &TestResult{
		Result: maneuverCount,
		TestNumber: idx,
		TestPattern: input,
	}
}

// ROTP Solution Init Function
// Reads the decoded base64 multi-line string function line by line and calls the appropriate method
// to attempt to solve it.

// 1) This function starts by creating a buffered i/o scanner from the string we converted earlier.
// 2) We loop through each line within the scanner.
// 3) We call our solver function which will return us a TestResult reference to add to our results.
// 4) The array of TestResult's are passed back to the main() function which returns it as a response.
func RunTestCases(input string) []*TestResult {
	scanner := bufio.NewScanner(strings.NewReader(input))
	testCount := 0
	// I love that Go has anonymous functions.
	trimAllButPunct := func(s rune) bool {
		return s != 43 && s != 45
	}
	var testResults []*TestResult

	for scanner.Scan() {
		// The first line of the input is the number of test cases we have been provided. Skip it because we don't
		// need to solve an integer.
		if testCount == 0 {
			testCount++
			continue
		}

		result := solveSimple(strings.TrimFunc(scanner.Text(), trimAllButPunct), testCount)
		testResults = append(testResults, result)

		testCount++
	}

	return testResults
}
