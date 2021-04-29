const API_KEY = "at_dljo5o9T1IQ3u3utin1qLLRPKomcc";
const button = document.querySelector("#buttonAction");
const myMap = L.map("mapid");

function setData(ip, address, postalCode, timezone, isp) {
  let ipView = document.getElementById("ipAddress");
  let addressView = document.getElementById("location");
  let timezoneView = document.getElementById("timezone");
  let ispView = document.getElementById("isp");

  ipView.textContent = ip;
  addressView.textContent = `${address}, ${postalCode}`;
  timezoneView.textContent = `UTC ${timezone}`;
  ispView.textContent = isp;
}

button.addEventListener("click", async () => {
  const ip = document.getElementById("ip").value;
  const datos = await fetchData(ip);
  setData(
    datos.ipAddress,
    datos.location,
    datos.postalCode,
    datos.timeZone,
    datos.isp
  );

  setLocation(datos.latitud, datos.longitud);
});

async function fetchData(ip) {
  const data = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`
  );
  const jsonData = await data.json();

  const orderData = {
    ipAddress: jsonData.ip,
    location: jsonData.location.city,
    postalCode: jsonData.location.postalCode,
    timeZone: jsonData.location.timezone,
    isp: jsonData.isp,
    latitud: jsonData.location.lat,
    longitud: jsonData.location.lng,
  };

  return orderData;
}

function setLocation(lat = 37.38605, long = -122.08385) {
  myMap.setView([lat, long], 15);

  let circle = L.circle([lat, long], {
    color: "red",
    fillColor: "#33B3FF",
    fillOpacity: 0.3,
    radius: 200,
  }).addTo(myMap);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWJubGFoYWQiLCJhIjoiY2tvMm1hdm9xMGl3YzJ1bHJ4ajh1N2NtbyJ9.6oiHZQe0tWuYHQ5axRgBlw",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiaWJubGFoYWQiLCJhIjoiY2tvMm1hdm9xMGl3YzJ1bHJ4ajh1N2NtbyJ9.6oiHZQe0tWuYHQ5axRgBlw",
    }
  ).addTo(myMap);
}

setLocation();
