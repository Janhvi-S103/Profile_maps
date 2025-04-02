import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Profile } from '../types';

interface ProfileListProps {
  profiles: Profile[];
  onProfileSelect: (profile: Profile) => void;
  selectedProfile: Profile | null;
  isDarkMode: boolean;
}

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  onProfileSelect,
  selectedProfile,
  isDarkMode,
}) => {
  return (
    <div className="space-y-6">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className={`rounded-2xl shadow-md overflow-hidden transition-all transform hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-primary-dark border border-primary-main/20' 
              : 'bg-white border border-primary-main/10'
          } ${
            selectedProfile?.id === profile.id 
              ? isDarkMode 
                ? 'ring-2 ring-primary-main shadow-lg' 
                : 'ring-2 ring-primary-main shadow-lg'
              : ''
          }`}
        >
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={profile.image}
                alt={profile.name}
                className="h-24 w-24 rounded-xl object-cover shadow-md"
              />
              <div className="flex-1">
                <h3 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{profile.name}</h3>
                <p className="text-primary-main font-medium">{profile.description}</p>
                <div className="mt-3 space-y-2">
                  <div className={`flex items-center ${
                    isDarkMode ? 'text-primary-light' : 'text-gray-600'
                  }`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{profile.address}</span>
                  </div>
                  <div className={`flex items-center space-x-4 text-sm ${
                    isDarkMode ? 'text-primary-light/80' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{profile.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{profile.contact.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDarkMode
                        ? 'bg-primary-main/20 text-primary-main'
                        : 'bg-primary-main/10 text-primary-main'
                    }`}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={`px-6 py-4 flex justify-between items-center ${
            isDarkMode
              ? 'bg-primary-main/10'
              : 'bg-gradient-to-r from-primary-light/30 to-primary-main/10'
          }`}>
            <button
              onClick={() => onProfileSelect(profile)}
              className={`px-6 py-2 rounded-full transition-all shadow-sm hover:shadow-md ${
                isDarkMode
                  ? 'bg-primary-main text-white hover:bg-primary-main/80'
                  : 'bg-gradient-to-r from-primary-main to-accent-copper text-white hover:from-primary-main/90 hover:to-accent-copper/90'
              }`}
            >
              View on Map
            </button>
            <button
              onClick={() => onProfileSelect(profile)}
              className={`font-medium ${
                isDarkMode
                  ? 'text-primary-main hover:text-primary-main/80'
                  : 'text-primary-main hover:text-primary-main/80'
              }`}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;