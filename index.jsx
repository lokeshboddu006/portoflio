import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  MessageSquare, 
  GraduationCap, 
  BookOpen, 
  Code, 
  Terminal,
  CheckCircle2,
  Clock,
  Menu,
  X,
  Award,
  Database,
  Cpu,
  Layers,
  Phone,
  FileText,
  Map,
  BarChart3,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'lokesh-boddu-pro';

// --- Lokesh's Extended Resume Data ---
const DATA = {
  profile: {
    name: "LOKESH BODDU",
    role: "Software Engineer Intern",
    location: "Andhra Pradesh, India",
    email: "lokesh.boddu006@gmail.com",
    phone: "7331192922",
    github: "https://github.com/lokeshboddu006",
    linkedin: "https://www.linkedin.com/in/lokeshboddu006",
    bio: "Computer Science undergraduate with a strong foundation in data structures, algorithms, and OOP. Experienced in building scalable web applications and data analysis pipelines using Java, Python, and modern development tools."
  },
  skills: {
    languages: ["Java", "Python", "C", "HTML/CSS", "JavaScript"],
    core: ["Data Structures", "Algorithms", "Complexity Analysis", "Logical Reasoning"],
    data: ["Pandas", "Matplotlib", "Seaborn", "Web Scraping", "EDA"],
    cloud: ["MySQL", "PostgreSQL", "Cloud Fundamentals", "Linux", "Git"]
  },
  education: [
    {
      degree: "B.Tech - Computer Science & Engineering (Data Science)",
      school: "Prasad V Potluri Siddhartha Institute of Technology",
      year: "2024 - 2028",
      location: "Vijayawada, AP",
      details: "Core Coursework: Data Structures, Algorithms, OOPS, Databases, Operating Systems, Cloud Computing, Computer Networks."
    }
  ],
  projects: [
    {
      id: 1,
      title: "NAVISENSE 360",
      status: "In Progress",
      category: "Intelligent Road Health & Navigation",
      description: "Designed a GPS-resilient, offline-capable navigation and road intelligence system. Introduced road condition scoring and multi-vehicle validation concepts.",
      link: "https://github.com/lokeshboddu006",
      tools: ["Python", "GPS-Logic", "Data Modeling", "Offline Maps"],
      icon: Map
    },
    {
      id: 2,
      title: "Data Science Capstone",
      status: "Completed",
      category: "Web Scraping & EDA",
      description: "Built an end-to-end data analysis pipeline using real-world company data. Performed scraping, EDA, and visualization to extract actionable insights.",
      link: "https://github.com/lokeshboddu006",
      tools: ["Python", "BeautifulSoup", "Pandas", "Seaborn"],
      icon: BarChart3
    },
    {
      id: 3,
      title: "EventEase",
      status: "Completed",
      category: "Blazor Management App",
      description: "Developed a Blazor web app for event registration and attendance tracking. Implemented routing, validation, and state management.",
      link: "https://github.com/lokeshboddu006",
      tools: ["Blazor", "C#", "ASP.NET", "State Management"],
      icon: Monitor
    },
    {
      id: 4,
      title: "Strategic Tic-Tac-Toe Engine",
      status: "Completed",
      category: "AI/Game Theory",
      description: "Built a logic-driven engine to select optimal moves using state evaluation. Awarded Second Place in campus coding competition.",
      link: "https://github.com/lokeshboddu006",
      tools: ["Java", "Algorithm Design", "Game Logic"],
      icon: Cpu
    }
  ],
  research: [
    {
      id: 1,
      title: "Analyzing Road Condition Patterns via Crowdsourced Data",
      status: "Under Research",
      abstract: "Developing a framework for real-time pothole detection using multi-sensor inputs from mobile devices. Focused on public safety and real-world feasibility.",
      tags: ["Infrastructure", "Data Science", "Public Safety"]
    }
  ],
  certificates: [
    "Cloud Computing (Elite) - NPTEL",
    "Programming in C - BYTS",
    "Gemini Certified University Student - Google",
    "IBM Data Fundamentals",
    "Quantum Computing - QubitTech"
  ],
  achievements: [
    "First Place - India Quiz Competition",
    "Runner-up - AI-Based Game Development Competition",
    "Runner-up - Inter-College Debate Competition"
  ],
  stats: [
    { label: "DSA Problems Solved", value: "500+" },
    { label: "Campus Awards", value: "3" },
    { label: "Languages", value: "4" }
  ]
};

// --- Page Motion Variants ---
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.4, ease: "easeIn" } }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState({ loading: false, success: false });

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth failed:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    if (!user) return;
    setFormState({ loading: true, success: false });
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inquiries'), {
        ...formData,
        timestamp: Timestamp.now(),
        userId: user.uid
      });
      setFormState({ loading: false, success: true });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState(s => ({ ...s, success: false })), 5000);
    } catch (err) {
      setFormState({ loading: false, success: false });
    }
  };

  const navItems = ['Home', 'About', 'Projects', 'Research', 'Contact'];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-slate-800 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 group cursor-pointer" 
            onClick={() => setActiveSection('home')}
          >
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-[#0b0f1a] font-bold text-xl group-hover:rotate-12 transition-transform">L</div>
            <span className="text-xl font-bold tracking-tighter text-white">BODDU.</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`text-sm font-bold tracking-widest uppercase transition-all relative py-1 ${activeSection === item.toLowerCase() ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div layoutId="navunderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400" />
                )}
              </button>
            ))}
            <button 
              onClick={() => setActiveSection('resume')}
              className={`bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeSection === 'resume' ? 'bg-teal-500/20 border-teal-400' : ''}`}
            >
              Resume
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[60] bg-[#0b0f1a] p-10 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {[...navItems, 'Resume'].map((item) => (
              <button 
                key={item} 
                className="text-4xl font-black uppercase tracking-tighter" 
                onClick={() => {
                  setActiveSection(item.toLowerCase());
                  setIsMenuOpen(false);
                }}
              >
                {item}
              </button>
            ))}
            <button className="absolute top-6 right-6 p-2" onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.section key="home" initial="initial" animate="animate" exit="exit" variants={pageVariants} className="container mx-auto px-6 min-h-[80vh] flex items-center">
              <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Cpu className="w-3 h-3" /> System Architect & Data Scientist
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                    Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Intelligent</span> Software.
                  </h1>
                  <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                    Hello, I'm <span className="text-white font-semibold">Lokesh Boddu</span>. Currently a CSE student at PVPSIT, solving high-impact problems using logic, code, and curiosity.
                  </p>
                  <div className="flex flex-wrap gap-5">
                    <button 
                      onClick={() => setActiveSection('projects')}
                      className="bg-teal-500 text-[#0b0f1a] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-teal-500/20"
                    >
                      Explore Works
                    </button>
                    <div className="flex items-center gap-4">
                      <SocialLink Icon={Github} href={DATA.profile.github} />
                      <SocialLink Icon={Linkedin} href={DATA.profile.linkedin} />
                      <SocialLink Icon={Mail} href={`mailto:${DATA.profile.email}`} />
                    </div>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                   <div className="aspect-[4/5] bg-slate-900 border border-slate-800 rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden group">
                      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
                      <Terminal className="w-16 h-16 text-teal-500" />
                      <div className="space-y-4">
                        <div className="text-5xl font-black text-white">{DATA.stats[0].value}</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{DATA.stats[0].label}</div>
                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5 }} className="h-full bg-teal-500" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'about' && (
            <motion.section key="about" initial="initial" animate="animate" exit="exit" variants={pageVariants} className="container mx-auto px-6 py-12">
              <SectionHeader title="Strengths & Education" subtitle="Profile" />
              <div className="grid lg:grid-cols-12 gap-16 mt-16">
                <div className="lg:col-span-5 space-y-8">
                  <p className="text-slate-400 text-lg leading-relaxed">{DATA.profile.bio}</p>
                  <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4">
                    <GraduationCap className="w-10 h-10 text-teal-500" />
                    <h4 className="text-xl font-bold text-white">{DATA.education[0].school}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{DATA.education[0].degree} • {DATA.education[0].year}</p>
                    <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                      <BarChart3 className="w-4 h-4" /> Focused on Production-level Systems
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
                  <SkillCard title="Languages" skills={DATA.skills.languages} icon={Code} />
                  <SkillCard title="Core Engine" skills={DATA.skills.core} icon={Cpu} />
                  <SkillCard title="Data Mastery" skills={DATA.skills.data} icon={Database} />
                  <SkillCard title="Cloud/DB" skills={DATA.skills.cloud} icon={Layers} />
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'projects' && (
            <motion.section key="projects" initial="initial" animate="animate" exit="exit" variants={pageVariants} className="container mx-auto px-6 py-12">
              <SectionHeader title="Technical Projects" subtitle="Portfolio" />
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-16">
                {DATA.projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'research' && (
            <motion.section key="research" initial="initial" animate="animate" exit="exit" variants={pageVariants} className="container mx-auto px-6 py-12 max-w-4xl">
              <SectionHeader title="Scientific Inquiry" subtitle="Research" />
              <div className="mt-16 space-y-8">
                {DATA.research.map(paper => (
                  <div key={paper.id} className="p-10 bg-slate-900/30 border border-slate-800 rounded-[2.5rem] relative overflow-hidden group hover:border-teal-500/40 transition-all">
                    <BookOpen className="absolute -top-10 -right-10 w-48 h-48 text-teal-500/5 group-hover:text-teal-500/10 transition-colors" />
                    <div className="relative z-10">
                      <span className="px-3 py-1 bg-teal-500/10 text-teal-500 text-[10px] font-bold uppercase rounded-full border border-teal-500/20 mb-6 inline-block">
                        {paper.status}
                      </span>
                      <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-teal-400 transition-colors">{paper.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8">{paper.abstract}</p>
                      <div className="flex gap-4">
                        {paper.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold text-slate-600">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'contact' && (
            <motion.section key="contact" initial="initial" animate="animate" exit="exit" variants={pageVariants} className="container mx-auto px-6 py-12">
              <div className="max-w-5xl mx-auto bg-slate-900/50 border border-slate-800 rounded-[3rem] p-12 md:p-20 grid md:grid-cols-2 gap-20">
                <div className="space-y-8">
                  <SectionHeader title="Let's Build Together" subtitle="Contact" />
                  <p className="text-slate-400 text-lg">I am actively seeking Internships and Software Engineering roles. Let's discuss technology!</p>
                  
                  <div className="space-y-6 pt-8 border-t border-slate-800">
                    <ContactDetailItem icon={Mail} label="Direct Mail" value={DATA.profile.email} href={`mailto:${DATA.profile.email}`} />
                    <ContactDetailItem icon={Phone} label="Call / WhatsApp" value={`+91 ${DATA.profile.phone}`} href={`tel:${DATA.profile.phone}`} />
                    <ContactDetailItem icon={Linkedin} label="LinkedIn" value="lokeshboddu006" href={DATA.profile.linkedin} />
                  </div>
                </div>

                <form onSubmit={handleContact} className="space-y-6">
                  <div className="grid gap-6">
                    <Input label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your full name" />
                    <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="name@domain.com" />
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500">Message</label>
                      <textarea 
                        required rows="4" 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-teal-500 transition-all outline-none text-white resize-none"
                        placeholder="Tell me about your requirements..."
                      />
                    </div>
                  </div>
                  <button 
                    disabled={formState.loading}
                    className="w-full bg-teal-500 text-[#0b0f1a] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-400 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-teal-500/20"
                  >
                    {formState.loading ? 'Sending Request...' : 'Send Inquiry'}
                  </button>
                  {formState.success && (
                    <div className="p-4 bg-teal-500/10 text-teal-400 rounded-xl text-center text-sm font-bold border border-teal-500/20">
                      Message Sent Successfully!
                    </div>
                  )}
                </form>
              </div>
            </motion.section>
          )}

          {activeSection === 'resume' && (
            <motion.section key="resume" initial="initial" animate="animate" exit="exit" variants={pageVariants} className="container mx-auto px-6 py-12 max-w-5xl">
              <div className="bg-white text-slate-900 p-12 md:p-20 rounded-[2.5rem] shadow-2xl space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-200 pb-10 gap-6">
                  <div>
                    <h2 className="text-5xl font-black tracking-tighter">{DATA.profile.name}</h2>
                    <p className="text-teal-600 font-bold tracking-widest uppercase text-sm mt-2">{DATA.profile.role}</p>
                  </div>
                  <div className="text-right space-y-1 text-sm font-medium text-slate-500">
                    <p>{DATA.profile.email}</p>
                    <p>+91 {DATA.profile.phone}</p>
                    <p>{DATA.profile.location}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-16">
                  <div className="md:col-span-2 space-y-12">
                    <ResumeSection title="Education">
                      {DATA.education.map((edu, i) => (
                        <div key={i} className="space-y-2">
                          <h4 className="font-bold text-xl">{edu.school}</h4>
                          <p className="text-teal-600 font-semibold">{edu.degree}</p>
                          <p className="text-slate-400 text-sm">{edu.year} | {edu.location}</p>
                          <p className="text-slate-600 text-sm mt-2 leading-relaxed">{edu.details}</p>
                        </div>
                      ))}
                    </ResumeSection>

                    <ResumeSection title="Top Projects">
                      <div className="space-y-6">
                        {DATA.projects.slice(0, 3).map((p, i) => (
                          <div key={i} className="space-y-1">
                            <h4 className="font-bold">{p.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{p.description}</p>
                            <p className="text-xs font-bold text-teal-600">Built with: {p.tools.join(', ')}</p>
                          </div>
                        ))}
                      </div>
                    </ResumeSection>

                    <ResumeSection title="Achievements">
                      <ul className="list-disc list-inside space-y-2 text-slate-600">
                        {DATA.achievements.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    </ResumeSection>
                  </div>

                  <div className="space-y-12">
                    <ResumeSection title="Technical Skills">
                      <div className="space-y-6">
                        <SkillGroup label="Languages" items={DATA.skills.languages} />
                        <SkillGroup label="Core DSA" items={DATA.skills.core} />
                        <SkillGroup label="Data & Tools" items={DATA.skills.data} />
                        <SkillGroup label="Infrastructure" items={DATA.skills.cloud} />
                      </div>
                    </ResumeSection>

                    <ResumeSection title="Certificates">
                      <ul className="space-y-3 text-sm font-medium text-slate-600">
                        {DATA.certificates.map((c, i) => <li key={i}>• {c}</li>)}
                      </ul>
                    </ResumeSection>
                  </div>
                </div>
                
                <div className="pt-10 border-t border-slate-100 flex justify-center">
                   <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-teal-600 transition-colors">
                     <FileText className="w-4 h-4" /> Print / Save as PDF
                   </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <footer className="py-12 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">© 2026 LOKESH BODDU • SOFTWARE ENGINEER INTERN</p>
      </footer>
    </div>
  );
}

// --- High-End Components ---

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-slate-500">{label}</label>
      <input 
        required
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-teal-500 transition-all outline-none text-white"
      />
    </div>
  );
}

function ContactDetailItem({ icon: Icon, label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-[#0b0f1a] transition-all">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
        <div className="font-bold text-white group-hover:text-teal-400 transition-colors">{value}</div>
      </div>
    </a>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="space-y-3">
      <div className="text-teal-500 font-bold text-xs uppercase tracking-[0.4em]">{subtitle}</div>
      <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">{title}</h2>
    </div>
  );
}

function ResumeSection({ title, children }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-2">{title}</h3>
      {children}
    </div>
  );
}

function SkillGroup({ label, items }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map(item => <span key={item} className="text-sm font-bold">{item}</span>)}
      </div>
    </div>
  );
}

function SkillCard({ title, skills, icon: Icon }) {
  return (
    <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-[2.5rem] hover:bg-slate-900/50 transition-all group">
      <Icon className="w-10 h-10 text-teal-500 mb-6 group-hover:scale-110 transition-transform" />
      <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map(s => (
          <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-tighter border border-white/5">{s}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const isPending = project.status === "In Progress";
  const Icon = project.icon || Monitor;
  return (
    <motion.div whileHover={{ y: -10 }} className="bg-slate-900/30 border border-slate-800 rounded-[3rem] p-10 flex flex-col h-full group hover:border-teal-500/30 transition-all">
      <div className="flex justify-between items-start mb-8">
        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${isPending ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'}`}>
          {isPending ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
          {project.status}
        </div>
        <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-teal-500 transition-colors">
          <Icon className="w-6 h-6" />
        </a>
      </div>
      <div className="flex-grow space-y-4">
        <div className="text-xs font-bold text-teal-500 uppercase tracking-widest">{project.category}</div>
        <h3 className="text-3xl font-black text-white leading-tight">{project.title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm font-medium">{project.description}</p>
      </div>
      <div className="mt-8 pt-8 border-t border-slate-800 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {project.tools.map(tool => (
            <span key={tool} className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">#{tool}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-teal-500 hover:text-[#0b0f1a] transition-all">
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

function SocialLink({ Icon, href }) {
  return (
    <a 
      href={href} target="_blank" rel="noreferrer"
      className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-500 transition-all"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}