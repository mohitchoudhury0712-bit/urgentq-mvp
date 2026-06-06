"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const JitsiMeeting = dynamic(() => import('@jitsi/react-sdk').then((mod) => mod.JitsiMeeting), { ssr: false });

const MOCK_QUEUE = [
  { id: '1', name: 'Mohit Choudhury', phone: '9876543210', age: 21, gender: 'Male', symptoms: 'Severe stomach ache and mild fever since yesterday morning.', duration: 2, severity: 8, timeWaiting: '2 mins' },
  { id: '2', name: 'Rahul Sharma', phone: '9998887776', age: 34, gender: 'Male', symptoms: 'Continuous dry cough and shortness of breath.', duration: 5, severity: 6, timeWaiting: '5 mins' }
];

export default function DoctorDashboard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // New States for Availability and Identity
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [doctorName, setDoctorName] = useState('Dr. Mohit Choudhury');

  const [activePatient, setActivePatient] = useState<any>(null);
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => { setIsMounted(true); }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password.length >= 6) {
      // Dynamically format a clean profile name from the email prefix if it isn't the default mockup
      const emailPrefix = email.split('@')[0];
      if (emailPrefix.toLowerCase() !== 'doctor') {
        const formattedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
        setDoctorName(`Dr. ${formattedName}`);
      }
      setCurrentStep(2);
    }
  };

  const handleCompleteConsultation = () => {
    setActivePatient(null);
    setPrescriptionNotes('');
    setCurrentStep(2);
    alert("Prescription saved securely and call ended successfully.");
  };

  // --- STEP 1: SECURE DOCTOR LOGIN ---
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-slate-800">
          <img src="/logo.png" alt="UrgentQ Logo" className="h-16 w-auto object-contain mx-auto mb-4" />
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">UrgentQ <span className="text-blue-600">MD</span></h1>
            <p className="text-slate-500 mt-2 font-medium">Doctor Portal Login</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Registered Email</label>
              <input type="email" required placeholder="doctor@urgentq.com" className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 bg-slate-50 transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input type="password" required placeholder="••••••••" className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 bg-slate-50 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3.5 px-6 rounded-xl mt-4 transition-colors shadow-lg shadow-blue-100">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- STEP 2: MAIN DASHBOARD WITH ONLINE TOGGLE & STATUS ---
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <header className="bg-slate-900 text-white h-20 flex items-center justify-between px-8 shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="UrgentQ Logo" className="h-9 w-auto object-contain" />
            <div className="h-6 w-[1px] bg-slate-700 hidden sm:block"></div>
            {/* DYNAMIC DOCTOR NAME WITH PREFIX */}
            <div className="text-lg font-bold tracking-wide text-blue-400 bg-slate-800/60 px-4 py-1.5 rounded-xl border border-slate-700/50">
              {doctorName}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* SLEEK STATUS TOGGLE SWITCH */}
            <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
              <span className={`text-sm font-bold transition-colors ${isOnline ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isOnline ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isOnline ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <button onClick={() => { setIsOnline(false); setCurrentStep(1); }} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Logout</button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6 mt-4">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Active Hours</p><p className="text-3xl font-extrabold text-slate-800">4h 30m</p></div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Patients Attended</p><p className="text-3xl font-extrabold text-blue-600">12</p></div>
            <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100"><p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1">Today's Earnings</p><p className="text-3xl font-extrabold text-emerald-700">₹4,500</p></div>
          </div>

          {/* Conditional Rendering based on Status Toggle */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              Live Waiting Queue 
              {isOnline && <span className="bg-blue-100 text-blue-700 text-sm py-0.5 px-2 rounded-full animate-pulse">{MOCK_QUEUE.length} waiting</span>}
            </h2>
            
            {!isOnline ? (
              /* Offline State UX */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">You are currently offline</h3>
                <p className="text-slate-500 text-sm max-w-sm">Flip the switch in the top header to go online, broadcast your availability, and access the live patient queue.</p>
              </div>
            ) : (
              /* Online State UX - Show List */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all">
                {MOCK_QUEUE.map((patient) => (
                  <div key={patient.id} className="p-6 border-b border-slate-100 hover:bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-slate-900">{patient.name}</h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${patient.severity >= 7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          Severity: {patient.severity}/10
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">{patient.age} yrs • {patient.gender} • Waiting: {patient.timeWaiting}</p>
                      <p className="text-slate-700 text-sm mt-2 line-clamp-1">{patient.symptoms}</p>
                    </div>
                    <button 
                      onClick={() => { setActivePatient(patient); setCurrentStep(3); }} 
                      className="shrink-0 bg-blue-600 text-white hover:bg-blue-700 font-bold py-2.5 px-6 rounded-xl transition-colors shadow-md w-full md:w-auto text-center"
                    >
                      Accept Patient & Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // --- STEP 3: PATIENT INTAKE REVIEW ---
  if (currentStep === 3 && activePatient) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 font-sans">
        <button onClick={() => setCurrentStep(2)} className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2 mb-6 transition-colors">
          ← Back to Dashboard
        </button>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">{activePatient.name}</h2>
              <p className="text-slate-500 font-medium mt-1">{activePatient.age} yrs • {activePatient.gender}</p>
            </div>
            <button onClick={() => setCurrentStep(4)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-colors">
              Start Live Consultation
            </button>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Reported Symptoms</h3>
            <p className="text-slate-800 text-lg leading-relaxed">{activePatient.symptoms}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 4: LIVE VIDEO CALL & PRESCRIPTION PAD ---
  if (currentStep === 4 && activePatient) {
    const uniqueRoomName = `UrgentQ-Consultation-${activePatient.phone}`;
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col font-sans overflow-hidden">
        {/* DOCTOR SIDE HEADER WITH DYNAMIC NAME AND RED DISCONNECT BUTTON */}
        <div className="h-16 bg-slate-950 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-white font-semibold">{doctorName} — Secure Terminal</span>
          </div>
          
          <button 
            onClick={handleCompleteConsultation} 
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-5 rounded-lg flex items-center gap-2 border border-red-500/50 transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"></path></svg>
            End Consultation
          </button>
        </div>
        
        <div className="flex-grow p-4 flex gap-6 overflow-hidden bg-slate-900">
          <div className="flex-[2] rounded-2xl overflow-hidden bg-slate-800 relative border border-slate-700">
            {isMounted && (
              <JitsiMeeting
                domain="meet.jit.si"
                roomName={uniqueRoomName}
                configOverwrite={{ startWithAudioMuted: false, startWithVideoMuted: false, prejoinPageEnabled: false, disableDeepLinking: true }}
                interfaceConfigOverwrite={{ TOOLBAR_BUTTONS: ['microphone', 'camera', 'settings', 'screenshare'], SHOW_JITSI_WATERMARK: false, SHOW_WATERMARK_FOR_GUESTS: false }}
                onApiReady={(externalApi) => { externalApi.executeCommand('displayName', doctorName); }}
                getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }}
              />
            )}
          </div>
          <div className="flex-[1] bg-white rounded-2xl flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 border-b bg-blue-50"><h3 className="font-bold text-blue-900">Rx / Prescription Pad</h3><p className="text-xs text-blue-700">Patient: {activePatient.name}</p></div>
            <textarea className="flex-1 p-4 outline-none resize-none font-mono text-sm" placeholder="Type clinical diagnosis & medicines here..." value={prescriptionNotes} onChange={(e) => setPrescriptionNotes(e.target.value)} />
            <button onClick={handleCompleteConsultation} disabled={!prescriptionNotes.trim()} className={`m-4 font-bold py-4 rounded-xl transition-all ${prescriptionNotes.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
              Send Prescription & End Call
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}