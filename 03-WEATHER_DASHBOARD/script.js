const API_KEY = "YOUR_API_KEY_HERE";
const USING_DEMO_DATA = API_KEY === "YOUR_API_KEY_HERE";

const els = {
  form: document.getElementById('searchForm'),
  input: document.getElementById('cityInput'),
  errorMsg: document.getElementById('errorMsg'),
  errorText: document.getElementById('errorText'),
  loading: document.getElementById('loadingState'),
  loadingText: document.getElementById('loadingText'),
  content: document.getElementById('weatherContent'),
  body: document.getElementById('pageBody'),
  cityName: document.getElementById('cityName'),
  countryName: document.getElementById('countryName'),
  dateTime: document.getElementById('dateTime'),
  tempValue: document.getElementById('tempValue'),
  conditionLabel: document.getElementById('conditionLabel'),
  feelsLike: document.getElementById('feelsLike'),
  weatherDesc: document.getElementById('weatherDesc'),
  mainIcon: document.getElementById('mainIcon'),
  humidityVal: document.getElementById('humidityVal'),
  windVal: document.getElementById('windVal'),
  pressureVal: document.getElementById('pressureVal'),
  visibilityVal: document.getElementById('visibilityVal'),
  sunriseVal: document.getElementById('sunriseVal'),
  sunsetVal: document.getElementById('sunsetVal'),
  forecastRow: document.getElementById('forecastRow'),
  demoNote: document.getElementById('demoNote'),
};

// Map OpenWeatherMap "main" condition -> icon class + background state
const CONDITION_MAP = {
  Clear:        { icon: 'bi-sun-fill',            bg: 'bg-sunny',  label: 'Clear Sky' },
  Clouds:       { icon: 'bi-clouds-fill',          bg: 'bg-cloudy', label: 'Cloudy' },
  Rain:         { icon: 'bi-cloud-rain-fill',      bg: 'bg-rainy',  label: 'Rainy' },
  Drizzle:      { icon: 'bi-cloud-drizzle-fill',   bg: 'bg-rainy',  label: 'Drizzle' },
  Thunderstorm: { icon: 'bi-cloud-lightning-rain-fill', bg: 'bg-storm', label: 'Thunderstorm' },
  Snow:         { icon: 'bi-snow',                 bg: 'bg-snowy',  label: 'Snowy' },
  Mist:         { icon: 'bi-cloud-haze2-fill',     bg: 'bg-cloudy', label: 'Misty' },
  Fog:          { icon: 'bi-cloud-fog2-fill',      bg: 'bg-cloudy', label: 'Foggy' },
  Haze:         { icon: 'bi-cloud-haze2-fill',     bg: 'bg-cloudy', label: 'Hazy' },
};

function conditionInfo(main) {
  return CONDITION_MAP[main] || { icon: 'bi-cloud-sun-fill', bg: 'bg-default', label: main || 'Unknown' };
}

function setBackground(bgClass) {
  els.body.className = bgClass;
}

function formatTime(unixSeconds, tzOffsetSeconds = 0) {
  const d = new Date((unixSeconds + tzOffsetSeconds) * 1000);
  let h = d.getUTCHours();
  const m = d.getUTCMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function formatDateNow() {
  const now = new Date();
  return now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    + ' · ' + now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function showError(message) {
  els.errorText.textContent = message;
  els.errorMsg.classList.remove('d-none');
}

function clearError() {
  els.errorMsg.classList.add('d-none');
}

function showLoading(city) {
  els.loadingText.textContent = `Fetching weather for "${city}"…`;
  els.loading.classList.remove('d-none');
  els.content.classList.add('d-none');
}

function hideLoading() {
  els.loading.classList.add('d-none');
  els.content.classList.remove('d-none');
}

function renderCurrent(data) {
  const info = conditionInfo(data.condition);
  setBackground(info.bg);

  els.cityName.textContent = data.city;
  els.countryName.textContent = data.country ? `, ${data.country}` : '';
  els.dateTime.textContent = formatDateNow();
  els.tempValue.textContent = `${Math.round(data.temp)}°C`;
  els.conditionLabel.textContent = data.conditionLabel || info.label;
  els.feelsLike.textContent = `${Math.round(data.feelsLike)}°C`;
  els.weatherDesc.textContent = data.description;
  els.mainIcon.className = `bi weather-icon-lg ${info.icon}`;

  els.humidityVal.textContent = data.humidity;
  els.windVal.textContent = data.windSpeed;
  els.pressureVal.textContent = data.pressure;
  els.visibilityVal.textContent = data.visibility;
  els.sunriseVal.textContent = data.sunrise;
  els.sunsetVal.textContent = data.sunset;
}

function renderForecast(days) {
  els.forecastRow.innerHTML = '';
  days.forEach(day => {
    const info = conditionInfo(day.condition);
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="forecast-day">${day.day}</div>
      <i class="bi ${info.icon} forecast-icon"></i>
      <div class="forecast-temp">${Math.round(day.temp)}°C</div>
      <div class="forecast-cond">${day.conditionLabel || info.label}</div>
    `;
    els.forecastRow.appendChild(card);
  });
}

/* ---------------- Demo data (used when no API key is set) ---------------- */

function getDemoData(cityQuery) {
  const name = cityQuery ? cityQuery.trim() : 'New Delhi';
  return {
    current: {
      city: name.charAt(0).toUpperCase() + name.slice(1),
      country: 'IN',
      condition: 'Clear',
      conditionLabel: 'Clear Sky',
      temp: 28,
      feelsLike: 30,
      description: 'Clear skies with gentle winds, a pleasant day overall.',
      humidity: 54,
      windSpeed: 12,
      pressure: 1012,
      visibility: 10,
      sunrise: '6:12 AM',
      sunset: '6:47 PM',
    },
    forecast: [
      { day: 'Tomorrow', condition: 'Clouds', conditionLabel: 'Cloudy', temp: 27 },
      { day: 'Wednesday', condition: 'Rain', conditionLabel: 'Rainy', temp: 24 },
      { day: 'Thursday', condition: 'Rain', conditionLabel: 'Light Rain', temp: 23 },
      { day: 'Friday', condition: 'Clouds', conditionLabel: 'Cloudy', temp: 26 },
      { day: 'Saturday', condition: 'Clear', conditionLabel: 'Clear Sky', temp: 29 },
    ],
  };
}

/* ---------------- Real API calls (OpenWeatherMap) ---------------- */

async function fetchCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) throw new Error('City not found. Check the spelling and try again.');
    throw new Error('Something went wrong while fetching weather data.');
  }
  const data = await res.json();

  return {
    city: data.name,
    country: data.sys?.country || '',
    condition: data.weather[0].main,
    conditionLabel: data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase()),
    description: data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase()) + '.',
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s -> km/h
    pressure: data.main.pressure,
    visibility: (data.visibility / 1000).toFixed(1),
    sunrise: formatTime(data.sys.sunrise, data.timezone),
    sunset: formatTime(data.sys.sunset, data.timezone),
    coord: data.coord,
  };
}

async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Could not load the forecast.');
  const data = await res.json();

  // API returns data in 3-hour steps; take the entry closest to midday for each of the next 5 days
  const daily = {};
  data.list.forEach(entry => {
    const date = entry.dt_txt.split(' ')[0];
    const hour = entry.dt_txt.split(' ')[1];
    if (!daily[date] || hour === '12:00:00') {
      daily[date] = entry;
    }
  });

  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return Object.values(daily).slice(0, 5).map(entry => {
    const d = new Date(entry.dt_txt.replace(' ', 'T'));
    return {
      day: dayNames[d.getDay()],
      condition: entry.weather[0].main,
      conditionLabel: entry.weather[0].description.replace(/\b\w/g, c => c.toUpperCase()),
      temp: entry.main.temp,
    };
  });
}

/* ---------------- Main search flow ---------------- */

async function handleSearch(city) {
  clearError();
  showLoading(city);

  try {
    if (USING_DEMO_DATA) {
      // Simulate a short network delay so the loading state is visible
      await new Promise(r => setTimeout(r, 500));
      const demo = getDemoData(city);
      renderCurrent(demo.current);
      renderForecast(demo.forecast);
      els.demoNote.textContent = 'Showing demo data — add your OpenWeatherMap API key in the script to fetch live weather.';
    } else {
      const current = await fetchCurrentWeather(city);
      const forecast = await fetchForecast(city);
      renderCurrent(current);
      renderForecast(forecast);
      els.demoNote.textContent = '';
    }
  } catch (err) {
    showError(err.message || 'Unable to fetch weather right now.');
  } finally {
    hideLoading();
  }
}

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = els.input.value.trim();
  if (!city) {
    showError('Please enter a city name.');
    return;
  }
  handleSearch(city);
});

// Initial load: show a default city so the dashboard isn't empty
handleSearch('New Delhi');
