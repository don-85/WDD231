using System;
using System.Collections.Generic;

namespace JournalApp
{
    /// <summary>
    /// Supplies random writing prompts.
    /// </summary>
    public class PromptGenerator
    {
        private readonly List<string> _prompts = new()
        {
            "What was the highlight of your day?",
            "Something new you learned today:",
            "Describe a challenge you overcame recently:",
            "What are you grateful for right now?",
            "Write about a goal you’re currently pursuing:"
        };

        private readonly Random _rng = new();

        public string GetRandomPrompt()
            => _prompts[_rng.Next(_prompts.Count)];
    }
}
