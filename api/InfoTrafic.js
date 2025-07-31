// Fichier : /api/InfoTrafic.js

export default async function handler(request, response) {
  const twitterBearerToken = process.env.VITE_TWITTER_BEARER_TOKEN;
  const twitterUserId = "92128424"; // ID du compte @RERB

  if (!twitterBearerToken) {
    return response.status(500).json({ error: 'Token Twitter non configuré' });
  }

  const url = `https://api.twitter.com/2/users/${twitterUserId}/tweets`;
  const params = new URLSearchParams({
    'exclude': 'retweets,replies',
    'max_results': 5
  });

  try {
    const twitterResponse = await fetch(`${url}?${params}`, {
      headers: {
        'Authorization': `Bearer ${twitterBearerToken}`
      }
    });

    if (!twitterResponse.ok) {
      throw new Error(`Erreur API Twitter: ${twitterResponse.statusText}`);
    }

    const data = await twitterResponse.json();
    return response.status(200).json(data.data || []);

  } catch (error) {
    console.error("Erreur dans l'API InfoTrafic:", error);
    return response.status(500).json({ error: "Impossible de récupérer les tweets." });
  }
}