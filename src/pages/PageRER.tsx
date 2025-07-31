// Fichier : /src/pages/PageRER.tsx

import React from 'react';
// NOUVEAU : Les imports pointent maintenant vers des composants .tsx
import HorairesRER from '../components/HorairesRER';
import InfoTraficRER from '../components/InfoTraficRER';

// Le CSS peut rester tel quel
const styles = `
  :root {
      --background-color: #0d1a2e; --card-background: #011627; --text-color: #d6deeb;
      --header-color: #58a6ff; --rer-b-color: #0082c4; --highlight-color: #ffca28;
      --line-color: #334155; --twitter-color: #1DA1F2;
  }
  body {
      background-color: var(--background-color);
  }
  .page-rer-container {
      font-family: 'Inter', sans-serif; color: var(--text-color); padding: 1rem;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      gap: 2rem; min-height: 100vh;
  }
  /* ... (le reste de votre CSS) ... */
  .main-container {
      display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; width: 100%;
  }
  .display-board {
      background-color: var(--card-background); border: 1px solid var(--line-color);
      border-radius: 1rem; padding: 1.5rem 2rem; flex: 1 1 420px;
      max-width: 600px; min-width: 320px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      display: flex; flex-direction: column;
  }
  .board-header {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 2px solid var(--line-color); padding-bottom: 1rem; margin-bottom: 1rem;
  }
  .line-info { display: flex; align-items: center; gap: 1rem; }
  .rer-logo, .twitter-logo {
      color: white; font-weight: 700; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 1.5rem;
  }
  .rer-logo { background-color: var(--rer-b-color); }
  .twitter-logo { background-color: var(--twitter-color); }
  .line-name { font-size: 1.2rem; font-weight: 500; }
  .clock { font-size: 1.5rem; font-weight: 700; color: var(--header-color); }
  .departures-list, .tweets-list { list-style: none; padding: 0; margin: 0; }
  .departure-item {
      display: grid; grid-template-columns: 1fr 100px; align-items: center;
      padding: 1rem 0; font-size: 1.5rem; border-bottom: 1px solid var(--line-color);
  }
  .departure-item:last-child { border-bottom: none; }
  .departure-destination { font-weight: 500; }
  .departure-time { font-weight: 700; text-align: right; color: var(--highlight-color); }
  .departure-time span { font-size: 1rem; font-weight: 400; color: var(--text-color); }
  .tweet-item {
      padding: 1rem 0; font-size: 1rem; border-bottom: 1px solid var(--line-color); line-height: 1.5;
  }
  .tweet-item a { color: var(--twitter-color); text-decoration: none; }
  .tweet-item a:hover { text-decoration: underline; }
  .tweet-item:last-child { border-bottom: none; }
  .error-message { color: #ff5252; text-align: center; padding: 1rem; min-height: 1.5em; }
`;

// NOUVEAU : On utilise React.FC pour déclarer le composant de la page
const PageRER: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="page-rer-container">
        <div className="main-container">
          <HorairesRER 
            apiRoute="/api/Passage_Denfert" 
            stationName="Denfert-Rochereau"
            direction="Sud"
          />
          <HorairesRER 
            apiRoute="/api/Passage_Palaiseau"
            stationName="Palaiseau"
            direction="Nord"
          />
        </div>
        <InfoTraficRER />
      </div>
    </>
  );
}

export default PageRER;