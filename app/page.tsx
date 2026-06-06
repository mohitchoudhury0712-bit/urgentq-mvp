"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Next.js dynamic import for Jitsi to prevent SSR crashes
const JitsiMeeting = dynamic(() => import('@jitsi/react-sdk').then((mod) => mod.JitsiMeeting), { ssr: false });

const GlobalDarkWrapper = ({ children, onDoctorLogin }: { children: React.ReactNode, onDoctorLogin: () => void }) => (
  <div className="relative min-h-screen bg-slate-950 flex flex-col font-sans overflow-hidden">
    {/* Animated 3D Background Orbs */}
    <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>

    {/* Frosted Glass Header */}
    <header className="relative z-10 bg-slate-900/50 backdrop-blur-lg border-b border-white/10 sticky top-0 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/logo.png" alt="UrgentQ Logo" className="h-8 sm:h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">UrgentQ</span>
        </div>
        <button 
          onClick={onDoctorLogin} 
          className="text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center gap-2"
        >
          Doctor Login <span className="text-blue-400">&rarr;</span>
        </button>
      </div>
    </header>
    
    <div className="relative z-10 flex-grow flex flex-col">
      {children}
    </div>
  </div>
);

export default function UrgentQApp() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [severity, setSeverity] = useState(5);
  const [durationDays, setDurationDays] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const navigateToDoctor = () => {
    router.push('/doctor');
  };

  // --- STEP 1: 3D PREMIUM LANDING PAGE ---
  if (currentStep === 1) {
    return (
      <GlobalDarkWrapper onDoctorLogin={navigateToDoctor}>
        <main className="flex-grow flex items-center justify-center py-10 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-blue-300 font-semibold text-[10px] sm:text-xs tracking-widest uppercase">Live 24/7 Telemedicine</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight tracking-tight drop-shadow-2xl">
              Skip the waiting room. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                See a doctor instantly.
              </span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light">
              Secure, high-definition medical consultations from your device. No appointments. Connect in under 2 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button 
                onClick={() => setCurrentStep(2)}
                className="group relative px-6 sm:px-8 py-4 sm:py-5 w-full sm:w-auto bg-gradient-to-b from-blue-500 to-blue-700 rounded-2xl shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,1)] hover:-translate-y-1 transition-all duration-300 border border-blue-400/50"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white font-bold text-lg sm:text-xl">Consult as Patient</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </div>
              </button>

              <button 
                onClick={navigateToDoctor}
                className="px-6 sm:px-8 py-4 sm:py-5 w-full sm:w-auto bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-bold text-lg sm:text-xl backdrop-blur-md transition-all duration-300 shadow-xl"
              >
                I am a Doctor
              </button>
            </div>
          </div>
        </main>
        <div className="relative h-16 sm:h-24 w-full overflow-hidden flex justify-center perspective-[1000px] opacity-60">
           <div className="absolute bottom-[-30px] sm:bottom-[-50px] w-3/4 h-20 sm:h-32 bg-blue-900/30 border-t border-blue-500/30 rounded-[100%] shadow-[0_-20px_50px_rgba(59,130,246,0.2)] transform rotate-x-[60deg]"></div>
        </div>
      </GlobalDarkWrapper>
    );
  }

  // --- STEP 2: PREMIUM GUEST LOGIN ---
  if (currentStep === 2) {
    const isGuestValid = phoneNumber.length === 10 && patientName.trim().length > 0;
    return (
      <GlobalDarkWrapper onDoctorLogin={navigateToDoctor}>
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white/5 backdrop-blur-xl max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">Who is the patient?</h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">Enter your details to instantly join the medical queue.</p>
            
            <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
              <div className="text-left">
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                <input type="text" placeholder="e.g. Mohit Choudhury" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white placeholder-slate-500 font-medium transition-colors text-sm sm:text-base" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
              </div>
              <div className="text-left">
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Mobile Number</label>
                <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                  <span className="px-3 sm:px-4 py-3 border-r border-white/10 font-medium text-slate-400 bg-black/20 text-sm sm:text-base">+91</span>
                  <input type="tel" maxLength={10} placeholder="99999 99999" className="w-full px-3 sm:px-4 py-3 bg-transparent outline-none font-medium tracking-wide text-white placeholder-slate-500 text-sm sm:text-base" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
            </div>

            <button disabled={!isGuestValid} onClick={() => setCurrentStep(3)} className={`w-full font-bold text-base sm:text-lg py-3.5 sm:py-4 px-6 rounded-xl transition-all duration-300 ${isGuestValid ? 'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-blue-400/50' : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'}`}>
              Continue securely
            </button>
            <button onClick={() => setCurrentStep(1)} className="mt-4 sm:mt-6 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors block mx-auto">← Back to Home</button>
          </div>
        </div>
      </GlobalDarkWrapper>
    );
  }

  // --- STEP 3: PREMIUM INTAKE FORM & UPLOAD ---
  if (currentStep === 3) {
    const isFormValid = age.trim() && gender && symptoms.trim() && durationDays.trim();
    return (
      <GlobalDarkWrapper onDoctorLogin={navigateToDoctor}>
        <div className="flex-grow flex items-center justify-center p-4 py-6 sm:py-12">
          <div className="bg-white/5 backdrop-blur-xl max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-white">Medical Intake</h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">Hello {patientName.split(' ')[0]}, provide context so the doctor can evaluate you instantly.</p>
            
            <div className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Age</label>
                  <input type="number" min="0" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white text-sm sm:text-base" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Gender</label>
                  <select className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white [&>option]:bg-slate-900 text-sm sm:text-base" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="" className="text-slate-500">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Duration (Days)</label>
                <input type="number" min="0" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white text-sm sm:text-base" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Symptoms</label>
                <textarea rows={3} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none resize-none focus:border-blue-500 text-white text-sm sm:text-base placeholder-slate-500" placeholder="Describe how you are feeling..." value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
              </div>

              {/* BEAUTIFUL FILE UPLOAD SECTION */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Previous Prescription (Optional)</label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-colors ${prescriptionFile ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/20 bg-slate-900/50 hover:border-blue-500/50'}`}>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => setPrescriptionFile(e.target.files ? e.target.files[0] : null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {prescriptionFile ? (
                    <div className="flex flex-col items-center justify-center gap-1 text-emerald-400">
                      <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span className="text-sm font-semibold truncate max-w-[200px] w-full">{prescriptionFile.name}</span>
                      <span className="text-xs text-emerald-500/70">Tap to change file</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <svg className="w-6 h-6 mb-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      <span className="text-sm font-medium">Tap to upload PDF or Image</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs sm:text-sm font-semibold text-slate-300">Severity</label>
                  <span className="text-xs sm:text-sm font-bold px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{severity} / 10</span>
                </div>
                <input type="range" min="1" max="10" className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-blue-500" value={severity} onChange={(e) => setSeverity(Number(e.target.value))} />
              </div>

              <button disabled={!isFormValid} onClick={() => setCurrentStep(4)} className={`w-full font-bold text-base sm:text-lg py-3.5 sm:py-4 px-6 rounded-xl mt-4 transition-all ${isFormValid ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'}`}>
                Enter Waiting Room
              </button>
              <button onClick={() => setCurrentStep(2)} className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-slate-400 hover:text-white block mx-auto">← Back</button>
            </div>
          </div>
        </div>
      </GlobalDarkWrapper>
    );
  }

  // --- STEP 4: LIVE VIDEO CONSULTATION ---
  if (currentStep === 4) {
    const uniqueRoomName = `UrgentQ-Consultation-${phoneNumber}`;
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans overflow-hidden">
        <div className="h-16 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
            </span>
            <span className="text-white font-semibold text-sm sm:text-base">Secure Medical Room</span>
          </div>
          <button onClick={() => setCurrentStep(5)} className="bg-red-600/90 hover:bg-red-500 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg flex items-center gap-2 border border-red-500/50 text-xs sm:text-sm">
            End Call
          </button>
        </div>
        <div className="flex-grow p-2 sm:p-4 bg-slate-950">
          <div className="w-full h-full sm:h-[calc(100vh-6rem)] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-slate-900 relative flex items-center justify-center">
            {!isMounted ? (
              <div className="text-slate-400 text-sm">Initializing feed...</div>
            ) : (
              <JitsiMeeting
                domain="meet.jit.si"
                roomName={uniqueRoomName}
                configOverwrite={{ 
                  startWithAudioMuted: false, 
                  startWithVideoMuted: false, 
                  prejoinPageEnabled: false, 
                  prejoinConfig: { enabled: false }, // AGGRESSIVE MOBILE PREJOIN FIX
                  disableDeepLinking: true 
                }}
                interfaceConfigOverwrite={{ 
                  TOOLBAR_BUTTONS: ['microphone', 'camera', 'settings', 'chat'], 
                  SHOW_JITSI_WATERMARK: false, 
                  SHOW_WATERMARK_FOR_GUESTS: false, 
                  MOBILE_APP_PROMO: false 
                }}
                onApiReady={(externalApi) => { externalApi.executeCommand('displayName', patientName); }}
                getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 5: POST-CALL SCREEN ---
  if (currentStep === 5) {
    return (
      <GlobalDarkWrapper onDoctorLogin={navigateToDoctor}>
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white/5 backdrop-blur-xl max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Consultation Complete</h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">Thank you, {patientName}. Your on-call doctor is finalizing your notes.</p>
            <button onClick={() => setCurrentStep(1)} className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/10 hover:bg-white/5">
              Return to Home
            </button>
          </div>
        </div>
      </GlobalDarkWrapper>
    );
  }
}