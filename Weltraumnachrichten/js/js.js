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

