package routes

import (
	"github.com/gin-gonic/gin"
	"webAitu/controllers"
)

type Routes struct {
	controller controllers.UserController
}

func NewRoutes(controller controllers.UserController) *Routes {
	return &Routes{controller: controller}
}

func (r *Routes) SetupAPIRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.GET("/users", r.controller.GetPersons)
		api.POST("/register", r.controller.CreatePerson)
		api.POST("/login", r.controller.Login)
		api.PUT("/update/:id", r.controller.UpdateUser)
		api.DELETE("delete/:id", r.controller.DeleteUser)
	}
}
