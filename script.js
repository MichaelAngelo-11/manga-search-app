async function searchManga() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (!query) {
      resultsDiv.innerHTML = '<p>Please enter a manga title.</p>';
      return;
    }
  
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${query}&limit=5`);
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
  
      if (data.data.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
      }
  
      data.data.forEach(manga => {
        const card = document.createElement('div');
        card.classList.add('card', 'clearfix');
  
        card.innerHTML = `
          <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
          <h3>${manga.title}</h3>
          <p><strong>Score:</strong> ${manga.score || 'N/A'}</p>
          <p>${manga.synopsis || 'No synopsis available.'}</p>
        `;
  
        resultsDiv.appendChild(card);
      });
    } catch (error) {
      console.error(error);
      resultsDiv.innerHTML = '<p>Failed to fetch manga data. Please try again later.</p>';
    }
  }
  