"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const JitsiMeeting = dynamic(() => import('@jitsi/react-sdk').then((mod) => mod.JitsiMeeting), { ssr: false });

// ADDED: hasPreviousPrescription flag to the mock data
const MOCK_QUEUE = [
  { id: '1', name: 'Mohit Choudhury', phone: '9876543210', age: 21, gender: 'Male', symptoms: 'Severe stomach ache and mild fever since yesterday morning.', duration: 2, severity: 8, timeWaiting: '2 mins', hasPreviousPrescription: true },
  { id: '2', name: 'Rahul Sharma', phone: '9998887776', age: 34, gender: 'Male', symptoms: 'Continuous dry cough and shortness of breath.', duration: 5, severity: 6, timeWaiting: '5 mins', hasPreviousPrescription: false }
];

export default function DoctorDashboard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [doctorName, setDoctorName] = useState('Dr. Mohit Choudhury');

  const [activePatient, setActivePatient] = useState<any>(null);
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => { setIsMounted(true); }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password.length >= 6) {
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
              <input type="email" required placeholder="doctor@urgentq.com" className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input type="password" required placeholder="••••••••" className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3.5 px-6 rounded-xl mt-4 transition-colors shadow-lg shadow-blue-100">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- STEP 2: MAIN DASHBOARD ---
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <header className="bg-slate-900 text-white h-20 flex items-center justify-between px-4 sm:px-8 shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2 sm:gap-4">
            <img src="/logo.png" alt="UrgentQ Logo" className="h-7 sm:h-9 w-auto object-contain" />
            <div className="h-6 w-[1px] bg-slate-700 hidden sm:block"></div>
            <div className="text-sm sm:text-lg font-bold tracking-wide text-blue-400 bg-slate-800/60 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl border border-slate-700/50 truncate max-w-[150px] sm:max-w-full">
              {doctorName}
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-800/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-slate-700">
              <span className={`text-xs sm:text-sm font-bold transition-colors ${isOnline ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isOnline ? 'ON' : 'OFF'}
              </span>
              <button type="button" onClick={() => setIsOnline(!isOnline)} className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isOnline ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                <span className={`pointer-events-none inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isOnline ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <button onClick={() => { setIsOnline(false); setCurrentStep(1); }} className="text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors hidden sm:block">Logout</button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 sm:p-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Active Hours</p><p className="text-3xl font-extrabold text-slate-800">4h 30m</p></div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Patients Attended</p><p className="text-3xl font-extrabold text-blue-600">12</p></div>
            <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100"><p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1">Today's Earnings</p><p className="text-3xl font-extrabold text-emerald-700">₹4,500</p></div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              Live Waiting Queue 
              {isOnline && <span className="bg-blue-100 text-blue-700 text-sm py-0.5 px-2 rounded-full animate-pulse">{MOCK_QUEUE.length} waiting</span>}
            </h2>
            
            {!isOnline ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">You are currently offline</h3>
                <p className="text-slate-500 text-sm max-w-sm">Flip the switch in the top header to go online, broadcast your availability, and access the live patient queue.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all">
                {MOCK_QUEUE.map((patient) => (
                  <div key={patient.id} className="p-4 sm:p-6 border-b border-slate-100 hover:bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">{patient.name}</h3>
                        <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${patient.severity >= 7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          Severity: {patient.severity}/10
                        </span>
                        {/* INDICATOR IF THEY UPLOADED A FILE */}
                        {patient.hasPreviousPrescription && (
                          <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                            File Attached
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">{patient.age} yrs • {patient.gender} • Waiting: {patient.timeWaiting}</p>
                      <p className="text-slate-700 text-xs sm:text-sm mt-2 line-clamp-2">{patient.symptoms}</p>
                    </div>
                    <button onClick={() => { setActivePatient(patient); setCurrentStep(3); }} className="shrink-0 bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 sm:py-2.5 sm:px-6 rounded-xl transition-colors shadow-md w-full md:w-auto text-center text-sm sm:text-base">
                      Accept & Review
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
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 font-sans">
        <button onClick={() => setCurrentStep(2)} className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2 mb-6 transition-colors text-sm sm:text-base">
          ← Back to Dashboard
        </button>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{activePatient.name}</h2>
              <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">{activePatient.age} yrs • {activePatient.gender}</p>
            </div>
            <button onClick={() => setCurrentStep(4)} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-md transition-colors text-base sm:text-lg">
              Start Live Consultation
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-100 h-full">
              <h3 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Reported Symptoms</h3>
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed">{activePatient.symptoms}</p>
            </div>
            
            {/* UPLOADED FILE VIEWER SECTION */}
            {activePatient.hasPreviousPrescription && (
              <div className="bg-blue-50 p-5 sm:p-6 rounded-xl border border-blue-100 flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wider mb-3">Attached Documents</h3>
                <button 
                  onClick={() => alert("Opening file viewer... (In a live app, this will open the patient's uploaded PDF or Image from the cloud database!)")}
                  className="w-full bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  View Previous_Prescription.pdf
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 4: LIVE VIDEO CALL & PRESCRIPTION PAD ---
  if (currentStep === 4 && activePatient) {
    const uniqueRoomName = `UrgentQ-Consultation-${activePatient.phone}`;
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
        <div className="h-16 bg-slate-950 flex items-center justify-between px-4 md:px-6 border-b border-slate-800 shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-white font-semibold hidden sm:inline">{doctorName} — Secure Terminal</span>
            <span className="text-white font-semibold sm:hidden truncate max-w-[120px]">Secure Terminal</span>
          </div>
          
          <button onClick={handleCompleteConsultation} className="bg-red-600 hover:bg-red-500 text-white font-bold py-1.5 px-3 md:py-2 md:px-5 rounded-lg flex items-center gap-2 border border-red-500/50 transition-colors shadow-md text-sm md:text-base">
            <svg className="w-4 h-4 md:w-5 md:h-5 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"></path></svg>
            End Call
          </button>
        </div>
        
        <div className="flex-grow p-4 flex flex-col lg:flex-row gap-6 bg-slate-900 overflow-y-auto pb-10">
          
          <div className="w-full min-h-[60vh] lg:min-h-[auto] lg:flex-[2] rounded-2xl overflow-hidden bg-slate-800 relative border border-slate-700 shadow-xl">
            {isMounted && (
              <JitsiMeeting
                domain="meet.jit.si"
                roomName={uniqueRoomName}
                configOverwrite={{ startWithAudioMuted: false, startWithVideoMuted: false, prejoinPageEnabled: false, prejoinConfig: { enabled: false }, disableDeepLinking: true }}
                interfaceConfigOverwrite={{ TOOLBAR_BUTTONS: ['microphone', 'camera', 'settings', 'screenshare'], SHOW_JITSI_WATERMARK: false, SHOW_WATERMARK_FOR_GUESTS: false, MOBILE_APP_PROMO: false }}
                onApiReady={(externalApi) => { externalApi.executeCommand('displayName', doctorName); }}
                getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }}
              />
            )}
          </div>

          <div className="w-full min-h-[40vh] lg:min-h-[auto] lg:flex-[1] bg-white rounded-2xl flex flex-col overflow-hidden border border-slate-200 shadow-xl">
            <div className="p-3 sm:p-4 border-b bg-blue-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-blue-900 text-sm sm:text-base">Rx / Prescription Pad</h3>
                <p className="text-[10px] sm:text-xs text-blue-700 mt-0.5">Patient: {activePatient.name}</p>
              </div>
              
              {/* MINI BUTTON ON THE PRESCRIPTION PAD IF THEY UPLOADED A FILE */}
              {activePatient.hasPreviousPrescription && (
                <button onClick={() => alert("Opening file viewer...")} className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 p-2 rounded-lg transition-colors flex items-center justify-center shadow-sm" title="View Uploaded File">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                </button>
              )}
            </div>
            
            <textarea className="flex-1 p-4 outline-none resize-none font-mono text-sm sm:text-base text-slate-900 bg-white" placeholder="Type clinical diagnosis & medicines here..." value={prescriptionNotes} onChange={(e) => setPrescriptionNotes(e.target.value)} />
            
            <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 mt-auto">
              <button onClick={handleCompleteConsultation} disabled={!prescriptionNotes.trim()} className={`w-full font-bold py-3 sm:py-4 rounded-xl transition-all text-sm sm:text-base ${prescriptionNotes.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                Send Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}