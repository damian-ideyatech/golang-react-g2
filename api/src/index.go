package main

import (
	sql "database/sql"
	fmt "fmt"
	log "log"
	http "net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"

	config "monstarlab.org/mr-clean/config"
	LoginController "monstarlab.org/mr-clean/controller/login"
	TestController "monstarlab.org/mr-clean/controller/test"
	LoginRepository "monstarlab.org/mr-clean/repository/login"
)

var db *sql.DB
var logger *log.Logger

func initializeLogger() {
	logger = log.New(os.Stdout, "", log.LstdFlags|log.Lshortfile)
}

func initializeDatabase() {
	var err error

	dataSource := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", config.DatabaseUser, config.DatabasePass,
		config.DatabaseURL, config.DatabasePort, config.DatabaseSchema)

	db, err = sql.Open("mysql", dataSource)
	if err != nil {
		log.Fatal(err)
	}
}

func initializeWebServer() {
	serverURL := fmt.Sprintf("%s:%d", config.APIURL, config.APIPort)
	logMessage := fmt.Sprintf("Starting server at %s...", serverURL)

	logger.Println(logMessage)
	http.ListenAndServe(serverURL, nil)
}

func initializeControllers() {
	LoginController.Initialize(logger)
	TestController.Initialize(logger)
}

func initializeRepositories() {
	LoginRepository.Initialize(logger, db)
}

func main() {
	initializeLogger()
	initializeDatabase()
	initializeControllers()
	initializeRepositories()
	initializeWebServer()
}
