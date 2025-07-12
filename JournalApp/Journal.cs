using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace JournalApp
{
    /// <summary>
    /// Holds multiple entries and handles persistence.
    /// </summary>
    public class Journal
    {
        private readonly List<Entry> _entries = new();

        public void AddEntry(Entry e)       => _entries.Add(e);

        public void DisplayAll()
        {
            if (_entries.Count == 0)
            {
                Console.WriteLine("\n(No entries yet)\n");
                return;
            }

            Console.WriteLine("\n⎯⎯⎯ Journal Entries ⎯⎯⎯\n");
            foreach (Entry e in _entries) e.Display();
        }

        public void SaveToFile(string filePath)
        {
            File.WriteAllText(filePath, JsonSerializer.Serialize(_entries,
                new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"Saved { _entries.Count } entries to {filePath}\n");
        }

        public void LoadFromFile(string filePath)
        {
            if (!File.Exists(filePath))
            {
                Console.WriteLine("File not found.\n");
                return;
            }

            var list = JsonSerializer.Deserialize<List<Entry>>(File.ReadAllText(filePath));
            if (list is { Count: > 0 })
            {
                _entries.Clear();
                _entries.AddRange(list);
                Console.WriteLine($"Loaded {list.Count} entries.\n");
            }
            else
            {
                Console.WriteLine("No entries found in file.\n");
            }
        }
    }
}
