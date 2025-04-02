import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2 } from 'lucide-react';
import { Profile } from '../types';

interface AdminPanelProps {
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
  isDarkMode: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profiles, setProfiles, isDarkMode }) => {
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const handleDelete = (id: number) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-semibold ${
          isDarkMode
            ? 'text-white'
            : 'bg-gradient-to-r from-primary-main to-accent-copper text-transparent bg-clip-text'
        }`}>
          Manage Profiles
        </h2>
        <button className={`flex items-center px-6 py-2 rounded-full transition-all shadow-md hover:shadow-lg ${
          isDarkMode
            ? 'bg-accent-copper text-white hover:bg-accent-copper/80'
            : 'bg-gradient-to-r from-accent-copper to-accent-brown text-white hover:from-accent-copper/90 hover:to-accent-brown/90'
        }`}>
          <UserPlus className="h-5 w-5 mr-2" />
          Add New Profile
        </button>
      </div>

      {profiles.map((profile) => (
        <div 
          key={profile.id} 
          className={`rounded-2xl shadow-md p-6 hover:shadow-lg transition-all ${
            isDarkMode
              ? 'bg-primary-dark border border-primary-main/20'
              : 'bg-white border border-primary-main/10'
          }`}
        >
          <div className="flex items-center">
            <img
              src={profile.image}
              alt={profile.name}
              className="h-16 w-16 rounded-xl object-cover shadow-md"
            />
            <div className="ml-4 flex-1">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{profile.name}</h3>
              <p className="text-primary-main">{profile.description}</p>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-primary-light/80' : 'text-gray-500'
              }`}>{profile.address}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(profile)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? 'text-primary-main hover:bg-primary-main/20'
                    : 'text-primary-main hover:bg-primary-main/10'
                }`}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(profile.id)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? 'text-red-500 hover:bg-red-500/20'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;