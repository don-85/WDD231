[HttpGet]
public IActionResult Grade([FromQuery] int gradePercentage)
{
    return Ok($"Grade is: {gradePercentage}");
}
