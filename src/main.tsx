import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

interface IPResponse {
  ip: string;
  talos_threat_level: string;
  apivoid_score: string;
  abuse_ipdb: string;
  location: string;
  TorNode: string;
  virustotal_score: number;
  greynoise_noise: string;
  greynoise_riot: string;
  greynoise_classification: string;
  virustotal: {
    harmless: string;
    malicious: string;
    "VT malicious engines": string;
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
