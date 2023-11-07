package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"net/http"
	"time"
	"webAitu/controllers"
	"webAitu/db"
	repo2 "webAitu/repo"
	"webAitu/routes"
)

func main() {
	dbIns, err := db.GetDBInstance()
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to initialize database")
	}
	repo, _ := repo2.NewUserRepository(dbIns)
	controller := controllers.NewUserController(*repo)
	r := routes.NewRoutes(*controller)
	router := gin.Default()
	r.SetupAPIRoutes(router)
	router.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"GET", "POST", "PUT", "DElETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type"},
		ExposeHeaders: []string{"Content-Length"},
		MaxAge:        12 * time.Hour,
	}))
	serverPort := "8080"
	server := &http.Server{
		Addr:         ":" + serverPort,
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}

	fmt.Printf("Server is running on port %s...\n", serverPort)

	if err := server.ListenAndServe(); err != nil {
		log.Fatal().Err(err).Msg("Server error")
	}
}
