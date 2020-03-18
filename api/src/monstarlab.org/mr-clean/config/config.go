package config

// APIURL is the url of the web service
var APIURL string = "127.0.0.1"

// APIPort is the port number used by the web service.
var APIPort int = 8000

// DatabaseUser is the username to the SQL database
var DatabaseUser string = "root"

// DatabasePass is the password of the user connecting to the SQL database
var DatabasePass string = "pass"

// DatabaseURL is the url of the SQL database
var DatabaseURL string = "127.0.0.1"

// DatabasePort is the port number used by the SQL database
var DatabasePort int32 = 3306

// DatabaseSchema is the database name to connect to
var DatabaseSchema string = "mr-clean"

func main() {
	// Intentionally left blank
}
