import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { useAuth } from '../../context/AuthContext';
import { notificationAPI } from '../../services/api';
import { Search, Bell, ExternalLink, Sparkles } from 'lucide-react';

interface DashboardLayoutProps {
  role: 'brand' | 'creator';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { user } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const res = await notificationAPI.getNotifications();
        if (res.data.success) {
          setUnreadNotifications(res.data.unreadCount || 0);
        }
      } catch (err) {
        // silent fail
      }
    };
    fetchNotificationCount();
  }, []);

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex h-screen bg-collabrix-onyx overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar role={role} />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar Header matching screenshot */}
        <header className="h-20 bg-collabrix-onyx border-b border-collabrix-borderVelvet px-8 flex items-center justify-between shrink-0">
          {/* Search bar */}
          <form onSubmit={handleGlobalSearch} className="relative w-80 max-w-md hidden sm:block">
            <Search className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search creators, tools, campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-full pl-10 pr-4 py-2 text-xs text-collabrix-pearlDust placeholder:text-collabrix-mutedText focus:outline-none focus:border-collabrix-roseGold/60 transition-colors"
            />
          </form>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Quick Demo Switcher info */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-collabrix-velvet/60 border border-collabrix-roseGold/20 text-[11px] text-collabrix-roseGlimmer">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>MongoDB Connected</span>
            </div>

            {/* Notifications */}
            <Link
              to={role === 'brand' ? '/brand/notifications' : '/creator/notifications'}
              className="relative p-2.5 rounded-full bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40 text-collabrix-pearlDust hover:text-collabrix-roseGlimmer transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-collabrix-roseGold text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Link>

            {/* If Creator, 'View Public Profile' button */}
            {role === 'creator' && user?.creatorProfileId && (
              <Link
                to={`/creator-profile/${user.creatorProfileId}`}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-medium text-collabrix-roseGlimmer hover:bg-collabrix-velvetLight transition-colors"
              >
                <span>View Public Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-collabrix-borderVelvet">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover border border-collabrix-roseGold/40"
              />
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-collabrix-pearlDust leading-tight">{user?.name}</p>
                <p className="text-[10px] text-collabrix-roseGold font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body with Velvet / Pearl surface */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-collabrix-onyx via-collabrix-velvet/40 to-collabrix-onyx p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
