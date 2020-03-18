package test

import (
	"fmt"
	"log"
	"net/http"
)

var logger *log.Logger

// Initialize initializes the handlers for testing endpoints.
func Initialize(log *log.Logger) {
	logger = log

	logger.Println("Initializing handlers for TestController...")
	http.HandleFunc("/api/v2/login", testHandler)
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, "OK")
		return
	}

	fmt.Fprintf(w, "URL.Path = %q\n", r.URL.Path)
	logger.Printf("URL.Path = %q\n", r.URL.Path)

	fmt.Fprintf(w, "5s %s %s\n", r.Method, r.URL, r.Proto)
	logger.Printf("5s %s %s\n", r.Method, r.URL, r.Proto)

	for k, v := range r.Header {
		fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
		logger.Printf("Header[%q] = %q\n", k, v)
	}

	fmt.Fprintf(w, "Host = %q\n", r.Host)
	logger.Printf("Host = %q\n", r.Host)

	fmt.Fprintf(w, "RemoteAddr = %q\n", r.RemoteAddr)
	logger.Printf("RemoteAddr = %q\n", r.RemoteAddr)
}
