// Fichier : /api/Passage_Palaiseau.js

export default async function handler(request, response) {
  // Constantes pour Palaiseau -> Nord
  const arretId = "STIF:StopArea:SP:63175:";
  const destinationsFiltre = [
    "Aéroport Charles de Gaulle 2 TGV", "Mitry - Claye"
  ];
  const apiKey = process.env.VITE_IDFM_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'Clé API non configurée' });
  }

  const apiUrl = `https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=${arretId}&LineRef=STIF:Line::C01743:`;

  try {
    const apiResponse = await fetch(apiUrl, {
      headers: { 'apikey': apiKey }
    });

    if (!apiResponse.ok) {
      throw new Error(`Erreur API IDFM: ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();
    const nowUtc = new Date();
    let passagesFiltres = [];

    const visites = data.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit || [];

    for (const visite of visites) {
      const journey = visite.MonitoredVehicleJourney;
      const destination = journey?.DestinationName?.[0]?.value;
      const etaStr = journey?.MonitoredCall?.ExpectedArrivalTime;

      if (etaStr && destinationsFiltre.includes(destination)) {
        const eta = new Date(etaStr);
        if (eta > nowUtc) {
          const attenteMinutes = Math.floor((eta - nowUtc) / 60000);
          passagesFiltres.push({
            destination: destination,
            attente: `${attenteMinutes}`,
            eta: eta // Garder pour le tri
          });
        }
      }
    }
    
    // Trier par heure d'arrivée et ne garder que les 4 prochains
    const passagesFormates = passagesFiltres
      .sort((a, b) => a.eta - b.eta)
      .slice(0, 4)
      .map(({ destination, attente }) => ({ destination, attente }));

    return response.status(200).json({ passages: passagesFormates });

  } catch (error) {
    console.error("Erreur dans l'API Passage_Palaiseau:", error);
    return response.status(500).json({ error: "Erreur interne du serveur." });
  }
}