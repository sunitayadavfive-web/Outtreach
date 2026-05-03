import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Trash2, 
  LogOut, 
  LayoutDashboard, 
  MessageSquare, 
  Star, 
  Users, 
  ArrowLeft,
  ArrowRight,
  Phone,
  Flame,
  Filter,
  CheckCircle2,
  Bot
} from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [data, setData] = useState<{requests: any[], comments: any[], bookings?: any[], insights?: any[], reviews?: any[]}>({ requests: [], comments: [], bookings: [], insights: [], reviews: [] });
  const [activeTab, setActiveTab] = useState<'requests' | 'comments' | 'bookings' | 'insights' | 'reviews'>('requests');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const passcode = localStorage.getItem('op_pass') || "";
  
  const [newInsight, setNewInsight] = useState({
    title: '',
    category: 'Growth Marketing',
    coverImage: '',
    sections: [{ heading: '', content: '', image: '' }],
    question: ''
  });
  const [addingInsight, setAddingInsight] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/data?passcode=${passcode}`);
      if (res.status === 401) {
        localStorage.removeItem('op_pass');
        onBack();
        return;
      }
      const json = await res.json();
      setData(prev => ({ ...prev, ...json }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type: 'requests' | 'comments' | 'bookings' | 'insights' | 'reviews', id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!window.confirm(`Delete this ${type.slice(0, -1)}?`)) return;
    try {
      await fetch(`/api/data/${type}/${id}?passcode=${passcode}`, { method: 'DELETE' });
      setSelectedItem(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingInsight(true);
    try {
      const res = await fetch(`/api/insights?passcode=${passcode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInsight)
      });
      if (res.ok) {
          setNewInsight({
            title: '',
            category: 'Growth Marketing',
            coverImage: '',
            sections: [{ heading: '', content: '', image: '' }],
            question: ''
          });
          fetchData();
          alert("Insight published successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to publish insight.");
    } finally {
      setAddingInsight(false);
    }
  };

  if (loading) return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-accent-yellow border-t-transparent rounded-full animate-spin"></div>
      <div className="text-xl font-mono uppercase tracking-[0.3em] font-bold animate-pulse">Accessing Vault...</div>
    </div>
  );

  const filteredData = () => {
      const collection = data[activeTab] || [];
      return collection.filter((item: any) => {
          if (filter === 'all') return true;
          if (activeTab === 'comments') return item.postId === filter;
          
          const itemDate = new Date(item.createdAt).getTime();
          const now = Date.now();
          if (filter === 'today') return now - itemDate < 86400000;
          if (filter === 'week') return now - itemDate < 86400000 * 7;
          return true;
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-50 text-black"
    >
      {/* Header */}
      <header className="bg-black text-white px-[5%] py-6 sticky top-0 z-50 flex justify-between items-center shadow-lg border-b border-white/5">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <ArrowLeft className="w-6 h-6 group-hover:translate-x-[-2px] transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-accent-yellow" /> Dashboard
            </h1>
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest mt-1">Operational Hub v3.0</p>
          </div>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('op_pass'); onBack(); }}
          className="flex items-center gap-2 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2.5 hover:bg-red-500 hover:text-white transition-all rounded-sm uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" /> Secure Exit
        </button>
      </header>

      <main className="px-[5%] py-12 max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <div className="flex gap-1 bg-black/5 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
            {(['requests', 'comments', 'bookings', 'insights', 'reviews'] as const).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => { setActiveTab(tab); setFilter('all'); }}
                  className={`flex-1 min-w-max flex items-center justify-center gap-3 py-3 px-6 rounded-md font-bold text-xs uppercase transition-all duration-300 ${activeTab === tab ? 'bg-white text-black shadow-md' : 'hover:bg-white/50 opacity-60'}`}
                >
                  {tab === 'requests' && <Users className={`w-4 h-4 ${activeTab === tab ? 'text-accent-yellow' : ''}`} />}
                  {tab === 'comments' && <MessageSquare className={`w-4 h-4 ${activeTab === tab ? 'text-accent-yellow' : ''}`} />}
                  {tab === 'bookings' && <Phone className={`w-4 h-4 ${activeTab === tab ? 'text-accent-yellow' : ''}`} />}
                  {tab === 'insights' && <TrendingUp className={`w-4 h-4 ${activeTab === tab ? 'text-accent-yellow' : ''}`} />}
                  {tab === 'reviews' && <Star className={`w-4 h-4 ${activeTab === tab ? 'text-accent-yellow' : ''}`} />}
                  <span className="capitalize">{tab}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ml-1 ${activeTab === tab ? 'bg-black text-white' : 'bg-black/10 text-black'}`}>{data[tab]?.length || 0}</span>
                </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-white border border-black/5 p-2 rounded-lg shadow-sm w-full md:w-auto">
            <Filter className="w-4 h-4 opacity-30 ml-2" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-widest outline-none cursor-pointer pr-4"
            >
              <option value="all">View All</option>
              {activeTab === 'comments' ? (
                <>
                  <option value="logo">Logo Page</option>
                  <option value="growth">Growth Page</option>
                  <option value="ads">Ads Page</option>
                  <option value="ai">AI Page</option>
                </>
              ) : (
                <>
                  <option value="today">Today</option>
                  <option value="week">Past 7 Days</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'insights' && (
             <form onSubmit={handleCreateInsight} className="bg-white p-6 md:p-8 rounded-xl border border-black/10 shadow-sm mb-12">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-black/10 uppercase tracking-tight">Build New Insight Article</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Title</label>
                    <input 
                      type="text" 
                      required
                      value={newInsight.title}
                      onChange={e => setNewInsight({...newInsight, title: e.target.value})}
                      className="w-full bg-neutral-100 p-3 rounded-lg border-none focus:ring-2 focus:ring-accent-yellow font-bold uppercase text-sm"
                      placeholder="ENTER INSIGHT TITLE..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Category</label>
                    <select
                      value={newInsight.category}
                      onChange={e => setNewInsight({...newInsight, category: e.target.value})}
                      className="w-full bg-neutral-100 p-3 rounded-lg border-none focus:ring-2 focus:ring-accent-yellow font-bold uppercase text-sm"
                    >
                      <option value="Growth Marketing">Growth Marketing</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Paid Ads">Paid Ads</option>
                      <option value="AI Automation">AI Automation</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Cover Image URL</label>
                  <input 
                    type="url" 
                    value={newInsight.coverImage}
                    onChange={e => setNewInsight({...newInsight, coverImage: e.target.value})}
                    className="w-full bg-neutral-100 p-3 rounded-lg border-none focus:ring-2 focus:ring-accent-yellow font-mono text-sm"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="mb-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400">Article Sections</label>
                    <button 
                      type="button"
                      onClick={() => setNewInsight({...newInsight, sections: [...newInsight.sections, { heading: '', content: '', image: '' }]})}
                      className="text-xs font-bold text-accent-yellow bg-black px-3 py-1.5 rounded-full hover:bg-black/80 transition-colors"
                    >
                      + ADD SECTION
                    </button>
                  </div>

                  {newInsight.sections.map((section, idx) => (
                    <div key={idx} className="bg-neutral-50 p-4 border border-black/5 rounded-lg relative group">
                      {newInsight.sections.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => {
                            const newSections = [...newInsight.sections];
                            newSections.splice(idx, 1);
                            setNewInsight({...newInsight, sections: newSections});
                          }}
                          className="absolute top-4 right-4 text-red-500 opacity-60 hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="mb-4">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Section Heading</label>
                        <input 
                          type="text" 
                          value={section.heading}
                          onChange={e => {
                            const newSections = [...newInsight.sections];
                            newSections[idx].heading = e.target.value;
                            setNewInsight({...newInsight, sections: newSections});
                          }}
                          className="w-full bg-white p-2 rounded border border-black/5 focus:ring-2 focus:ring-accent-yellow font-bold text-sm"
                          placeholder="e.g. The Truth About Growth"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Section Content</label>
                        <textarea 
                          rows={4}
                          required={idx === 0}
                          value={section.content}
                          onChange={e => {
                            const newSections = [...newInsight.sections];
                            newSections[idx].content = e.target.value;
                            setNewInsight({...newInsight, sections: newSections});
                          }}
                          className="w-full bg-white p-2 rounded border border-black/5 focus:ring-2 focus:ring-accent-yellow resize-none text-sm"
                          placeholder="Write section content..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Section Image URL (Optional)</label>
                        <input 
                          type="url" 
                          value={section.image}
                          onChange={e => {
                            const newSections = [...newInsight.sections];
                            newSections[idx].image = e.target.value;
                            setNewInsight({...newInsight, sections: newSections});
                          }}
                          className="w-full bg-white p-2 rounded border border-black/5 focus:ring-2 focus:ring-accent-yellow font-mono text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-8 pt-6 border-t border-black/10">
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Final Call-to-Action Question (Optional)</label>
                  <input 
                    type="text"
                    value={newInsight.question}
                    onChange={e => setNewInsight({...newInsight, question: e.target.value})}
                    className="w-full bg-neutral-100 p-3 rounded-lg border-none focus:ring-2 focus:ring-accent-yellow font-bold text-sm"
                    placeholder="e.g. What is your brand's biggest bottleneck?"
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={addingInsight}
                    className="bg-accent-yellow text-black font-bold uppercase py-3 px-8 hover:brightness-110 transition-all rounded-sm flex justify-center items-center gap-2 tracking-widest cursor-pointer disabled:opacity-50"
                  >
                    {addingInsight ? "Publishing..." : "Publish Insight"}
                  </button>
                </div>
              </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData().length === 0 ? (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-black/10 rounded-2xl">
              <p className="text-neutral-400 font-mono uppercase tracking-widest">No entries found in this section</p>
            </div>
          ) : (
            filteredData().map((item: any) => (
              <motion.div 
                layoutId={item.id}
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
                    <button 
                      onClick={(e) => handleDelete(activeTab, item.id, e)}
                      className="text-red-500 opacity-60 hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold mb-1 truncate">{activeTab === 'requests' ? item.fullName : (activeTab === 'bookings' ? item.name : item.title || item.name)}</h3>
                  <p className="text-xs text-neutral-500 mb-4 truncate italic">{item.email || item.category || item.postId}</p>
                  <div className="bg-neutral-50 p-3 rounded-lg border border-black/5">
                    <p className="text-[9px] uppercase font-bold tracking-widest opacity-30 mb-1">Preview</p>
                    <p className="text-sm font-medium truncate opacity-70">
                        {item.goals || item.problem || item.comment || item.text || (item.sections?.[0]?.content) || "No preview available."}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center">
                  <span className="text-[9px] font-bold uppercase text-accent-yellow tracking-widest">View Full Record</span>
                  <ArrowRight className="w-4 h-4 opacity-20 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              layoutId={selectedItem.id}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="bg-black text-white p-8 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-50 mb-1 block">
                    {activeTab.slice(0, -1).toUpperCase()} Record
                  </span>
                  <h2 className="text-2xl font-bold uppercase tracking-tight">
                    {activeTab === 'requests' ? selectedItem.fullName : (activeTab === 'bookings' ? selectedItem.name : selectedItem.title || selectedItem.name)}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>

              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                {activeTab === 'requests' ? (
                  <>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-2">Email Address</p>
                        <p className="font-mono text-base font-medium border-b border-black/5 pb-2">{selectedItem.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-2">Brand/Website</p>
                        <p className="text-base font-bold text-accent-yellow border-b border-black/5 pb-2 uppercase">{selectedItem.brand}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-l-4 border-accent-yellow pl-3">Growth Goals</p>
                      <div className="bg-neutral-50 p-6 rounded-xl border border-black/5 italic leading-relaxed text-lg shadow-inner">
                        "{selectedItem.goals}"
                      </div>
                    </div>
                  </>
                ) : activeTab === 'bookings' ? (
                  <>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-2">Contact Info</p>
                        <p className="font-mono text-sm font-medium">{selectedItem.email}</p>
                        <p className="font-mono text-sm font-bold text-accent-yellow">{selectedItem.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-2">Business Type</p>
                        <p className="text-base font-bold uppercase">{selectedItem.businessName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-l-4 border-accent-yellow pl-3">Description</p>
                      <div className="bg-neutral-50 p-4 rounded-xl border border-black/5 italic text-sm mb-6">
                        "{selectedItem.brandDescription}"
                      </div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-l-4 border-red-500 pl-3">Core Problem</p>
                      <div className="bg-red-50 p-6 rounded-xl border border-red-100 italic leading-relaxed text-lg shadow-inner">
                        "{selectedItem.problem}"
                      </div>
                    </div>
                  </>
                ) : activeTab === 'insights' ? (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-black text-white text-[10px] px-3 py-1 font-bold uppercase rounded-full">{selectedItem.category}</span>
                            <span className="text-neutral-400 font-mono text-[10px] uppercase">{new Date(selectedItem.createdAt).toLocaleDateString()}</span>
                        </div>
                        {selectedItem.coverImage && (
                            <img referrerPolicy="no-referrer" src={selectedItem.coverImage} alt="Cover" className="w-full h-40 object-cover rounded-xl mb-6 shadow-md" />
                        )}
                        <div className="space-y-6">
                            {selectedItem.sections?.map((s: any, i: number) => (
                                <div key={i} className="border-b border-black/5 pb-4">
                                    <h4 className="font-bold text-lg mb-2">{s.heading}</h4>
                                    <p className="text-sm opacity-80 whitespace-pre-wrap">{s.content}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : activeTab === 'reviews' ? (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-black text-white text-[10px] px-3 py-1 font-bold uppercase rounded-full">Rating: {selectedItem.rating} Stars</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-l-4 border-accent-yellow pl-3">Review Content</p>
                      <div className="bg-neutral-50 p-8 rounded-xl border border-black/5 text-xl font-medium leading-relaxed italic">
                        "{selectedItem.comment}"
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-black text-white text-[10px] px-3 py-1 font-bold uppercase rounded-full">Source: {selectedItem.postId}</span>
                      <span className="text-neutral-400 font-mono text-[10px] uppercase">{selectedItem.date}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-l-4 border-black pl-3">Comment Content</p>
                      <div className="bg-neutral-50 p-8 rounded-xl border border-black/5 text-xl font-medium leading-relaxed italic">
                        "{selectedItem.text}"
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-between items-center pt-8 border-t border-black/5">
                  <span className="text-[10px] font-mono opacity-30 italic uppercase">
                    Received on: {new Date(selectedItem.createdAt || Date.now()).toLocaleString()}
                  </span>
                  <button 
                    onClick={() => handleDelete(activeTab as any, selectedItem.id)}
                    className="flex items-center gap-2 text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Record
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
