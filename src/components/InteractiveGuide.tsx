import React, { useState } from 'react';
import { 
  Users, Shield, Landmark, Scale, FileSpreadsheet, FileText, 
  UserCheck, HelpCircle, Save, Plus, Trash2, Calendar, ClipboardCheck, Sparkles 
} from 'lucide-react';
import { NoteItem } from '../types';

interface InteractiveGuideProps {
  notes: NoteItem[];
  onAddNote: (sectionId: string, text: string) => void;
  onDeleteNote: (id: string) => void;
  onSectionRead: (sectionId: string) => void;
  readSections: string[];
}

export default function InteractiveGuide({ 
  notes, 
  onAddNote, 
  onDeleteNote, 
  onSectionRead, 
  readSections 
}: InteractiveGuideProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'legal' | 'tax' | 'admin'>('all');
  const [noteInput, setNoteInput] = useState<{ [key: string]: string }>({});
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);

  const sections = [
    {
      id: 'partnership',
      title: '合伙企业 (Partnership) —— “同甘共苦”模式',
      subtitle: '适合小型家庭生意、传统合伙行业。成员与企业命运深度绑定。',
      color: 'amber',
      icon: Users,
      points: [
        {
          title: '法律主体 (Legal Entity)',
          text: '非独立法人。你在法律上等同于公司，所有的合同、纠纷都直指合伙人个人。以合伙人私人名字或注册商号对外运营。',
          highlight: '非独立法人：你就是公司，公司就是你。'
        },
        {
          title: '责任制度 (Liability)',
          text: '承担无限连带责任。若债务爆雷，债权人可向法庭申请查封、清算任何一位合伙人的私人房屋、轿车、存款等，即使债务是另一位合伙人私下签定的。',
          highlight: '无限连带责任：个人财产无保护屏障！'
        },
        {
          title: '生命周期 (Perpetuality)',
          text: '高度脆弱。任何一位合伙人去世、破产、退出或精神失常，除非合伙协议另有强力约定，否则合伙企业在法律上可能自动面临解散。',
          highlight: '寿命脆弱：人员变动极易引发公司重组。'
        },
        {
          title: '税务结构 (Taxation)',
          text: '透明纳税 (Tax Transparency)。合伙企业本身不缴纳公司税，所有盈余利润直接按比例分摊给合伙人，计入个人收入，按马来西亚个人所得税率 (0% 至 30%) 纳税。',
          highlight: '按个人所得税（阶梯式最高 30%）缴税。'
        }
      ]
    },
    {
      id: 'llp',
      title: '有限责任合伙 (LLP/PLT) —— “现代综合体”模式',
      subtitle: '结合了合伙制的灵活性与有限公司的防火墙优势。初创企业的黄金选择。',
      color: 'emerald',
      icon: Shield,
      points: [
        {
          title: '法律主体 (Legal Entity)',
          text: '独立的法人实体。能在法律上以 PLT 自身名义购买房地、开立商业银行账户、签署合同并进行诉讼。与合伙人生死、财产独立。',
          highlight: '独立法人：与合伙人身份彻底分离。'
        },
        {
          title: '责任制度 (Liability)',
          text: '有限责任。合伙人对外部债务的责任仅限于其投入该 LLP 的出资数额。其名下私人住宅、个人豪车受法律盾牌保护，实现物理隔离。',
          highlight: '有限责任：构建高额资产隔离护城河！'
        },
        {
          title: '生命周期 (Perpetuality)',
          text: '永久延续。任何合伙人的变动（不论死亡、退出、破产还是新进）完全不会对于该 LLP 企业的法律存在造成任何形式的改变或终结。',
          highlight: '永久延续：企业生命力强，便于长线规划。'
        },
        {
          title: '关键管理角色 (Key Role)',
          text: '法定必须委任至少一名合规官 (Compliance Officer)。合规官必须是合伙人之一或合格的公司秘书，负责确保向 SSM 报备、递交偿付能力声明。',
          highlight: '强制设置合规官，承担合规把关重责。'
        }
      ]
    }
  ];

  const tableData = [
    {
      category: 'legal',
      rowId: 'identity',
      metric: '法律身份 (Separate legal entity)',
      partnership: '❌ 否（个人与企业绑定）',
      llp: '✅ 是（独立法人实体）',
      explanation: 'LLP 拥有独立的法人人格，可以自身名义持有财产、起诉与被诉；而普通合伙不过是合伙人们的集合称呼。'
    },
    {
      category: 'legal',
      rowId: 'liability',
      metric: '债务承担 (Liability of Partners)',
      partnership: '⚠️ 无限连带责任（连累个人财产）',
      llp: '🛡️ 有限责任（以出资额为限，隔离风险）',
      explanation: '普通合伙下，债权人能追索所有合伙人的私人财产；LLP 下，合伙人民事责任有限，个人财产绝对安全。'
    },
    {
      category: 'admin',
      rowId: 'members',
      metric: '成员人数限制 (Min/Max Members)',
      partnership: '2 至 20 人',
      llp: '2 人起（无最高上限）',
      explanation: '合伙企业上限20人。LLP 能够吸纳无限多个合伙人，适合大型共同体或连锁创业。'
    },
    {
      category: 'admin',
      rowId: 'audit',
      metric: '账目审计要求 (Audit Requirements)',
      partnership: '无需审计',
      llp: '通常无需审计（除非协议有强制要求）',
      explanation: '两者通常都省去了每年高昂的外部审计师账目审计费（Sdn Bhd 则必须强制审计，这是 LLP 相比 Sdn Bhd 的一大省钱点）。'
    },
    {
      category: 'admin',
      rowId: 'compliance',
      metric: '日常合规/行政要求',
      partnership: '极低（几乎无年报义务）',
      llp: '中等（每年递交年报及偿付声明、设合规官）',
      explanation: 'LLP 获得有限责任保护的代价是需要接受 SSM 规管，每年必须在限期内呈报。'
    },
    {
      category: 'tax',
      rowId: 'taxation',
      metric: '所得税制 (Tax Mechanism)',
      partnership: '透明纳税 (分摊至个人按个人税率计征)',
      llp: '单独计征 (按公司税率：首15k-60w利润15%-17%)',
      explanation: '合伙企业把利润传给个人纳税，若个人税级高则税负重达 30%。LLP 享受低企业税优惠，是极佳的节税合规载体。'
    },
    {
      category: 'admin',
      rowId: 'setup',
      metric: '设立与维持费用',
      partnership: '极度廉价 (SSM 注册费仅需每年 RM30-RM60)',
      llp: '中等偏低 (SSM 成立规规费 RM500，逐年年报)',
      explanation: '普通合伙企业近乎无开销，LLP 介于普通合伙和 Sdn Bhd 之间，性价比特高。'
    }
  ];

  const filteredRows = tableData.filter(
    row => activeTab === 'all' || row.category === activeTab
  );

  const handleSaveNote = (sectionId: string) => {
    const text = noteInput[sectionId]?.trim();
    if (!text) return;
    onAddNote(sectionId, text);
    setNoteInput(prev => ({ ...prev, [sectionId]: '' }));
  };

  return (
    <div className="space-y-6">
      
      {/* 🚀 Interactive Introduction Cards with Navigation Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sections.map(section => {
          const IconComponent = section.icon;
          const isRead = readSections.includes(section.id);
          const sectionNotes = notes.filter(n => n.sectionId === section.id);

          return (
            <div 
              key={section.id}
              className={`relative bg-white rounded-lg border transition-all duration-200 shadow-xs hover:shadow-sm overflow-hidden ${
                section.id === 'llp' 
                  ? 'border-emerald-100 hover:border-emerald-250' 
                  : 'border-amber-100 hover:border-amber-250'
              }`}
              id={`section-${section.id}`}
            >
              
              {/* Header block */}
              <div className={`p-4 border-b flex items-start gap-3.5 ${
                section.id === 'llp' ? 'bg-emerald-50/40' : 'bg-amber-50/40'
              }`}>
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  section.id === 'llp' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  <IconComponent className="h-5 w-5" id={`icon-${section.id}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span className="truncate">{section.title}</span>
                    <button
                      onClick={() => onSectionRead(section.id)}
                      className={`text-[10px] ml-2 px-2.5 py-0.5 rounded border transition-all cursor-pointer shrink-0 ${
                        isRead 
                          ? 'bg-slate-105 text-slate-500 border-slate-205 font-medium' 
                          : section.id === 'llp'
                            ? 'bg-emerald-600 text-white border-emerald-550 hover:bg-emerald-700 font-bold'
                            : 'bg-amber-600 text-white border-amber-555 hover:bg-amber-700 font-bold'
                      }`}
                    >
                      {isRead ? '✓ 已读' : '标记已读'}
                    </button>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 mt-0.5">{section.subtitle}</p>
                </div>
              </div>

              {/* Core Knowledge Points */}
              <div className="p-4 space-y-3">
                {section.points.map((point, idx) => (
                  <div key={idx} className="group relative bg-slate-50/40 rounded-lg p-3 border border-slate-100 hover:bg-white hover:border-indigo-150 transition-all">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-display">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${section.id === 'llp' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {point.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{point.text}</p>
                    <div className="mt-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100/80 text-slate-700 border-l-2 inline-block max-w-full truncate" style={{ borderLeftColor: section.id === 'llp' ? '#059669' : '#d97706' }}>
                      {point.highlight}
                    </div>
                  </div>
                ))}
              </div>

              {/* 📝 Interactive Notebook Section inside the card */}
              <div className="bg-slate-50/70 p-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-[10px] font-mono tracking-wider text-slate-500 font-bold uppercase flex items-center gap-1">
                    <FileText className="h-3 w-3 text-slate-400" />
                    我的学习随笔 ({sectionNotes.length})
                  </h4>
                  <span className="text-[9px] text-slate-400">输入心得保存</span>
                </div>

                {/* Notes List */}
                {sectionNotes.length > 0 ? (
                  <div className="space-y-1.5 mb-2.5 max-h-36 overflow-y-auto pr-1">
                    {sectionNotes.map(note => (
                      <div key={note.id} className="bg-white p-2 rounded-md border border-slate-200/85 shadow-3xs flex items-start justify-between gap-1.5 group/item">
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-slate-700 break-words whitespace-pre-wrap leading-relaxed">{note.text}</p>
                          <span className="text-[8px] font-mono text-slate-400 block mt-0.5">{note.timestamp}</span>
                        </div>
                        <button 
                          onClick={() => onDeleteNote(note.id)}
                          className="p-1 text-slate-350 hover:text-rose-500 hover:bg-rose-50 rounded transition-all opacity-0 group-hover/item:opacity-100 shrink-0"
                          title="删除笔记"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic mb-2.5">暂无笔记，写下第一条随堂心得吧...</p>
                )}

                {/* Input Area */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={noteInput[section.id] || ''}
                    onChange={(e) => setNoteInput(prev => ({ ...prev, [section.id]: e.target.value }))}
                    placeholder="例如: LLP 无需审计，能省下每年 RM2000..."
                    className="flex-1 text-[11px] bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveNote(section.id);
                    }}
                  />
                  <button 
                    onClick={() => handleSaveNote(section.id)}
                    className="px-2.5 py-1.5 bg-slate-800 text-white hover:bg-slate-700 text-[11px] font-bold rounded transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Plus className="h-3 w-3" />
                    保存
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 📊 Beautiful Interactive Comparison Table with Deep Insight Highlighting */}
      <div className="bg-white rounded-lg border border-slate-205 shadow-xs overflow-hidden" id="interactive-comparison-table-section">
        <div className="p-4 border-b border-slate-150 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <FileSpreadsheet className="h-4.5 w-4.5 text-indigo-600" />
              二维关键差异对比表
            </h3>
            <p className="text-[11px] text-slate-500">点击任意行可展开该指标的司法实务深度解析，助您洞察底层逻辑。</p>
          </div>
          
          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-200/60 p-0.5 rounded-lg self-start">
            {[
              { id: 'all', label: '全部指标' },
              { id: 'legal', label: '法律 & 债务' },
              { id: 'tax', label: '税务安排' },
              { id: 'admin', label: '设立 & 报审' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setHighlightedRow(null);
                }}
                className={`text-[11px] px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-white text-indigo-900 shadow-3xs border border-slate-200/40' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-55/40 text-slate-500 text-[10px] font-mono font-bold tracking-wider border-b border-slate-150 uppercase">
                <th className="py-2.5 px-4 w-[22%]">比照指标</th>
                <th className="py-2.5 px-4 w-[34%]">普通合伙企业 (Partnership)</th>
                <th className="py-2.5 px-4 w-[34%]">有限责任合伙 (LLP/PLT)</th>
                <th className="py-2.5 px-3 text-center w-[10%]">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {filteredRows.map((row) => {
                const isExpanded = highlightedRow === row.rowId;
                return (
                  <React.Fragment key={row.rowId}>
                    <tr 
                      onClick={() => setHighlightedRow(isExpanded ? null : row.rowId)}
                      className={`cursor-pointer transition-all ${
                        isExpanded 
                          ? 'bg-indigo-50/30' 
                          : 'hover:bg-slate-55/15'
                      }`}
                    >
                      <td className="py-3 px-4 font-display font-semibold text-xs text-slate-800">
                        {row.metric}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600">
                        <span className="inline-block">
                          {row.partnership}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-700">
                        <span className="inline-block font-semibold text-emerald-800">
                          {row.llp}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center text-xs">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-all ${
                          isExpanded 
                            ? 'bg-indigo-900 text-white' 
                            : 'bg-slate-105 text-slate-600 hover:bg-indigo-50 hover:text-indigo-900'
                        }`}>
                          {isExpanded ? '收起' : '解读'}
                        </span>
                      </td>
                    </tr>

                    {/* Explanatory Row */}
                    {isExpanded && (
                      <tr className="bg-indigo-50/10">
                        <td colSpan={4} className="py-2 px-4">
                          <div className="flex gap-2 items-start bg-white rounded-r-md border-y border-r border-slate-200 border-l-4 border-indigo-600 p-3 shadow-3xs">
                            <Sparkles className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[9px] font-mono font-bold text-indigo-700 uppercase tracking-wider">
                                💡 深度实务见解 / Real-world Insights
                              </span>
                              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                {row.explanation}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50/70 p-3 border-t border-slate-150 text-[10px] text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span><b>使用小提示：</b>在上表中点击任意一行指标，可揭开马来西亚公司委员(SSM)对该项目的底层制度要求。</span>
        </div>
      </div>

    </div>
  );
}
