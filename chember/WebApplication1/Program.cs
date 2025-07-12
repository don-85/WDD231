var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (int gradePercentage) =>
{
    string letter = "";
    string sign = "";

    // Determine letter
    if (gradePercentage >= 90)
    {
        letter = "A";
    }
    else if (gradePercentage >= 80)
    {
        letter = "B";
    }
    else if (gradePercentage >= 70)
    {
        letter = "C";
    }
    else if (gradePercentage >= 60)
    {
        letter = "D";
    }
    else
    {
        letter = "F";
    }

    // Determine sign
    int lastDigit = gradePercentage % 10;

    if (letter != "A" && letter != "F")
    {
        if (lastDigit >= 7)
        {
            sign = "+";
        }
        else if (lastDigit < 3)
        {
            sign = "-";
        }
    }

    string message = $"Your grade is: {letter}{sign}";

    if (gradePercentage >= 70)
    {
        message += "\nCongratulations! You passed the course.";
    }
    else
    {
        message += "\nDon't give up! Keep working and you'll get it next time.";
    }

    return message;
});

app.Run();

