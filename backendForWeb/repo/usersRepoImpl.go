package repo

import (
	"gorm.io/gorm"
	"webAitu/models"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) (*UserRepository, error) {
	return &UserRepository{db: db}, nil
}

func (ur *UserRepository) GetAllPersons() ([]models.User, error) {
	var users []models.User
	if err := ur.db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (ur *UserRepository) GetPersonByID(id uint) (*models.User, error) {
	var user models.User
	if err := ur.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (ur *UserRepository) CreatePerson(person *models.User) error {
	return ur.db.Create(person).Error
}

func (ur *UserRepository) GetPersonByEmail(email string) (*models.User, error) {
	var user models.User
	if err := ur.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
