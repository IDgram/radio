// Informations de Google Sheets
const sheetID = '1xkd0EeZieoVautiYl3BI7OB7sG4orjYD_2czPSZLQ2M'; // L'ID de ta feuille
const apiKey = 'AIzaSyA1wqmdgawYs6myBAQLLpncEaSbPccsguI'; // Ta clé API
const range = 'radio_stations!A1:F1000'; // Plage de cellules

// URL de l'API Google Sheets pour récupérer les données
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// Sélection de l'élément HTML pour les stations de radio
const radioContainer = document.querySelector('.station-list-inner');

// Fonction pour afficher les stations de radio
function displayRadioStations(data) {
  const stations = data.values.slice(1); // Ignorer la première ligne (en-têtes)

  stations.forEach(station => {
    const [nom, pays, genre, urlFlux, frequence, logo] = station;

    // Créer un élément pour chaque station
    const stationItem = document.createElement('div');
    stationItem.className = 'station-item';
    stationItem.dataset.freq = frequence;
    stationItem.dataset.name = nom;

    // Contenu de chaque station
    stationItem.innerHTML = `
      <img src="${logo}" alt="Logo de ${nom}" class="station-logo">
      <div class="station-info">
        <span class="station-name">${nom}</span>
        <span class="station-freq">${frequence}</span>
        <span class="station-country">${pays}</span>
        <span class="station-genre">${genre}</span>
      </div>
      <button class="play-button">▶</button>
      <audio src="${urlFlux}"></audio>
    `;

    radioContainer.appendChild(stationItem);
  });
}

// Fonction pour récupérer les données depuis Google Sheets
async function fetchRadioData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Erreur lors de la récupération des données');

    const data = await response.json();
    displayRadioStations(data);
  } catch (error) {
    console.error('Erreur :', error);
    radioContainer.innerHTML = "<p>Impossible de récupérer les stations de radio.</p>";
  }
}

// Appeler la fonction pour récupérer les données et les afficher
fetchRadioData();
