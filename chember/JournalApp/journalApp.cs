using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace JournalApp
{
    // ---------- Entry ----------
    public class Entry
    {
        private string _date;
        private string _promptText;
        private string _entryText;

        public Entry(string prompt, string entryText)
        {
            _date       = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
            _promptText = prompt;
            _entryText  = entryText;
        }

        public void Display()
        {
            Console.WriteLine($"{_date} — {_promptText}");
            Console.WriteLine($"   {_entryText}\n");
        }
    }

    // ---------- PromptGenerator ----------
    public class PromptGenerator
    {
        private readonly List<string> _prompts = new()
        {
            "What was the highlight of your day?",
            "Something new you learned today:",
            "Describe a challenge you overcame recently:",
            "What are you grateful for right now?"
        };

        private readonly Random _rng = new();
        public string GetRandomPrompt() => _prompts[_rng.Next(_prompts.Count)];
    }

    // ---------- Journal ----------
    public class Journal
    {
        private readonly List<Entry> _entries = new();
        public void AddEntry(Entry e) => _entries.Add(e);
        public void DisplayAll()
        {
            Console.WriteLine("\n⎯⎯⎯ Journal Entries ⎯⎯⎯\n");
            foreach (var e in _entries) e.Display();
        }
        public void SaveToFile(string file)
        {
            File.WriteAllText(file, JsonSerializer.Serialize(_entries));
            Console.WriteLine($"Saved to {file}");
        }
        public void LoadFromFile(string file)
        {
            if (!File.Exists(file)) { Console.WriteLine("File not found."); return; }
            var list = JsonSerializer.Deserialize<List<Entry>>(File.ReadAllText(file));
            if (list is not null) _entries.AddRange(list);
            Console.WriteLine($"Loaded {list?.Count ?? 0} entries.");
        }
    }

    // ---------- Main ----------
    class Program
    {
        static void Main()
        {
            var journal  = new Journal();
            var prompts  = new PromptGenerator();

            Console.WriteLine("=== Simple Journal ===\n");
            while (true)
            {
                Console.WriteLine("1) Write  2) Display  3) Save  4) Load  0) Quit");
                Console.Write("Select: ");
                switch (Console.ReadLine())
                {
                    case "1":
                        string prompt = prompts.GetRandomPrompt();
                        Console.WriteLine($"\nPrompt: {prompt}");
                        Console.Write("> ");
                        string text = Console.ReadLine() ?? "";
                        if (!string.IsNullOrWhiteSpace(text))
                            journal.AddEntry(new Entry(prompt, text));
                        break;
                    case "2": journal.DisplayAll(); break;
                    case "3": journal.SaveToFile("journal.json"); break;
                    case "4": journal.LoadFromFile("journal.json"); break;
                    case "0": return;
                    default : Console.WriteLine("Invalid choice\n"); break;
                }
            }
        }
    }
}
