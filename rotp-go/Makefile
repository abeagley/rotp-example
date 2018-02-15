build:
	dep ensure
	env GOOS=linux go build -ldflags="-s -w" -o bin/rotp-go src/main.go src/request.go src/response.go src/rotp.go
