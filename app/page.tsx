"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { JitsiMeeting } from '@jitsi/react-sdk';

const GlobalDarkWrapper = ({ children, onDoctorLogin }: { children: React.ReactNode, onDoctorLogin: () => void }) => (
  <div className="relative min-h-screen bg-slate-950 flex flex-col font-sans overflow-hidden">
    {/* Animated 3D Background Orbs */}
    <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>

    {/* Frosted Glass Header */}
    <header className="relative z-10 bg-slate-900/50 backdrop-blur-lg border-b border-white/10 sticky top-0 shrink-0">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* INJECTED LOGO HERE */}
          <img src="/logo.png" alt="UrgentQ Logo" className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-2xl font-extrabold text-white tracking-tight">UrgentQ</span>
        </div>
        <button 
          onClick={onDoctorLogin} 
          className="text-slate-300 hover:text-white text-sm font-semibold transition-all px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center gap-2"
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
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigateToDoctor = () => {
    router.push('/doctor');
  };

  // --- STEP 1: 3D PREMIUM LANDING PAGE ---
  if (currentStep === 1) {
    return (
      <GlobalDarkWrapper onDoctorLogin={navigateToDoctor}>
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-blue-300 font-semibold text-xs tracking-widest uppercase">Live 24/7 Telemedicine</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
              Skip the waiting room. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                See a doctor instantly.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Secure, high-definition medical consultations from your device. No appointments. Connect within minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setCurrentStep(2)}
                className="group relative px-8 py-5 w-full sm:w-auto bg-gradient-to-b from-blue-500 to-blue-700 rounded-2xl shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,1)] hover:-translate-y-1 transition-all duration-300 border border-blue-400/50"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white font-bold text-xl">Consult as Patient</span>
                  <svg className="w-6 h-6 text-blue-200 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </div>
              </button>

              <button 
                onClick={navigateToDoctor}
                className="px-8 py-5 w-full sm:w-auto bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-bold text-xl backdrop-blur-md transition-all duration-300 shadow-xl"
              >
                I am a Doctor
              </button>
            </div>
          </div>
        </main>
        <div className="relative h-24 w-full overflow-hidden flex justify-center perspective-[1000px] opacity-60">
           <div className="absolute bottom-[-50px] w-3/4 h-32 bg-blue-900/30 border-t border-blue-500/30 rounded-[100%] shadow-[0_-20px_50px_rgba(59,130,246,0.2)] transform rotate-x-[60deg]"></div>
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
          <div className="bg-white/5 backdrop-blur-xl max-w-md w-full p-8 rounded-3xl shadow-2xl border border-white/10 text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">Who is the patient?</h2>
            <p className="text-sm text-slate-400 mb-8">Enter your details to instantly join the medical queue.</p>
            
            <div className="space-y-5 mb-8">
              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                <input type="text" placeholder="e.g. Mohit Choudhury" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white placeholder-slate-500 font-medium transition-colors" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Mobile Number</label>
                <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                  <span className="px-4 py-3 border-r border-white/10 font-medium text-slate-400 bg-black/20">+91</span>
                  <input type="tel" maxLength={10} placeholder="99999 99999" className="w-full px-4 py-3 bg-transparent outline-none font-medium tracking-wide text-white placeholder-slate-500" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
            </div>

            <button disabled={!isGuestValid} onClick={() => setCurrentStep(3)} className={`w-full font-bold text-lg py-4 px-6 rounded-xl transition-all duration-300 ${isGuestValid ? 'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-blue-400/50' : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'}`}>
              Continue securely
            </button>
            <button onClick={() => setCurrentStep(1)} className="mt-6 text-sm font-medium text-slate-400 hover:text-white transition-colors block mx-auto">← Back to Home</button>
          </div>
        </div>
      </GlobalDarkWrapper>
    );
  }

  // --- STEP 3: PREMIUM INTAKE FORM ---
  if (currentStep === 3) {
    const isFormValid = age.trim() && gender && symptoms.trim() && durationDays.trim();
    return (
      <GlobalDarkWrapper onDoctorLogin={navigateToDoctor}>
        <div className="flex-grow flex items-center justify-center p-4 py-12">
          <div className="bg-white/5 backdrop-blur-xl max-w-lg w-full p-8 rounded-3xl shadow-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-1 text-white">Medical Intake</h2>
            <p className="text-sm text-slate-400 mb-8">Hello {patientName.split(' ')[0]}, provide context so the doctor can evaluate you instantly.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Age</label>
                  <input type="number" min="0" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Gender</label>
                  <select className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white [&>option]:bg-slate-900" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="" className="text-slate-500">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Duration (Days)</label>
                <input type="number" min="0" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-blue-500 text-white" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Symptoms</label>
                <textarea rows={3} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none resize-none focus:border-blue-500 text-white" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300">Severity</label>
                  <span className="text-sm font-bold px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{severity} / 10</span>
                </div>
                <input type="range" min="1" max="10" className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-blue-500" value={severity} onChange={(e) => setSeverity(Number(e.target.value))} />
              </div>

              <button disabled={!isFormValid} onClick={() => setCurrentStep(4)} className={`w-full font-bold text-lg py-4 px-6 rounded-xl mt-4 ${isFormValid ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border border-emerald-400/50' : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'}`}>
                Enter Waiting Room
              </button>
              <button onClick={() => setCurrentStep(2)} className="mt-4 text-sm font-medium text-slate-400 hover:text-white block mx-auto">← Back</button>
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
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-white font-semibold">Secure Medical Room</span>
          </div>
          <button onClick={() => setCurrentStep(5)} className="bg-red-600/90 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 border border-red-500/50">
            End Consultation
          </button>
        </div>
        <div className="flex-grow p-4 bg-slate-950">
          <div className="w-full h-[calc(100vh-8rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-slate-900 relative flex items-center justify-center">
            {!isMounted ? (
              <div className="text-slate-400">Initializing feed...</div>
            ) : (
              <JitsiMeeting
                domain="meet.jit.si"
                roomName={uniqueRoomName}
                configOverwrite={{ startWithAudioMuted: false, startWithVideoMuted: false, prejoinPageEnabled: false, disableDeepLinking: true, toolbarButtons: ['microphone', 'camera', 'settings'] }}
                interfaceConfigOverwrite={{ TOOLBAR_BUTTONS: ['microphone', 'camera', 'settings'], SHOW_JITSI_WATERMARK: false, SHOW_WATERMARK_FOR_GUESTS: false, MOBILE_APP_PROMO: false }}
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
          <div className="bg-white/5 backdrop-blur-xl max-w-md w-full p-8 rounded-3xl shadow-2xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-2 text-white">Consultation Complete</h2>
            <p className="text-sm text-slate-400 mb-8">Thank you, {patientName}. Your on-call doctor is finalizing your notes.</p>
            <button onClick={() => setCurrentStep(1)} className="text-sm font-semibold text-slate-400 hover:text-white px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5">
              Return to Home
            </button>
          </div>
        </div>
      </GlobalDarkWrapper>
    );
  }
}