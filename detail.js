async function getStats() {
    const allTypes = ["normal", "fire", "water", "electric", "grass", "psychic"]; // Example, use the full list for real implementation
    const statsContainer = document.querySelector("#type-stats tbody");
    
    for (let type of allTypes) {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      
      const pokemonData = await Promise.all(data.pokemon.map(p => fetch(p.pokemon.url).then(r => r.json())));
      
      const avgBaseExperience = pokemonData.reduce((sum, p) => sum + p.base_experience, 0) / pokemonData.length;
      
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${type}</td>
        <td>${avgBaseExperience.toFixed(2)}</td>
      `;
      statsContainer.appendChild(row);
    }
  }
  
  getStats();
  
