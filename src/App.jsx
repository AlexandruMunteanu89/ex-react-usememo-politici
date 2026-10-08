import { useState, useEffect, useMemo } from "react"

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
    .then(res => res.json())
    .then(data => setPoliticians(data))
    .catch(error => console.log(error))
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isInName = politician.name.toLowerCase().includes(search.toLocaleLowerCase());
      const isInBio = politician.biography.toLowerCase().includes(search.toLocaleLowerCase());
      
      return isInName || isInBio;
  });
  },[politicians, search]);

  return (
    
      <div>
        <h2>Lista Politici</h2>
        <input
          type="text"
          placeholder='Cerca per nome o biografia'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="politicians-list">
          {filteredPoliticians.map(politician => (
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

// Milestone 2: Implementare la ricerca ottimizzata
// Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
// Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
// ❌ Non usare useEffect per aggiornare l’array filtrato.

// Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.