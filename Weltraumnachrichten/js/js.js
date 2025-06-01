// erstellt eine vorschaukarte mit titel, gekürzter zusammenfassung und link
function erstelleKarte(artikel, maxZeichen = 100) {
  // container für die karte
  let karte = document.createElement('div');
  karte.className = 'vorschaukarte'; // css-klasse

  // titel der karte
  let titel = document.createElement('h3');
  titel.textContent = artikel.title;

  // zusammenfassung (gekürzt, wenn zu lang)
  let zusammenfassung = document.createElement('p');
  let text = artikel.summary;
  if (text.length > maxZeichen) {
    text = text.slice(0, maxZeichen) + '...';
  }
  zusammenfassung.textContent = text;

  // link zum artikel
  let link = document.createElement('a');
  link.href = artikel.url;
  link.textContent = 'mehr lesen';
  link.target = '_blank'; // öffnet in neuem tab

  // elemente zur karte hinzufügen
  karte.append(titel, zusammenfassung, link);

  return karte;
}


// lädt daten von der api und fügt karten in den container ein
function ladeDaten(typ, containerId, anzahl, maxZeichen) {
  fetch(`https://api.spaceflightnewsapi.net/v4/${typ}/?limit=${anzahl}`)
    .then(res => res.json())
    .then(daten => {
      let container = document.getElementById(containerId);
      if (!container) return; // abbruch, wenn container nicht existiert
      container.innerHTML = ''; // container leeren

      // für jeden eintrag eine karte erstellen und einfügen
      daten.results.forEach(artikel => {
        let karte = erstelleKarte(artikel, maxZeichen);
        container.append(karte);
      });
    })
    .catch(fehler => console.error(`fehler beim laden von ${typ}:`, fehler));
}

// beim laden der seite: entscheidet anhand der url, welche daten geladen werden
window.addEventListener('DOMContentLoaded', () => {
  let pfad = window.location.pathname;

  if (pfad === '/' || pfad.endsWith('index.html')) {
    ladeDaten('articles', 'articlesview', 3, 100); // 3 artikel auf startseite
    ladeDaten('blogs', 'blogsview', 3, 100); // 3 blogs auf startseite
  } else if (pfad.endsWith('articles.html')) {
    ladeDaten('articles', 'articleslist', 20, 150); // 20 artikel auf artikel-seite
  } else if (pfad.endsWith('blogs.html')) {
    ladeDaten('blogs', 'blogslist', 20, 150); // 20 blogs auf blog-seite
  }
});