package services

import "dsai/models"

func PingService() models.Response {
	return models.Response{Message: "pong"}
}
