import React, { useState, useEffect } from 'react';
import { notificationAPI } from '../../services/api';
import {
  Bell,
  CheckCircle2,
  Send,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationAPI.getNotifications();
      if (res.data.success) {
        setNotifications(res.data.notifications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationAPI.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await notificationAPI.markRead(id);
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-6">
        <div>
          <div className="flex items-center gap-2 text-collabrix-roseGold text-xs font-semibold uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity Feed</span>
          </div>
          <h1 className="text-2xl font-serif text-white">Notifications & Alerts</h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Real-time milestone notifications, incoming proposals, brief matching alerts, and revisions.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40 text-xs font-medium text-collabrix-roseGlimmer self-start md:self-auto transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-collabrix-mutedText">Loading activity alerts...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="py-16 text-center bg-collabrix-velvet/30 border border-collabrix-borderVelvet rounded-2xl p-8 max-w-md mx-auto">
          <Bell className="w-10 h-10 text-collabrix-roseGold mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-semibold text-white mb-1">No notifications right now</h3>
          <p className="text-xs text-collabrix-mutedText">You're completely up to date with campaigns and collaborations.</p>
        </div>
      ) : (
        <div className="space-y-3 max-w-4xl">
          {notifications.map((item) => (
            <div
              key={item._id}
              onClick={() => !item.isRead && handleMarkRead(item._id)}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                item.isRead
                  ? 'bg-collabrix-velvet/30 border-collabrix-borderVelvet opacity-80'
                  : 'bg-collabrix-velvet/70 border-collabrix-roseGold/40 shadow-luxury'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  item.type === 'proposal'
                    ? 'bg-purple-500/10 text-purple-400'
                    : item.type === 'collaboration'
                    ? 'bg-blue-500/10 text-blue-400'
                    : item.type === 'match'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-collabrix-roseGold/10 text-collabrix-roseGold'
                }`}
              >
                {item.type === 'proposal' ? (
                  <Send className="w-4 h-4" />
                ) : item.type === 'collaboration' ? (
                  <Users className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                  <span className="text-[10px] text-collabrix-mutedText">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <p className="text-xs text-collabrix-mutedText mt-1 leading-relaxed">{item.message}</p>
              </div>

              {!item.isRead && (
                <span className="w-2 h-2 rounded-full bg-collabrix-roseGold shrink-0 self-center"></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
