package handlers

import (
	"dsai/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

func PingHandler(c *gin.Context) {
	response := services.PingService()
	c.JSON(http.StatusOK, response)
}
