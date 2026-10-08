import { useState, useEffect, useMemo, memo } from "react"

const PoliticianCard = memo(({name, image, position, biography}) => {
  console.log("Card");
  
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>Posizione:</strong>{position}</p>
      <p>{biography}</p>
    </div>
  );
});

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
            <PoliticianCard key={politician.id} {...politician} />
          ))}

        </div>
      </div>
    
  )
}

export default App;

// Milestone 3: Ottimizzare il rendering delle card con React.memo
// Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
// Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
// Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

// Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.