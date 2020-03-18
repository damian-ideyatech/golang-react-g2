package login

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	LoginRepository "monstarlab.org/mr-clean/repository/login"
)

// LoginForm is the entity for login forms.
type LoginForm struct {
	Email    string
	Password string
}

// RegisterForm is the entity for registration forms.
type RegisterForm struct {
	Name            string
	Email           string
	Password        string
	ConfirmPassword string
}

var logger *log.Logger

// Initialize initializes the handlers for the login module.
func Initialize(log *log.Logger) {
	logger = log

	logger.Println("Initializing handlers for LoginController...")

	http.HandleFunc("/api/v1/login", loginHandler)
	http.HandleFunc("/api/v1/register", registerHandler)
	http.HandleFunc("/api/v1/users", getUserHandler)
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
	var logMessage string

	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	users, err := LoginRepository.GetUsers()
	if err != nil {
		logger.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	logMessage = fmt.Sprintf("Successfully retrieved list of users")
	logger.Println(logMessage)

	w.Header().Set("Content-Type", "application/json")
	userProjections := LoginRepository.GetUserProjections(&users)
	json.NewEncoder(w).Encode(userProjections)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var form LoginForm
	var logMessage string

	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		logMessage = fmt.Sprintf("Request body cannot be deserialized.")
		logger.Println(err)
		http.Error(w, logMessage, http.StatusBadRequest)
		return
	}

	user, err := LoginRepository.LoginUser(form.Email, form.Password)
	if err != nil {
		logger.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	logMessage = fmt.Sprintf("Successfully logged in %s", user.Email)
	logger.Println(logMessage)

	w.Header().Set("Content-Type", "application/json")
	userProjection := LoginRepository.GetUserProjection(&user)
	json.NewEncoder(w).Encode(userProjection)
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var form RegisterForm
	var logMessage string

	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		logger.Println(err)

		logMessage = fmt.Sprintf("Request body cannot be deserialized.")
		http.Error(w, logMessage, http.StatusBadRequest)
		return
	}

	if form.Password != form.ConfirmPassword {
		logMessage = fmt.Sprintf("Password and confirm password does not match.")
		logger.Println(logMessage)
		http.Error(w, logMessage, http.StatusBadRequest)
		return
	}

	user, err := LoginRepository.RegisterUser(form.Name, form.Email, form.Password)
	if err != nil {
		logger.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	logMessage = fmt.Sprintf("Successfully registered %s", user.Name)
	logger.Println(logMessage)

	w.Header().Set("Content-Type", "application/json")
	userProjection := LoginRepository.GetUserProjection(&user)
	json.NewEncoder(w).Encode(userProjection)
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
