<!-- ────── KAMPALA WEATHER SCRIPT (async/await, no API key) ────── -->
<script>
(async function loadKampalaWeather() {
  const lat = 0.3476, lon = 32.5825;                         // Kampala
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
              `&current=temperature_2m,weather_code,relative_humidity_2m` +
              `&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset` +
              `&timezone=Africa%2FKampala`;

  /* weather-code ➜ text */
  const WMO = {
    0:"Clear",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",
    45:"Fog",48:"Rime fog",51:"Light drizzle",53:"Drizzle",55:"Heavy drizzle",
    61:"Light rain",63:"Rain",65:"Heavy rain",71:"Light snow",
    80:"Rain showers",95:"Thunderstorm"
  };

  /* weather-code ➜ simple PNG icon (free set) */
  const iconSrc = code =>
    `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/${code}.png`;

  try {
    const res  = await fetch(url);
    if (!res.ok) throw new Error("Weather request failed");
    const data = await res.json();

    /* ----- current conditions ----- */
    const cur  = data.current;
    const day  = data.daily;

    document.getElementById("temp-now").textContent =
      `${Math.round(cur.temperature_2m)} °C`;

    const img = document.getElementById("weather-icon");
    img.src = iconSrc(cur.weather_code);
    img.alt = WMO[cur.weather_code] || "Weather icon";

    document.getElementById("current-details").innerHTML = `
      <li>${WMO[cur.weather_code] || "—"}</li>
      <li>High: ${Math.round(day.temperature_2m_max[0])} °C</li>
      <li>Low:  ${Math.round(day.temperature_2m_min[0])} °C</li>
      <li>Humidity: ${cur.relative_humidity_2m}%</li>
      <li>Sunrise: ${day.sunrise[0].split("T")[1].slice(0,5)}</li>
      <li>Sunset:  ${day.sunset[0].split("T")[1].slice(0,5)}</li>
    `;

    /* ----- 3-day forecast ----- */
    const names = ["Today","Tomorrow",
      new Date(day.time[2]).toLocaleDateString("en-US",{weekday:"short"})];

    const fcHTML = [0,1,2].map(i =>
      `<li>${names[i]}: <strong>${Math.round(
        day.temperature_2m_max[i])} °C</strong></li>`).join("");

    document.getElementById("forecast-list").innerHTML = fcHTML;

  } catch (err) {
    console.error(err);
    document.getElementById("weather-current").innerHTML =
      "<p>Weather data unavailable.</p>";
  }
})();
</script>
