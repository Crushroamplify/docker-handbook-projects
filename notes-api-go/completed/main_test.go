package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthHandler(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()

	healthHandler(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	var body map[string]string
	json.NewDecoder(rec.Body).Decode(&body)

	if body["status"] != "ok" {
		t.Fatalf("expected status ok, got %s", body["status"])
	}
}

func TestNotesHandler_PostAndGet(t *testing.T) {
	// Reset global state
	notes = nil

	// POST a note
	note := Note{Title: "Test", Content: "Hello"}
	payload, _ := json.Marshal(note)
	req := httptest.NewRequest(http.MethodPost, "/notes", bytes.NewReader(payload))
	rec := httptest.NewRecorder()

	notesHandler(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d", rec.Code)
	}

	// GET notes
	req = httptest.NewRequest(http.MethodGet, "/notes", nil)
	rec = httptest.NewRecorder()

	notesHandler(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	var result []Note
	json.NewDecoder(rec.Body).Decode(&result)

	if len(result) != 1 {
		t.Fatalf("expected 1 note, got %d", len(result))
	}
	if result[0].Title != "Test" {
		t.Fatalf("expected title 'Test', got '%s'", result[0].Title)
	}
}
