import { useState, useEffect } from "react"

function App() {

  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
    .then(res => res.json())
    .then(data => setPoliticians(data))
    .catch(error => console.log(error))
  }, []);

  console.log(politicians);

  return (
    
      <div>
        <h2>Lista Politici</h2>
        <div className="politicians-list">
          {politicians.map(politician => (
            <div className="card" key={politician.id}>
              <img src={politician.image} alt={politician.name}/>
              <h2>{politician.name}</h2>
              <p><strong>Posizione:</strong>{politician.position}</p>
              <p>{politician.biography}</p>
            </div>
          ))}

        </div>
      </div>
    
  )
}

export default App;

// Premessa: Stai costruendo una pagina per visualizzare una lista di politici. Tuttavia, vuoi evitare 
// calcoli inutili e ottimizzare la performance del tuo componente. Segui le milestone per migliorare 
// progressivamente il codice

//  Milestone 1: Recuperare e visualizzare i dati
// Effettua una chiamata API a
// http://localhost:3333/politicians

// Salva la risposta in uno stato React (useState).

// Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

// Nome (name)
// Immagine (image)
// Posizione (position)
// Breve biografia (biography)

// Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.