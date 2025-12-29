const clearAnimations = () => {
  document.querySelectorAll('.cloud, .star, .raindrop').forEach(el => el.remove());
};

const checkweather = async (name) => {
  const apiid = "483b227f6c0eab601687e313de59d0e6";
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiid}`;
  const res = await fetch(apiurl);
  const data = await res.json();

  const mainDiv = document.querySelector('.main');

  if (data.cod === 200) {
    document.querySelector('#err').style.display = 'none';
    document.querySelector('#country').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp - 273.15) + '°C';
    document.querySelector('#des').innerHTML = data.weather[0].description;
    document.querySelector('#humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('#wind').innerHTML = data.wind.speed + ' km/hr';

    const weather = data.weather[0].main.toLowerCase();
    const hour = new Date().getHours();

    // Clear old animations
    clearAnimations();

    if (weather.includes("rain")) {
      mainDiv.className = "main rain";
      createRain();
    } else if (hour >= 6 && hour < 18) {
      mainDiv.className = "main day";
      createClouds();   // ✅ Clouds always added in daytime
    } else {
      mainDiv.className = "main night";
      createStars();
    }
  } else {
    document.querySelector('#err').style.display = 'block';
    // document.querySelector('#err').innerHTML = 'Invalid city name';
    alert('Invalid City Name');
  }
};

document.querySelector('.inp button').addEventListener('click', () => {
  const location = document.querySelector('.inp input').value;
  if (location.trim() !== "") {
    checkweather(location);
  } else {
    document.querySelector('#err').style.display = 'block';
    document.querySelector('#err').innerHTML = 'Please enter a city name';
  }
});

/* Animations */
function createClouds() {
  const mainDiv = document.querySelector('.main');
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.classList.add('cloud');
    cloud.style.top = (i * 20 + 10) + 'vh';
    cloud.style.left = -200 + 'px'; // start off-screen
    mainDiv.appendChild(cloud);
  }
}

function createStars() {
  const mainDiv = document.querySelector('.main');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    mainDiv.appendChild(star);
  }
}

function createRain() {
  const mainDiv = document.querySelector('.main');
  for (let i = 0; i < 30; i++) {
    const drop = document.createElement('div');
    drop.classList.add('raindrop');
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDelay = Math.random() + 's';
    mainDiv.appendChild(drop);
  }
}
