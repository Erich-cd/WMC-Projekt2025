// erstellt eine vorschaukarte mit titel, gekürzter zusammenfassung und link
function erstelleKarte(artikel, maxZeichen = 100) {
  let karte = document.createElement('div');
  karte.className = 'vorschaukarte';

  let titel = document.createElement('h3');
  titel.textContent = artikel.title;

  let zusammenfassung = document.createElement('p');
  let text = artikel.summary;
  if (text.length > maxZeichen) {
    text = text.slice(0, maxZeichen) + '...';
  }
  zusammenfassung.textContent = text;

  let link = document.createElement('a');
  link.href = artikel.url;
  link.textContent = 'mehr lesen';
  link.target = '_blank';

  karte.append(titel, zusammenfassung, link);
  return karte;
}

// aktualisiert die anzeige der karten basierend auf suche
function updateDisplay(daten, containerId, maxZeichen, suchbegriff = '') {
  let container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  let gefilterteDaten = daten.results.filter(artikel =>
    artikel.title.toLowerCase().includes(suchbegriff.toLowerCase())
  );

  if (gefilterteDaten.length === 0) {
    container.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
    return;
  }

  gefilterteDaten.forEach(artikel => {
    let karte = erstelleKarte(artikel, maxZeichen);
    container.append(karte);
  });
}

// lädt daten von der api und fügt suchfunktion hinzu
function ladeDaten(typ, containerId, anzahl, maxZeichen) {
  fetch(`https://api.spaceflightnewsapi.net/v4/${typ}/?limit=${anzahl}`)
    .then(res => res.json())
    .then(daten => {
      // anzeige der daten
      updateDisplay(daten, containerId, maxZeichen);

      // suchleiste finden und eventlistener 
      let searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.addEventListener('input', () => {
          updateDisplay(daten, containerId, maxZeichen, searchInput.value);
        });
      }
    })
    .catch(fehler => console.error(`fehler beim laden von ${typ}:`, fehler));
}

// beim laden der seite: entscheidet anhand der parameter, welche daten geladen werden
window.addEventListener('DOMContentLoaded', () => {
  let pfad = window.location.pathname;

  if (pfad === '/' || pfad.endsWith('index.html')) {
    ladeDaten('articles', 'articlesview', 3, 100);
    ladeDaten('blogs', 'blogsview', 3, 100);
  } else if (pfad.endsWith('articles.html')) {
    ladeDaten('articles', 'articleslist', 20, 150);
  } else if (pfad.endsWith('blogs.html')) {
    ladeDaten('blogs', 'blogslist', 20, 150);
  }
});