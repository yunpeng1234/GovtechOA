package controller

import (
	"net/http"
	"url_shortener/helper"
	"url_shortener/model"

	"github.com/gin-gonic/gin"
)

// When User saves the URL shortening
func AddURL(context *gin.Context) {
	var input model.URLMapping
	if err := context.ShouldBindJSON(&input); err != nil {

		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := helper.CurrentUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.UserID = user.ID

	savedUrlPairing, err := input.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": savedUrlPairing})
}

// Get all for dashboarding
func GetAllUrl(context *gin.Context) {

	user, err := helper.CurrentUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": user.URLMappings})
}

func DeleteUrl(context *gin.Context) {

	user, err := helper.CurrentUser(context)

	var input model.URLMapping
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": user.URLMappings})
}
