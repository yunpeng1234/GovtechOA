package middleware

import (
	"fmt"
	"net/http"
	helper "url_shortener/helper/auth"

	"github.com/gin-gonic/gin"
)

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		err := helper.ValidateJWT(context)
		if err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
			fmt.Println(err)
			context.Abort()
			return
		}
		context.Next()
	}
}
