package controller

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"bou.ke/monkey"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	helper "github.com/yunpeng1234/GovtechOA/backend/helper/auth"
	"github.com/yunpeng1234/GovtechOA/backend/model"
)

func TestLogin(t *testing.T) {
	defer monkey.UnpatchAll()
	t.Run("Test Valid Register", func(t *testing.T) {
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		var fakeUser = &model.User{}

		c.Request = httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer([]byte(`{"username": "s", "password": "s"}`)))
		monkey.PatchInstanceMethod(reflect.TypeOf(fakeUser), "Save", func(_ *model.User) (*model.User, error) {
			return fakeUser, nil
		})

		Register(c)
		assert.Equal(t, w.Code, 201)
	})

	t.Run("Test Valid Login", func(t *testing.T) {
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		var fakeUser = &model.User{}

		c.Request = httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer([]byte(`{"username": "s", "password": "s"}`)))

		monkey.Patch(model.FindUserByUsername, func(_ string) (model.User, error) {
			return model.User{Username: "A", Password: "B"}, nil
		})

		monkey.PatchInstanceMethod(reflect.TypeOf(fakeUser), "ValidatePassword", func(_ *model.User, _ string) error {
			return nil
		})

		monkey.Patch(helper.GenerateJWT, func(_ model.User) (string, error) {
			return "SomeJWTToken", nil
		})

		Login(c)
		assert.Equal(t, w.Code, 200)
	})
}
