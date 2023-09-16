package main

import (
	"fmt"
	"log"
	"url_shortener/controller"
	"url_shortener/database"
	"url_shortener/middleware"
	"url_shortener/model"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDatabase()
	serveApplication()
}

func loadEnv() {
	err := godotenv.Load(".env.local")
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

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
	protectedRoutes.Use(middleware.JWTAuthMiddleware())
	protectedRoutes.POST("/url", controller.AddURL)
	protectedRoutes.GET("/url", controller.GetAllUrl)
	protectedRoutes.DELETE("/url", controller.DeleteUrl)

	router.Run(":8000")
	fmt.Println("Server running on port 8000")
}