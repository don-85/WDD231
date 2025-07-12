using System;

namespace JournalApp
{
    /// <summary>
    /// Represents a single journal entry (date, prompt, user’s text).
    /// </summary>
    public class Entry
    {
        private readonly string _date;
        private readonly string _promptText;
        private readonly string _entryText;

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

        // optional read-only properties
        public string Date       => _date;
        public string PromptText => _promptText;
        public string EntryText  => _entryText;
    }
}
