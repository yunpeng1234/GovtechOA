package controller

import (
	"fmt"
	"net/http"

	helper "github.com/yunpeng1234/GovtechOA/backend/helper/auth"
	"github.com/yunpeng1234/GovtechOA/backend/model"
	"github.com/yunpeng1234/GovtechOA/backend/template"

	"github.com/gin-gonic/gin"
)

func Register(context *gin.Context) {
	var input template.AuthFormInput

	if err := context.ShouldBindJSON(&input); err != nil {
		fmt.Print(err)
		context.JSON(http.StatusBadRequest, gin.H{"error": "Bad Request"})
		return
	}

	user := model.User{
		Username: input.Username,
		Password: input.Password,
	}
	savedUser, err := user.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Unable to save user into system"})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"user": savedUser})
}

func Login(context *gin.Context) {
	var input template.AuthFormInput
	// body, _ := io.ReadAll(context.Request.Body)
	// println(string(body))
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Bad Request"})
		return
	}

	user, err := model.FindUserByUsername(input.Username)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Username does not exist"})
		return
	}

	err = user.ValidatePassword(input.Password)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Credentials"})
		return
	}

	jwt, err := helper.GenerateJWT(user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Error Generating JWT token"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"jwt": jwt})
}
