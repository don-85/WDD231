using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


// ⬇️ Your endpoint goes here
app.MapGet("/grade", (int gradePercentage) =>
{
    return Results.Ok($"You scored {gradePercentage}%");
});

// ⬆️ All endpoints should be added before this line
app.Run();
namespace JournalApp
{
    internal class Program
    {
        static void Main()
        {
            var journal = new Journal();
            var prompts = new PromptGenerator();

            Console.Clear();
            Console.WriteLine("=== Simple Journal ===\n");

            while (true)
            {
                ShowMenu();
                Console.Write("Select option: ");
                switch (Console.ReadLine())
                {
                    case "1":
                        WriteEntry(journal, prompts);
                        break;

                    case "2":
                        journal.DisplayAll();
                        break;

                    case "3":
                        journal.SaveToFile("journal.json");
                        break;

                    case "4":
                        journal.LoadFromFile("journal.json");
                        break;

                    case "0":
                        Console.WriteLine("Good-bye!");
                        return;

                    default:
                        Console.WriteLine("Invalid choice.\n");
                        break;
                }
            }
        }

        private static void ShowMenu()
        {
            Console.WriteLine("╔════════ Menu ════════╗");
            Console.WriteLine("║ 1) Write new entry   ║");
            Console.WriteLine("║ 2) Display entries   ║");
            Console.WriteLine("║ 3) Save to file      ║");
            Console.WriteLine("║ 4) Load from file    ║");
            Console.WriteLine("║ 0) Quit              ║");
            Console.WriteLine("╚══════════════════════╝");
        }

        private static void WriteEntry(Journal journal, PromptGenerator prompts)
        {
            string prompt = prompts.GetRandomPrompt();
            Console.WriteLine($"\nPrompt: {prompt}");
            Console.Write("> ");
            string? text = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(text))
            {
                Console.WriteLine("Empty entry discarded.\n");
                return;
            }

            journal.AddEntry(new Entry(prompt, text.Trim()));
            Console.WriteLine("Entry added!\n");
        }
    }
}
