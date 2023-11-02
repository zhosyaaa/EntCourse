package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email       string
	Fullname    string
	PhoneNumber string
	Password    string
}
