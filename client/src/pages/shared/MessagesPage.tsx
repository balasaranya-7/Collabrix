import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { messageAPI } from '../../services/api';
import {
  MessageSquare,
  Send,
  Sparkles,
  Search,
  User,
  Clock,
  Briefcase,
  Paperclip,
} from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConv, setSelectedConv] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await messageAPI.getConversations();
      if (res.data.success) {
        setConversations(res.data.conversations || []);
        if (res.data.conversations?.length > 0 && !selectedConv) {
          setSelectedConv(res.data.conversations[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!selectedConv) return;
    const fetchMessages = async () => {
      try {
        const res = await messageAPI.getMessages(selectedConv._id);
        if (res.data.success) {
          setMessages(res.data.messages || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [selectedConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConv) return;

    try {
      setSending(true);
      const res = await messageAPI.sendMessage(selectedConv._id, newMessage.trim());
      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.message]);
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-collabrix-onyx h-full">
      {/* Conversations List Sidebar */}
      <div className="w-80 border-r border-collabrix-borderVelvet flex flex-col bg-collabrix-onyx shrink-0">
        <div className="p-5 border-b border-collabrix-borderVelvet space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-collabrix-roseGold" />
              Direct Messages
            </h2>
          </div>
          <p className="text-[11px] text-collabrix-mutedText">
            Conversations with brands, creators, and creative directors.
          </p>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {loading ? (
            <div className="py-10 text-center text-xs text-collabrix-mutedText">Loading chats...</div>
          ) : conversations.length === 0 ? (
            <div className="py-10 text-center text-xs text-collabrix-mutedText p-4">
              No conversations yet. Inquire on a brief or send a proposal to start chatting!
            </div>
          ) : (
            conversations.map((conv) => {
              const otherUser =
                conv.participants?.find((p: any) => p._id !== user?.id) || conv.otherParticipant;
              const isSelected = selectedConv?._id === conv._id;

              return (
                <div
                  key={conv._id}
                  onClick={() => setSelectedConv(conv)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-collabrix-velvet border-collabrix-roseGold/60 shadow-luxury'
                      : 'bg-collabrix-velvet/30 border-collabrix-borderVelvet hover:border-collabrix-roseGold/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        otherUser?.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={otherUser?.name || 'User'}
                      className="w-10 h-10 rounded-full object-cover border border-collabrix-roseGold/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-white truncate">
                          {otherUser?.name || 'Collaborator'}
                        </h4>
                        <span className="text-[10px] text-collabrix-mutedText">
                          {conv.updatedAt ? new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p className="text-[11px] text-collabrix-mutedText truncate mt-0.5">
                        {conv.lastMessage?.content || conv.lastMessage || 'Connected on Collabrix'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Thread Area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col bg-collabrix-velvet/20">
          {/* Thread Header */}
          <div className="h-16 border-b border-collabrix-borderVelvet px-6 flex items-center justify-between bg-collabrix-onyx">
            <div className="flex items-center gap-3">
              <img
                src={
                  selectedConv.participants?.find((p: any) => p._id !== user?.id)?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                }
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover border border-collabrix-roseGold/30"
              />
              <div>
                <h3 className="text-xs font-semibold text-white">
                  {selectedConv.participants?.find((p: any) => p._id !== user?.id)?.name || 'Campaign Collaborator'}
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Online • AI Production Workspace
                </span>
              </div>
            </div>

            {selectedConv.brief && (
              <div className="px-3 py-1 rounded-full bg-collabrix-velvet border border-collabrix-borderVelvet text-[11px] text-collabrix-roseGlimmer flex items-center gap-1.5">
                <Briefcase className="w-3 h-3 text-collabrix-roseGold" />
                <span className="truncate max-w-[150px]">{selectedConv.brief.title || 'Campaign Context'}</span>
              </div>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="py-20 text-center text-xs text-collabrix-mutedText">
                Say hello to coordinate creative directions, prompt parameters, or delivery timelines!
              </div>
            ) : (
              messages.map((m, idx) => {
                const isMe = m.sender?._id === user?.id || m.sender === user?.id;

                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white shadow-luxury'
                          : 'bg-collabrix-velvet text-collabrix-pearlDust border border-collabrix-borderVelvet'
                      }`}
                    >
                      <p>{m.content}</p>
                      <div
                        className={`text-[9px] mt-1 text-right ${
                          isMe ? 'text-white/70' : 'text-collabrix-mutedText'
                        }`}
                      >
                        {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-collabrix-borderVelvet bg-collabrix-onyx flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Type your message, prompt note, or delivery update..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-collabrix-velvet border border-collabrix-borderVelvet rounded-2xl px-4 py-3 text-xs text-white placeholder:text-collabrix-mutedText focus:outline-none focus:border-collabrix-roseGold"
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white shadow-luxury hover:opacity-95 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-collabrix-mutedText">
          <MessageSquare className="w-12 h-12 text-collabrix-roseGold/40 mb-3" />
          <h3 className="text-base font-serif text-white mb-1">Select a conversation</h3>
          <p className="text-xs max-w-sm">
            Coordinate with creators and brand marketing directors in real time.
          </p>
        </div>
      )}
    </div>
  );
};
