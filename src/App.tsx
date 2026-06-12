import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InteractiveGuide from './components/InteractiveGuide';
import QuizSection from './components/QuizSection';
import TaxCalculator from './components/TaxCalculator';
import ComplianceChecklist from './components/ComplianceChecklist';
import { NoteItem } from './types';
import { 
  BookOpen, Trophy, Landmark, ShieldCheck, Scale, 
  HelpCircle, Sparkles, MessageSquareCode, FileDown 
} from 'lucide-react';

export default function App() {
  // Navigation Workspaces state
  const [activeTab, setActiveTab] = useState<'guide' | 'quiz' | 'tax' | 'compliance'>('guide');

  // Interactive study notes state
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('malaysia_partnership_notes');
    return saved ? JSON.parse(saved) : [];
  });

  // Track read sections for reading progress
  const [readSections, setReadSections] = useState<string[]>(() => {
    const saved = localStorage.getItem('malaysia_partnership_read');
    return saved ? JSON.parse(saved) : [];
  });

  // State for Quizzes
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem('malaysia_partnership_answers');
    return saved ? JSON.parse(saved) : {};
  });
  const [quizSubmitted, setQuizSubmitted] = useState<{ [key: number]: boolean }>(() => {
    const saved = localStorage.getItem('malaysia_partnership_submitted');
    return saved ? JSON.parse(saved) : {};
  });

  // Comprehensive study score tracking
  const [scoreStat, setScoreStat] = useState({ correct: 0, total: 5, submittedCount: 0 });

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('malaysia_partnership_notes', JSON.stringify(notes));
  }, [notes]);

  // Save read sections
  useEffect(() => {
    localStorage.setItem('malaysia_partnership_read', JSON.stringify(readSections));
  }, [readSections]);

  // Save quiz progress
  useEffect(() => {
    localStorage.setItem('malaysia_partnership_answers', JSON.stringify(quizAnswers));
    localStorage.setItem('malaysia_partnership_submitted', JSON.stringify(quizSubmitted));
  }, [quizAnswers, quizSubmitted]);

  // Add customized study notes helper
  const handleAddNote = (sectionId: string, text: string) => {
    const newNote: NoteItem = {
      id: Date.now().toString(),
      sectionId,
      text,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('zh-CN')
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleSectionRead = (sectionId: string) => {
    if (!readSections.includes(sectionId)) {
      setReadSections(prev => [...prev, sectionId]);
    } else {
      setReadSections(prev => prev.filter(id => id !== sectionId));
    }
  };

  // State handles for quizzes
  const handleQuizAnswerChange = (questionId: number, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleQuizAnswerSubmit = (questionId: number) => {
    setQuizSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted({});
    localStorage.removeItem('malaysia_partnership_answers');
    localStorage.removeItem('malaysia_partnership_submitted');
  };

  // Calculate comprehensive percentage progress bar index
  // 1. Reading sections (2 items): 40% (20% each)
  // 2. Quiz submissions (5 items): 40% (8% each)
  // 3. Simple notes count (at least 1 note): 20%
  const calculateComprehensiveProgress = () => {
    let readingPoints = readSections.length * 20; // max 40
    let quizPoints = Object.keys(quizSubmitted).length * 8; // max 40
    let notePoints = notes.length > 0 ? 20 : 0; // max 20
    return Math.min(100, readingPoints + quizPoints + notePoints);
  };

  const progressPercentage = calculateComprehensiveProgress();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between" id="applet-viewport-root">
      
      {/* Dynamic Header */}
      <Header 
        progressPercentage={progressPercentage}
        quizScore={scoreStat}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Quick Orientation Deck */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-5 md:p-6 rounded-lg border border-indigo-950 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none transform translate-x-12 -translate-y-12">
            <Landmark className="h-96 w-96 text-white" />
          </div>
          
          <div className="space-y-1.5 relative z-10 max-w-3xl">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 bg-indigo-500/25 text-indigo-300 rounded border border-indigo-500/30">
              🇲🇾 2026 马来西亚最新公司法令精析
            </span>
            <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white">
              选对出海/创业模式，避开连带民事雷区
            </h2>
            <p className="text-[11px] md:text-xs text-indigo-200 leading-relaxed font-sans">
              许多大中华区企业家、高管、以及大马本地合伙新手在成立企业时经常纠结于<b>普通公司合伙 (Partnership)</b>
              还是<b>有限责任合伙 (LLP/PLT)</b>。前者几乎无开销，但面临极其高危的「债台高筑、全家买单」惩罚。
              通过这份特制的互动法治笔记，您可以在三分钟内彻底掌握其中差别，精准算好税负收益账！
            </p>
          </div>

          <div className="flex md:flex-col justify-between shrink-0 gap-3 w-full md:w-auto p-3.5 bg-indigo-950/60 border border-indigo-900 rounded-lg relative z-10">
            <div className="text-left">
              <span className="text-[9px] text-indigo-300 font-mono font-semibold">MY NOTEBOOK STATUS</span>
              <div className="text-base font-bold font-display text-white mt-0.5">
                {notes.length} 条心得
              </div>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-indigo-300 font-mono font-semibold">STUDY PREFERENCE</span>
              <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                {readSections.length === 2 ? '🎓 已全部研读' : '📖 研读进行中'}
              </div>
            </div>
          </div>
        </div>

        {/* 🎛️ Workspace Selector Control Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 bg-slate-105 p-1 rounded-xl border border-slate-200/60 shadow-xs">
          {[
            { id: 'guide', label: '📘 核心知识 & 深度对比', desc: '同甘共苦 vs 护城河保障', icon: BookOpen },
            { id: 'quiz', label: '🧠 互动自测挑战 (5题)', desc: '测试你的合规等级排水分', icon: Trophy },
            { id: 'tax', label: '📊 智能税务转换器', desc: '模拟合伙个税 vs LLP企业税', icon: Scale },
            { id: 'compliance', label: '🛡️ 合规官安全排雷', desc: '免除 SSM 高额行政罚单', icon: ShieldCheck }
          ].map(tab => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-left p-3 rounded-lg transition-all cursor-pointer border flex flex-col justify-between h-full ${
                  isActive 
                    ? 'bg-indigo-900 border-indigo-900 text-white shadow-xs' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <TabIcon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  {tab.id === 'guide' && readSections.length === 2 && (
                    <span className="text-[9px] px-1 py-0.5 bg-emerald-500 text-white rounded font-bold">已读</span>
                  )}
                  {tab.id === 'quiz' && scoreStat.submittedCount === 5 && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-indigo-500 text-white rounded font-bold">{scoreStat.correct} / {scoreStat.total} 分</span>
                  )}
                </div>
                <div className="mt-2.5">
                  <h4 className="text-[11px] font-bold leading-tight font-display">{tab.label}</h4>
                  <p className={`text-[10px] mt-0.5 leading-snug ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>{tab.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 💻 Render Active Workspace Section */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'guide' && (
            <InteractiveGuide 
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onSectionRead={handleSectionRead}
              readSections={readSections}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizSection 
              onQuizResultUpdate={setScoreStat}
              answers={quizAnswers}
              submitted={quizSubmitted}
              onAnswerChange={handleQuizAnswerChange}
              onAnswerSubmit={handleQuizAnswerSubmit}
              onResetQuiz={handleResetQuiz}
            />
          )}

          {activeTab === 'tax' && (
            <TaxCalculator />
          )}

          {activeTab === 'compliance' && (
            <ComplianceChecklist />
          )}
        </div>

        {/* 💡 Extra FAQ Section Footer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6" id="faq-interactive-guide-footer">
          <h3 className="font-display text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <HelpCircle className="h-4.5 w-4.5 text-indigo-600" />
            学界实务答疑 (FAQ Panel)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-900">
                Q1：已经注册了普通 Partnership，之后可以无缝无伤地转换（Convert）到 LLP 吗？
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <b>当然可以！</b> 大马 SSM 全力支持注册改组转换。转换后，您的公司名称将由原有普通商号，
                变为加挂 PLT 后缀。同时，<b>原合伙企业的所有商业资产、合同债务会依法自动转移并承继给新的 LLP 实相中。</b> 
                需要注意：在转换前累积欠下的历史债务，合伙人依旧需要背负此前的无限连带责任。
              </p>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-900">
                Q2：马来西亚专业审计所 (Audit Firm) 或律师所 (Law Firm) 也可以成立 LLP 吗？
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <b>完全可以。</b> 事实上，LLP 架构起初在马来西亚设计的核心客群，就是服务于那些被行业监管条例限制、
                因不能成立 Sdn Bhd 公司而饱受无限责任之苦的专业服务人士（审计师、特许会计师、执业律师、估值师等）。
                通过 PLT 架构，专业合伙人不仅享有合规审计便利，更是多了一件防御合规执业事故无限索赔的实体法律外衣！
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Humble Aesthetic Page Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-center text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-sans">
            © 2026 Malaysia Partnership & PLT Guide • 互动学习笔记系统
          </p>
          <div className="font-mono text-[10px] text-slate-500 flex justify-center items-center gap-2">
            <span>LLD / LHDN Compliant Rules</span>
            <span>•</span>
            <span>Pure React 19 Client-Side Simulator</span>
            <span>•</span>
            <span>Secure Storage Persisted</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
