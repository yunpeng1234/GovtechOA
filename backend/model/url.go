package model

import (
	"url_shortener/database"

	"gorm.io/gorm"
)

type URLMapping struct {
	gorm.Model
	OriginalURL  string `gorm:"type:text" json:"originalURL"`
	ShortenedURL string `gorm:"type:text" json:"shortenURL"`
	UserID       uint
}

func (urlMapping *URLMapping) Save() (*URLMapping, error) {

	err := database.Database.Create(&urlMapping).Error
	if err != nil {
		return &URLMapping{}, err
	}
	return urlMapping, nil
}

func (urlMapping *URLMapping) Delete() (*URLMapping, error) {

	err := database.Database.Delete(&urlMapping).Error
	if err != nil {
		return &URLMapping{}, err
	}
	return urlMapping, nil
}
