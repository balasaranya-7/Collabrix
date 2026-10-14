import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  Search,
  Bookmark,
  Send,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  Layers,
  UserCheck,
} from 'lucide-react';

interface SidebarProps {
  role: 'brand' | 'creator';
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ role }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const brandNavItems = [
    { label: 'Dashboard', path: '/brand/dashboard', icon: LayoutDashboard },
    { label: 'Create Brief', path: '/brand/create-brief', icon: PlusCircle, highlight: true },
    { label: 'Creative Briefs', path: '/brand/briefs', icon: FolderKanban },
    { label: 'Discover Creators', path: '/explore', icon: Search },
    { label: 'Saved Creators', path: '/brand/saved', icon: Bookmark },
    { label: 'Proposals', path: '/brand/proposals', icon: Send },
    { label: 'Collaborations', path: '/brand/collaborations', icon: Users },
    { label: 'Messages', path: '/brand/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/brand/notifications', icon: Bell },
    { label: 'Settings', path: '/brand/settings', icon: Settings },
  ];

  const creatorNavItems = [
    { label: 'Dashboard', path: '/creator/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/creator/profile', icon: UserCheck },
    { label: 'AI Portfolio', path: '/creator/portfolio', icon: Layers, highlight: true },
    { label: 'Campaign Opportunities', path: '/creator/opportunities', icon: Search },
    { label: 'Received Proposals', path: '/creator/proposals', icon: Send },
    { label: 'Collaborations', path: '/creator/collaborations', icon: Users },
    { label: 'Messages', path: '/creator/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/creator/notifications', icon: Bell },
    { label: 'Settings', path: '/creator/settings', icon: Settings },
  ];

  const items = role === 'brand' ? brandNavItems : creatorNavItems;

  return (
    <aside className="w-64 bg-collabrix-onyx border-r border-collabrix-borderVelvet min-h-screen flex flex-col justify-between shrink-0 select-none">
      {/* Top Section */}
      <div>
        {/* Brand / Logo */}
        <div className="h-20 px-6 flex items-center border-b border-collabrix-borderVelvet">
          <Logo />
        </div>

        {/* Role Tag */}
        <div className="px-6 py-3 border-b border-collabrix-borderVelvet/50 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-collabrix-mutedText">
            {role === 'brand' ? 'Brand Workspace' : 'Creator Studio'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-collabrix-velvet text-[10px] text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
            {role === 'brand' ? 'Agency' : 'AI Pro'}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-collabrix-velvetLight text-collabrix-roseGlimmer border border-collabrix-roseGold/40 font-semibold shadow-luxury'
                      : item.highlight
                      ? 'bg-collabrix-velvet/40 text-collabrix-roseGlimmer hover:bg-collabrix-velvet hover:text-white'
                      : 'text-collabrix-pearlDust/70 hover:bg-collabrix-velvet hover:text-collabrix-pearlDust'
                  }`
                }
              >
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-collabrix-roseGold' : ''}`} />
                <span>{item.label}</span>
                {item.highlight && (
                  <Sparkles className="w-3 h-3 ml-auto text-collabrix-roseGold animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Area */}
      <div className="p-4 border-t border-collabrix-borderVelvet bg-collabrix-velvet/30">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover border border-collabrix-roseGold/40"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-collabrix-pearlDust truncate">{user?.name}</p>
            <p className="text-[10px] text-collabrix-mutedText truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-collabrix-velvet text-xs text-collabrix-mutedText hover:text-white hover:bg-collabrix-velvetLight transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
