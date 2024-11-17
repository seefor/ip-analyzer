import React, { useState } from 'react';
import { Send, CheckCircle, XCircle, Loader2, Shield, Globe, Activity, MapPin } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

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

export default function IPForm() {
  const [ipAddress, setIpAddress] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState<IPResponse | null>(null);

  const validateIP = (ip: string) => {
    const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateIP(ipAddress)) {
      setStatus('error');
      setErrorMessage('Please enter a valid IP address');
      return;
    }

    setStatus('loading');
    setResponse(null);
    
    try {
      const response = await fetch('https://dry-leaf-3047.tines.com/webhook/b30ab4202ce66741eb9cba24643d724c/4b93c95e60e71673b2a9b7047d0f4b9d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        body: JSON.stringify({ ipaddress: ipAddress }),
      });

      if (!response.ok) throw new Error('Failed to submit IP');
      
      const data = await response.json();
      setResponse(data);
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to submit IP address. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="ip" className="block text-sm font-medium text-gray-700 mb-2">
            IP Address
          </label>
          <div className="relative">
            <input
              id="ip"
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Enter IP address (e.g., 1.1.1.1)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
              disabled={status === 'loading'}
            />
            <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing IP...</span>
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              <span>Analyze IP</span>
            </>
          )}
        </button>
      </form>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-700">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {response && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">IP Analysis Results</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                response.talos_threat_level === 'favorable' 
                  ? 'text-green-600 bg-green-50'
                  : 'text-red-600 bg-red-50'
              }`}>
                {response.talos_threat_level === 'favorable' ? 'trusted' : 'untrusted'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Shield className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">IP Address</p>
                    <p className="text-gray-900 font-medium">{response.ip}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">{response.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">AbuseIPDB Score</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900 font-medium">{response.abuse_ipdb}</p>
                      <span className="text-sm text-gray-500">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">VirusTotal Analysis</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Harmless</p>
                        <p className="text-2xl font-bold text-green-600">{response.virustotal.harmless}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Malicious</p>
                        <p className="text-2xl font-bold text-red-600">{response.virustotal.malicious}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Malicious Engines</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 leading-relaxed">
                    {response.virustotal["VT malicious engines"]}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500">GreyNoise</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{response.greynoise_classification}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Tor Node</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{response.TorNode === "true" ? "Yes" : "No"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Noise Status</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{response.greynoise_noise}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500">RIOT Status</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{response.greynoise_riot === "true" ? "Yes" : "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}