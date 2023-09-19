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

func TestURL(t *testing.T) {
	defer monkey.UnpatchAll()
	t.Run("Test Save URL", func(t *testing.T) {
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		c.Request = httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer([]byte(`{"originalURL": "s", "shortenURL": "s"}`)))
		monkey.Patch(helper.CurrentUser, func(_ *gin.Context) (model.User, error) {
			return model.User{}, nil
		})
		var fakeInput = &model.URLMapping{}

		monkey.PatchInstanceMethod(reflect.TypeOf(fakeInput), "Save", func(_ *model.URLMapping) (*model.URLMapping, error) {
			return fakeInput, nil
		})
		AddURL(c)
		assert.Equal(t, w.Code, 201)
	})

	t.Run("Test Get All URL", func(t *testing.T) {
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		c.Request = httptest.NewRequest(http.MethodGet, "/", bytes.NewBuffer([]byte(``)))
		monkey.Patch(helper.CurrentUser, func(_ *gin.Context) (model.User, error) {
			return model.User{URLMappings: []model.URLMapping{}}, nil
		})
		GetAllUrl(c)
		assert.Equal(t, w.Code, 200)
	})
}
