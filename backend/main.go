package main

import (
	"fmt"
	"log"

	"github.com/yunpeng1234/GovtechOA/backend/controller"
	"github.com/yunpeng1234/GovtechOA/backend/database"
	"github.com/yunpeng1234/GovtechOA/backend/middleware"
	"github.com/yunpeng1234/GovtechOA/backend/model"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDatabase()
	serveApplication()
}

func loadEnv() {
	err := godotenv.Load("backend/.env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&model.User{})
	database.Database.AutoMigrate(&model.URLMapping{})
}

func serveApplication() {
	router := gin.Default()
	// same as
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AddAllowHeaders("Authorization")
	router.Use(cors.New(config))
	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
	protectedRoutes.Use(middleware.JWTAuthMiddleware())
	protectedRoutes.POST("/url", controller.AddURL)
	protectedRoutes.GET("/url", controller.GetAllUrl)
	protectedRoutes.DELETE("/url", controller.DeleteUrl)

	router.Run("localhost:8000")
	fmt.Println("Server running on port 8000")
}
