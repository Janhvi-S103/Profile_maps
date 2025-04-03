import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, X } from 'lucide-react';
import { Profile } from '../types';

interface AdminPanelProps {
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
  isDarkMode: boolean;
}

interface ProfileFormData {
  name: string;
  description: string;
  image: string;
  address: string;
  coordinates: [number, number];
  interests: string;
  email: string;
  phone: string;
}

const emptyFormData: ProfileFormData = {
  name: '',
  description: '',
  image: '',
  address: '',
  coordinates: [20.5937, 78.9629],
  interests: '',
  email: '',
  phone: '',
};

const AdminPanel: React.FC<AdminPanelProps> = ({ profiles, setProfiles, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>(emptyFormData);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setProfiles(profiles.filter(profile => profile.id !== id));
    }
  };

  const handleEdit = (profile: Profile) => {
    setIsEditing(true);
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      description: profile.description,
      image: profile.image,
      address: profile.address,
      coordinates: profile.coordinates,
      interests: profile.interests.join(', '),
      email: profile.contact.email,
      phone: profile.contact.phone,
    });
  };

  const handleAdd = () => {
    setIsEditing(true);
    setEditingProfile(null);
    setFormData(emptyFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profileData: Profile = {
      id: editingProfile?.id || Math.max(...profiles.map(p => p.id), 0) + 1,
      name: formData.name,
      description: formData.description,
      image: formData.image,
      address: formData.address,
      coordinates: formData.coordinates,
      interests: formData.interests.split(',').map(i => i.trim()),
      contact: {
        email: formData.email,
        phone: formData.phone,
      },
    };

    if (editingProfile) {
      setProfiles(profiles.map(p => p.id === editingProfile.id ? profileData : p));
    } else {
      setProfiles([...profiles, profileData]);
    }

    setIsEditing(false);
    setEditingProfile(null);
    setFormData(emptyFormData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProfile(null);
    setFormData(emptyFormData);
  };

  if (isEditing) {
    return (
      <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode
          ? 'bg-primary-dark border border-primary-main/20'
          : 'bg-white border border-primary-main/10'
        }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-semibold ${isDarkMode
              ? 'text-white'
              : 'bg-gradient-to-r from-primary-main to-accent-copper text-transparent bg-clip-text'
            }`}>
            {editingProfile ? 'Edit Profile' : 'Add New Profile'}
          </h2>
          <button
            onClick={handleCancel}
            className={`p-2 rounded-full transition-colors ${isDarkMode
                ? 'text-primary-main hover:bg-primary-main/20'
                : 'text-primary-main hover:bg-primary-main/10'
              }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-primary-dark border-primary-main/20 text-white'
                  : 'bg-white border-primary-main/10 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-primary-dark border-primary-main/20 text-white'
                  : 'bg-white border-primary-main/10 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-primary-dark border-primary-main/20 text-white'
                  : 'bg-white border-primary-main/10 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-primary-dark border-primary-main/20 text-white'
                  : 'bg-white border-primary-main/10 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Latitude
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.coordinates[0]}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: [parseFloat(e.target.value), formData.coordinates[1]]
                })}
                className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                    ? 'bg-primary-dark border-primary-main/20 text-white'
                    : 'bg-white border-primary-main/10 text-gray-900'
                  }`}
                required
              />
            </div>
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Longitude
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.coordinates[1]}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: [formData.coordinates[0], parseFloat(e.target.value)]
                })}
                className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                    ? 'bg-primary-dark border-primary-main/20 text-white'
                    : 'bg-white border-primary-main/10 text-gray-900'
                  }`}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Interests (comma-separated)
            </label>
            <input
              type="text"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-primary-dark border-primary-main/20 text-white'
                  : 'bg-white border-primary-main/10 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-primary-dark border-primary-main/20 text-white'
                  : 'bg-white border-primary-main/10 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-primary-dark border-primary-main/20 text-white'
                  : 'bg-white border-primary-main/10 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className={`px-6 py-2 rounded-full transition-all ${isDarkMode
                  ? 'bg-primary-main/20 text-primary-main hover:bg-primary-main/30'
                  : 'bg-primary-main/10 text-primary-main hover:bg-primary-main/20'
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-full transition-all shadow-md hover:shadow-lg ${isDarkMode
                  ? 'bg-primary-main text-white hover:bg-primary-main/80'
                  : 'bg-gradient-to-r from-primary-main to-accent-copper text-white hover:from-primary-main/90 hover:to-accent-copper/90'
                }`}
            >
              {editingProfile ? 'Save Changes' : 'Add Profile'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-semibold ${isDarkMode
            ? 'text-white'
            : 'bg-gradient-to-r from-primary-main to-accent-copper text-transparent bg-clip-text'
          }`}>
          Manage Profiles
        </h2>
        <button
          onClick={handleAdd}
          className={`flex items-center px-6 py-2 rounded-full transition-all shadow-md hover:shadow-lg ${isDarkMode
              ? 'bg-accent-copper text-white hover:bg-accent-copper/80'
              : 'bg-gradient-to-r from-accent-copper to-accent-brown text-white hover:from-accent-copper/90 hover:to-accent-brown/90'
            }`}
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add New Profile
        </button>
      </div>

      {profiles.map((profile) => (
        <div
          key={profile.id}
          className={`rounded-2xl shadow-md p-6 hover:shadow-lg transition-all ${isDarkMode
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
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{profile.name}</h3>
              <p className="text-primary-main">{profile.description}</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-primary-light/80' : 'text-gray-500'
                }`}>{profile.address}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(profile)}
                className={`p-2 rounded-full transition-colors ${isDarkMode
                    ? 'text-primary-main hover:bg-primary-main/20'
                    : 'text-primary-main hover:bg-primary-main/10'
                  }`}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(profile.id)}
                className={`p-2 rounded-full transition-colors ${isDarkMode
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