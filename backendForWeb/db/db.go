package db

import (
	"github.com/rs/zerolog/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"sync"
	"webAitu/models"
)

var (
	db     *gorm.DB
	dbOnce sync.Once
)

func GetDBInstance() (*gorm.DB, error) {
	var err error
	dbOnce.Do(func() {
		dbConnString := "postgresql://postgres:1079@localhost:5432/webAitu?sslmode=disable"
		db, err = gorm.Open(postgres.Open(dbConnString), &gorm.Config{
			SkipDefaultTransaction: true,
		})
		if err != nil {
			log.Error().Err(err).Msg("Error connecting to database")
			return
		}
		db.AutoMigrate(&models.User{})
		log.Info().Msg("Connected to the database")
	})
	return db, err
}
