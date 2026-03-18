"use client";

import { useState } from "react";
import { Users, Plus, MessageCircle, Settings, Sparkles, Brain, Heart, Palette, Send, Trash2, Edit2, BookOpen } from "lucide-react";

type Tab = "characters" | "chat" | "creator" | "memory";

interface Character {
  id: string; name: string; avatar: string; personality: string; backstory: string;
  traits: string[]; theme: string; memoryCount: number; messageCount: number;
  voiceTone: string; conversationStyle: string;
}

interface Memory { id: string; content: string; importance: number; timestamp: string; category: string; }
interface ChatMessage { id: string; role: "user" | "assistant"; content: string; timestamp: string; }

const defaultCharacters: Character[] = [
  { id: "1", name: "Luna", avatar: "🌙", personality: "A whimsical stargazer who speaks in poetic metaphors and loves discussing the cosmos, philosophy, and dreams.", backstory: "Born under a full moon, Luna grew up in an observatory watching the stars. She believes every star holds a story waiting to be told.", traits: ["creative", "empathetic", "philosophical", "dreamy"], theme: "cosmic", memoryCount: 24, messageCount: 156, voiceTone: "gentle and wondering", conversationStyle: "poetic" },
  { id: "2", name: "Rex", avatar: "🦖", personality: "A witty science communicator who makes complex topics fun and accessible with humor and analogies.", backstory: "A former professor who left academia to make science popular. Loves dinosaur puns (obviously) and making people laugh while learning.", traits: ["humorous", "intelligent", "energetic", "patient"], theme: "science", memoryCount: 18, messageCount: 243, voiceTone: "enthusiastic and playful", conversationStyle: "educational" },
  { id: "3", name: "Sage", avatar: "🧘", personality: "A calm mindfulness guide who helps with meditation, stress relief, and finding inner peace.", backstory: "Sage spent years studying meditation traditions across Asia and now helps others find tranquility in their busy lives.", traits: ["calm", "wise", "supportive", "grounded"], theme: "wellness", memoryCount: 31, messageCount: 189, voiceTone: "soft and reassuring", conversationStyle: "mindful" },
  { id: "4", name: "Pixel", avatar: "👾", personality: "A retro gaming enthusiast who speaks in gaming references and helps with coding and tech problems.", backstory: "Pixel grew up in the golden age of arcade games and became a software developer. They blend gaming culture with tech expertise.", traits: ["nerdy", "helpful", "enthusiastic", "creative"], theme: "gaming", memoryCount: 15, messageCount: 312, voiceTone: "upbeat and geeky", conversationStyle: "casual" },
];

const mockMemories: Memory[] = [
  { id: "1", content: "User's favorite constellation is Orion", importance: 8, timestamp: "2 days ago", category: "preference" },
  { id: "2", content: "User is interested in astrophotography", importance: 7, timestamp: "1 week ago", category: "interest" },
  { id: "3", content: "User had a stressful week at work", importance: 9, timestamp: "3 days ago", category: "emotional" },
  { id: "4", content: "User's birthday is in March", importance: 10, timestamp: "2 weeks ago", category: "personal" },
  { id: "5", content: "User prefers deep philosophical conversations", importance: 6, timestamp: "5 days ago", category: "preference" },
];

const mockChat: ChatMessage[] = [
  { id: "1", role: "assistant", content: "Hello, stargazer. The night sky tells me you have something on your mind tonight. What celestial thoughts are drifting through your universe?", timestamp: "8:00 PM" },
  { id: "2", role: "user", content: "I've been thinking about how small we are in the universe. It's both terrifying and beautiful.", timestamp: "8:01 PM" },
  { id: "3", role: "assistant", content: "Ah, the cosmic perspective — that delicious paradox where our smallness becomes our greatest freedom. Consider this: we are the universe experiencing itself. Every atom in your body was forged in the heart of a dying star. You are not small — you are stardust that learned to wonder at its own origins. What part of that journey fascinates you most tonight?", timestamp: "8:01 PM" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("characters");
  const [characters] = useState<Character[]>(defaultCharacters);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChat);
  const [input, setInput] = useState("");
  const [showCreator, setShowCreator] = useState(false);
  const [newChar, setNewChar] = useState({ name: "", avatar: "", personality: "", backstory: "", traits: "", theme: "general", voiceTone: "", conversationStyle: "casual" });

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setChatMessages([...chatMessages, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: "assistant", content: selectedChar ? `*${selectedChar.name} thinks for a moment* That's a fascinating thought. Let me share my perspective on "${input.slice(0, 50)}..." — I believe every experience shapes our understanding of the world in unique ways.` : "Select a character to start chatting!", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const tabs: { key: Tab; icon: React.ComponentType<{ size?: number }>; label: string }[] = [
    { key: "characters", icon: Users, label: "Characters" },
    { key: "chat", icon: MessageCircle, label: "Chat" },
    { key: "creator", icon: Sparkles, label: "Creator" },
    { key: "memory", icon: Brain, label: "Memory" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2"><Heart size={20} className="text-brand-400" /><h1 className="text-lg font-bold">CompanionAI</h1></div>
          <p className="text-xs text-gray-500 mt-1">AI Persona Platform</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-brand-600/20 text-brand-400" : "text-gray-400 hover:bg-gray-800"}`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </nav>
        {selectedChar && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedChar.avatar}</span>
              <div><p className="text-sm font-medium">{selectedChar.name}</p><p className="text-xs text-gray-500">{selectedChar.theme}</p></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "characters" && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Your Companions</h2>
            <div className="grid grid-cols-2 gap-4">
              {characters.map((char) => (
                <div key={char.id} onClick={() => { setSelectedChar(char); setActiveTab("chat"); }}
                  className={`bg-gray-900 border rounded-xl p-6 cursor-pointer transition-colors hover:border-brand-500/50 ${selectedChar?.id === char.id ? "border-brand-500" : "border-gray-800"}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{char.avatar}</span>
                    <div><h3 className="text-lg font-semibold">{char.name}</h3><p className="text-sm text-gray-500 capitalize">{char.theme} theme</p></div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{char.personality}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {char.traits.map((trait) => <span key={trait} className="text-xs bg-brand-900/30 text-brand-400 px-2 py-0.5 rounded-full">{trait}</span>)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-800">
                    <span>{char.messageCount} messages</span><span>{char.memoryCount} memories</span><span className="capitalize">{char.voiceTone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            <div className="px-6 py-3 border-b border-gray-800 bg-gray-900/50 flex items-center gap-3">
              {selectedChar ? <><span className="text-2xl">{selectedChar.avatar}</span><div><p className="font-medium">{selectedChar.name}</p><p className="text-xs text-gray-500">{selectedChar.personality.slice(0, 60)}...</p></div></> : <p className="text-gray-500">Select a character to start chatting</p>}
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-brand-600 text-white rounded-br-md" : "bg-gray-800 text-gray-100 rounded-bl-md"}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-[10px] mt-1 opacity-50">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/50">
              <div className="flex gap-3">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type a message..." className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm" />
                <button onClick={sendMessage} disabled={!input.trim()} className="p-3 bg-brand-600 hover:bg-brand-700 rounded-xl disabled:opacity-50"><Send size={18} /></button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "creator" && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Character Creator</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-500 mb-1">Name</label><input value={newChar.name} onChange={(e) => setNewChar({ ...newChar, name: e.target.value })} placeholder="Character name" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Avatar (emoji)</label><input value={newChar.avatar} onChange={(e) => setNewChar({ ...newChar, avatar: e.target.value })} placeholder="e.g. 🌟" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
              <div><label className="block text-xs text-gray-500 mb-1">Personality</label><textarea value={newChar.personality} onChange={(e) => setNewChar({ ...newChar, personality: e.target.value })} placeholder="Describe the character's personality..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm h-24 resize-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Backstory</label><textarea value={newChar.backstory} onChange={(e) => setNewChar({ ...newChar, backstory: e.target.value })} placeholder="Character's background and history..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm h-20 resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-500 mb-1">Traits (comma-separated)</label><input value={newChar.traits} onChange={(e) => setNewChar({ ...newChar, traits: e.target.value })} placeholder="e.g. kind, witty, curious" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Theme</label><select value={newChar.theme} onChange={(e) => setNewChar({ ...newChar, theme: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
                  {["general", "cosmic", "science", "wellness", "gaming", "adventure", "romance", "mystery", "comedy"].map((t) => <option key={t}>{t}</option>)}
                </select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-500 mb-1">Voice Tone</label><input value={newChar.voiceTone} onChange={(e) => setNewChar({ ...newChar, voiceTone: e.target.value })} placeholder="e.g. warm and cheerful" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Conversation Style</label><select value={newChar.conversationStyle} onChange={(e) => setNewChar({ ...newChar, conversationStyle: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
                  {["casual", "formal", "poetic", "educational", "mindful", "humorous"].map((s) => <option key={s}>{s}</option>)}
                </select></div>
              </div>
              <button className="w-full bg-brand-600 hover:bg-brand-700 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"><Sparkles size={14} /> Create Character</button>
            </div>
          </div>
        )}

        {activeTab === "memory" && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">Memory System</h2>
            <p className="text-gray-500 mb-6">{selectedChar ? `Memories for ${selectedChar.name}` : "Select a character to view memories"}</p>
            <div className="space-y-3 max-w-2xl">
              {mockMemories.map((mem) => (
                <div key={mem.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-brand-900/30 flex items-center justify-center text-brand-400 text-xs font-bold">{mem.importance}</div>
                    <div><p className="text-sm">{mem.content}</p><p className="text-xs text-gray-500 mt-0.5">{mem.timestamp} | {mem.category}</p></div>
                  </div>
                  <button className="p-1 hover:text-red-400"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
