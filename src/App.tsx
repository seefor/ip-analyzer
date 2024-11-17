import React from 'react';
import { Send } from 'lucide-react';
import IPForm from './components/IPForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-6">
            <Send className="w-8 h-8 text-indigo-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            IP Address Submission
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter an IP address to submit to the webhook
          </p>

          <IPForm />
        </div>
      </div>
    </div>
  );
}

export default App;