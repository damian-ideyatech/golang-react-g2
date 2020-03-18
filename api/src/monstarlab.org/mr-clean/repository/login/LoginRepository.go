package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB
var logger *log.Logger
var insertStatement *sql.Stmt

// User is the object representing a User entity
type User struct {
	ID       string
	Name     string
	Email    string
	Password string
}

// UserProjection is the object representing a User DTO
type UserProjection struct {
	ID    string
	Name  string
	Email string
}

// Initialize initializes this LoginRepository instance.
func Initialize(log *log.Logger, database *sql.DB) error {
	db = database
	logger = log

	err := db.Ping()
	if err != nil {
		return err
	}

	insertStatement, err = db.Prepare("INSERT INTO users(id, name, email, password) VALUES(?, ?, ?, ?)")
	if err != nil {
		return err
	}

	return nil
}

// RegisterUser registers a user.
func RegisterUser(name string, email string, password string) (User, error) {
	var user User
	var logMessage string

	// Check if user with inputted email already exists.
	users, err := GetUsers()
	if err != nil {
		logMessage = fmt.Sprintf("User list cannot be retrieved.")
		logger.Println(logMessage)

		return user, err
	}

	for _, u := range users {
		if u.Email == email {
			logMessage = fmt.Sprintf("User with email %s already exists.", email)
			logger.Println(logMessage)

			return user, errors.New(logMessage)
		}
	}

	// Hash the inputted password.
	typedPassword := []byte(password)
	hashedPassword, err := bcrypt.GenerateFromPassword(typedPassword, bcrypt.DefaultCost)
	if err != nil {
		logMessage = fmt.Sprintf("User password cannot be encrypted.")
		logger.Println(logMessage)

		return user, err
	}

	// Create user entity.
	user = User{
		ID:       uuid.New().String(),
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}

	// Insert to SQL database
	res, err := insertStatement.Exec(user.ID, user.Name, user.Email, user.Password)
	if err != nil {
		logMessage = fmt.Sprintf("User entity cannot be saved in the database.")
		logger.Println(logMessage)

		return user, err
	}

	lastID, err := res.LastInsertId()
	if err != nil {
		logMessage = fmt.Sprintf("User database ID cannot be retrieved.")
		logger.Println(logMessage)

		return user, err
	}

	logMessage = fmt.Sprintf("Successfully inserted %s with ID %d", user.Email, lastID)
	logger.Println(logMessage)

	return user, nil
}

// LoginUser logs in a user with a specified password.
func LoginUser(email string, password string) (User, error) {
	var user User
	var logMessage string

	// Check if user with inputted email already exists.
	users, err := GetUsers()
	if err != nil {
		logMessage = fmt.Sprintf("User list cannot be retrieved.")
		logger.Println(logMessage)

		return user, err
	}

	for _, u := range users {
		if u.Email == email {
			hashedPassword := []byte(u.Password)
			typedPassword := []byte(password)
			err := bcrypt.CompareHashAndPassword(hashedPassword, typedPassword)
			if err == nil {
				logMessage = fmt.Sprintf("Successfully found user %s", u.Email)
				logger.Println(logMessage)

				return u, nil
			}

			logger.Println(err)
		}
	}

	logMessage = fmt.Sprintf("Incorrect email/password")
	logger.Println(logMessage)

	return user, errors.New(logMessage)
}

// GetUsers gets all the users in the database.
func GetUsers() ([]User, error) {
	var users []User

	rows, err := db.Query("SELECT id, name, email, password FROM users")
	if err != nil {
		return users, err
	}

	defer rows.Close()
	for rows.Next() {
		var user User

		err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Password)
		if err != nil {
			return users, err
		}

		users = append(users, user)
	}

	err = rows.Err()
	if err != nil {
		return users, err
	}

	return users, nil
}

// GetUserProjection returns a projection of the user.
func GetUserProjection(user *User) UserProjection {
	projection := UserProjection{
		ID:    (*user).ID,
		Name:  (*user).Name,
		Email: (*user).Email,
	}

	return projection
}

// GetUserProjections gets only the public fields of all users.
func GetUserProjections(users *[]User) []UserProjection {
	var projections []UserProjection

	for _, user := range *users {
		projection := GetUserProjection(&user)
		projections = append(projections, projection)
	}

	return projections
}
