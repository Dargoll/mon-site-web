// Fichier : /src/components/InfoTraficRER.tsx

import React, { useState, useEffect } from 'react';

// NOUVEAU : On définit un type pour la structure d'un tweet
type Tweet = {
  id: string;
  text: string;
};

// Ce composant n'a pas de props, on peut donc simplement utiliser React.FC
const InfoTraficRER: React.FC = () => {
  // NOUVEAU : On type l'état des tweets
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('/api/InfoTrafic');
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setTweets(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchTweets();
    const interval = setInterval(fetchTweets, 120000); // Toutes les 2 minutes
    return () => clearInterval(interval);
  }, []);
  
  const formatTweetText = (text: string) => {
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    text = text.replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1" target="_blank" rel="noopener noreferrer">#$1</a>');
    return { __html: text };
  };

  return (
    <div className="display-board" style={{ flexBasis: '100%', maxWidth: '1224px' }}>
      <header className="board-header">
        <div className="line-info">
          <span className="twitter-logo">i</span>
          <span className="line-name">Infos trafic @RERB</span>
        </div>
      </header>
      <main>
        {error && <div className="error-message">{error}</div>}
        <ul className="tweets-list">
          {!error && tweets.length === 0 && <li className="tweet-item"><span>Chargement des tweets...</span></li>}
          {tweets.map(tweet => (
            <li key={tweet.id} className="tweet-item" dangerouslySetInnerHTML={formatTweetText(tweet.text)} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default InfoTraficRER;