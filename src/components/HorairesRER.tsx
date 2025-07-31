// Fichier : /src/components/HorairesRER.tsx

import React, { useState, useEffect } from 'react';

// NOUVEAU : Définition du type pour un seul passage.
type Passage = {
  destination: string;
  attente: string;
};

// NOUVEAU : Définition des types pour les "props" du composant.
interface HorairesRERProps {
  apiRoute: string;
  stationName: string;
  direction: string;
}

// NOUVEAU : On utilise les types définis pour les props.
const HorairesRER: React.FC<HorairesRERProps> = ({ apiRoute, stationName, direction }) => {
  // NOUVEAU : On "type" nos états pour plus de sécurité.
  const [passages, setPassages] = useState<Passage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [clock, setClock] = useState<string>(new Date().toLocaleTimeString('fr-FR'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiRoute);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setPassages(data.passages || []);
        setError(null);
      } catch (err: any) { // On type l'erreur
        setError(err.message);
        setPassages([]);
      }
    };

    fetchData();
    const dataInterval = setInterval(fetchData, 30000);
    return () => clearInterval(dataInterval);
  }, [apiRoute]);

  useEffect(() => {
    const clockInterval = setInterval(() => setClock(new Date().toLocaleTimeString('fr-FR')), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className="display-board">
      <header className="board-header">
        <div className="line-info">
          <span className="rer-logo">B</span>
          <span className="line-name">{`Départ : ${stationName} | Direction ${direction}`}</span>
        </div>
        <div className="clock">{clock}</div>
      </header>
      <main>
        {error && <div className="error-message">{error}</div>}
        <ul className="departures-list">
          {!error && passages.length === 0 && <li className="departure-item"><span>Chargement...</span></li>}
          {passages.map((p, index) => (
            <li key={index} className="departure-item">
              <span className="departure-destination">{p.destination}</span>
              <span className="departure-time">{p.attente} <span>min</span></span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HorairesRER;