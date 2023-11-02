package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"webAitu/models"
	"webAitu/repo"
)

type UserController struct {
	userRepository repo.UserRepository
}

func NewUserController(userRepository repo.UserRepository) *UserController {
	return &UserController{userRepository: userRepository}
}

func (uc *UserController) GetPersons(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	users, err := uc.userRepository.GetAllPersons()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}
	c.JSON(http.StatusOK, users)
}

func (uc *UserController) CreatePerson(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	fmt.Println("this ", user.Fullname, user.Password, user.PhoneNumber)
	if err := uc.userRepository.CreatePerson(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

func (uc *UserController) Login(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	var loginRequest struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	user, err := uc.userRepository.GetPersonByEmail(loginRequest.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user"})
		return
	}
	if user != nil && user.Password == loginRequest.Password {
		fmt.Println("correct request: ", user.Email, user.Password)
		c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
	}
}
