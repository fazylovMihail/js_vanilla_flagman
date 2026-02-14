export default function initCitySelect(city, { locationSubLinks, locationCity, locationCityName }) {
  if (city) locationCityName.textContent = city;

  locationCity.addEventListener('click', () => {
    locationCity.classList.toggle('location__city--active');
  });

  locationSubLinks.forEach(link => {
    link.addEventListener('click', () => {
      city = link.textContent;
      locationCityName.textContent = city;

      localStorage.setItem('city', JSON.stringify(city));
      locationCity.classList.remove('location__city--active');
    });
  });
}