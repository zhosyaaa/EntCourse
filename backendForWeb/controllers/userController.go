package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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

func (uc *UserController) DeleteUser(context *gin.Context) {
	userID := context.Param("id")
	fmt.Println(userID)
	user, err := uc.userRepository.GetPersonByID(userID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user"})
		return
	}
	if err = uc.userRepository.DeleteUser(user); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Delete user failed"})
		return
	}
	context.JSON(http.StatusCreated, nil)
}

func (uc *UserController) UpdateUser(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	userID := context.Param("id")
	var updatedUser models.User
	parsedID, err := strconv.Atoi(userID)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	updatedUser.ID = uint(parsedID)
	if err := context.ShouldBindJSON(&updatedUser); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	user, err := uc.userRepository.UpdateUser(&updatedUser)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}
	context.JSON(http.StatusCreated, user)

}
