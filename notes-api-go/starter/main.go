package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
)

type Note struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

var (
	notes []Note
	mu    sync.Mutex
)

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func notesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		mu.Lock()
		defer mu.Unlock()

		w.Header().Set("Content-Type", "application/json")
		if notes == nil {
			notes = []Note{}
		}
		json.NewEncoder(w).Encode(notes)

	case http.MethodPost:
		var note Note
		if err := json.NewDecoder(r.Body).Decode(&note); err != nil {
			http.Error(w, `{"error": "invalid JSON"}`, http.StatusBadRequest)
			return
		}

		mu.Lock()
		notes = append(notes, note)
		mu.Unlock()

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(note)

	default:
		http.Error(w, `{"error": "method not allowed"}`, http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/notes", notesHandler)

	log.Println("server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
