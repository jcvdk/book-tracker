"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function BookTracker() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", date: "" });

  useEffect(() => {
    const stored = localStorage.getItem("books");
    if (stored) setBooks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = () => {
    if (!newBook.title || !newBook.date) return;
    const updated = [...books, newBook];
    updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    setBooks(updated);
    setNewBook({ title: "", author: "", date: "" });
  };

  const removeBook = (index) => {
    const updated = books.filter((_, i) => i !== index);
    updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    setBooks(updated);
  };

  const upcomingBooks = books.filter(
    (book) => new Date(book.date) >= new Date().setHours(0, 0, 0, 0)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white shadow-md rounded-2xl p-4 space-y-2">
        <h2 className="text-lg font-bold">Nieuw boek toevoegen</h2>
        <input
          type="text"
          placeholder="Titel"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="w-full border rounded-xl p-2"
        />
        <input
          type="text"
          placeholder="Auteur"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="w-full border rounded-xl p-2"
        />
        <input
          type="date"
          value={newBook.date}
          onChange={(e) => setNewBook({ ...newBook, date: e.target.value })}
          className="w-full border rounded-xl p-2"
        />
        <Button onClick={addBook} className="flex gap-2 mt-2">
          <Plus size={18} /> Voeg toe
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">📚 Aankomende releases</h2>
        {upcomingBooks.length === 0 ? (
          <p className="text-gray-600">Geen aankomende boeken.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {upcomingBooks.map((book, i) => (
              <Card key={i} className="rounded-2xl shadow-md">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold">{book.title}</h2>
                  <p className="text-gray-600">{book.author}</p>
                  <p className="mt-2">📅 {book.date}</p>
                  <Button
                    onClick={() => removeBook(i)}
                    variant="destructive"
                    className="mt-4 flex gap-2"
                  >
                    <Trash2 size={18} /> Verwijder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}