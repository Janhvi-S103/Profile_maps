import React, { useState, useEffect } from 'react';
import { MapPin, Search, UserPlus, Edit2, Trash2, Loader, Sun, Moon } from 'lucide-react';
import Map from './components/Map';
import ProfileList from './components/ProfileList';
import AdminPanel from './components/AdminPanel';
import { Profile } from './types';

const initialProfiles: Profile[] = [
  {
    id: 1,
    name: "Priya Sharma",
    description: "Full Stack Developer at TechCorp India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    address: "Koramangala, Bangalore, Karnataka",
    coordinates: [12.9716, 77.6246],
    interests: ["Web Development", "AI", "Yoga"],
    contact: {
      email: "priya.s@techcorp.in",
      phone: "+91 98765 43210"
    }
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    description: "Senior Data Scientist at Analytics Hub",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    address: "Hitech City, Hyderabad, Telangana",
    coordinates: [17.4435, 78.3772],
    interests: ["Machine Learning", "Data Analytics", "Cricket"],
    contact: {
      email: "rajesh.k@analyticshub.in",
      phone: "+91 87654 32109"
    }
  },
  {
    id: 3,
    name: "Aisha Patel",
    description: "UX Designer & Design Systems Lead",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    address: "Bandra West, Mumbai, Maharashtra",
    coordinates: [19.0596, 72.8295],
    interests: ["Design Systems", "User Research", "Art"],
    contact: {
      email: "aisha.p@designco.in",
      phone: "+91 76543 21098"
    }
  },
  {
    id: 4,
    name: "Arjun Reddy",
    description: "Product Manager at StartupX",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    address: "Indiranagar, Bangalore, Karnataka",
    coordinates: [12.9784, 77.6408],
    interests: ["Product Strategy", "Startups", "Photography"],
    contact: {
      email: "arjun.r@startupx.in",
      phone: "+91 65432 10987"
    }
  },
  {
    id: 5,
    name: "Meera Iyer",
    description: "Cloud Architecture Specialist",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    address: "Anna Nagar, Chennai, Tamil Nadu",
    coordinates: [13.0827, 80.2707],
    interests: ["Cloud Computing", "DevOps", "Classical Music"],
    contact: {
      email: "meera.i@cloudtech.in",
      phone: "+91 54321 09876"
    }
  }
];

function App() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileSelect = (profile: Profile) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProfile(profile);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-primary-dark text-white' 
        : 'bg-gradient-to-b from-primary-light/30 to-white'
    }`}>
      <nav className={`${
        isDarkMode 
          ? 'bg-primary-dark border-primary-main/20' 
          : 'bg-white border-primary-main/10'
        } shadow-lg border-b transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className={`h-8 w-8 ${isDarkMode ? 'text-primary-main' : 'text-primary-main'}`} />
              <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary-main to-accent-copper text-transparent bg-clip-text">
                Profile Maps
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-main/20 hover:bg-primary-main/30 text-primary-main' 
                    : 'bg-primary-light hover:bg-primary-light/80 text-primary-dark'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-primary-main text-white hover:bg-primary-main/80'
                    : 'bg-gradient-to-r from-primary-main to-accent-copper text-white hover:from-primary-main/90 hover:to-accent-copper/90'
                } shadow-md hover:shadow-lg`}
              >
                {isAdminMode ? "View Mode" : "Admin Mode"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="mb-6 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-primary-main' : 'text-primary-main/60'
              }`} />
              <input
                type="text"
                placeholder="Search profiles by name, role, or location..."
                className={`w-full pl-10 pr-4 py-3 rounded-full transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-primary-dark border-primary-main/20 focus:border-primary-main text-white placeholder-primary-main/60'
                    : 'bg-white border-primary-main/10 focus:border-primary-main text-primary-dark placeholder-primary-main/60'
                } border focus:ring-2 focus:ring-primary-main focus:ring-opacity-50`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isAdminMode ? (
              <AdminPanel
                profiles={profiles}
                setProfiles={setProfiles}
                isDarkMode={isDarkMode}
              />
            ) : (
              <ProfileList
                profiles={filteredProfiles}
                onProfileSelect={handleProfileSelect}
                selectedProfile={selectedProfile}
                isDarkMode={isDarkMode}
              />
            )}
          </div>

          <div className={`lg:w-1/2 h-[700px] rounded-2xl shadow-xl overflow-hidden border transition-colors duration-200 ${
            isDarkMode
              ? 'bg-primary-dark/50 border-primary-main/20'
              : 'bg-white border-primary-main/10'
          }`}>
            {isLoading ? (
              <div className={`h-full flex items-center justify-center ${
                isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-light/10'
              }`}>
                <div className="text-center">
                  <Loader className={`h-8 w-8 animate-spin mx-auto ${
                    isDarkMode ? 'text-primary-main' : 'text-primary-main'
                  }`} />
                  <p className={`mt-2 ${
                    isDarkMode ? 'text-primary-main' : 'text-primary-main'
                  }`}>Loading map...</p>
                </div>
              </div>
            ) : (
              <Map selectedProfile={selectedProfile} isDarkMode={isDarkMode} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;