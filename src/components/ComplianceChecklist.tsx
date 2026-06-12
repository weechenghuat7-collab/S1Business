import React, { useState } from 'react';
import { ClipboardCheck, ShieldAlert, Sparkles, AlertTriangle, CheckCircle2, UserCheck, Timer } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  situation: string;
  options: { label: string; correct: boolean; penalty: string; desc: string }[];
}

export default function ComplianceChecklist() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});

  const complianceScenarios: Scenario[] = [
    {
      id: 1,
      title: '💼 地雷 1：年报与“偿付能力声明”申报 (Declaration of Solvency)',
      situation: '若您的 LLP/PLT 刚刚迎来了注册一周年纪念日。根据马来西亚 SSM 规定，合规官需要在周年日后的 14 天内完成哪些关键工作？',
      options: [
        {
          label: 'A. 仅更新一下合伙人名单，不需要呈报财务状态。',
          correct: false,
          penalty: '⚠️ 罚款高达 RM 20,000 / 甚至法律起诉！',
          desc: '错误！LLP 虽无需强制外部审计，但必须提交一份由两位合伙人签字的《偿付能力声明》（Declaration of Solvency），声明企业未来12个月内无破产清盘之虞。忘记提交是严重的 SSM 合规盲区。'
        },
        {
          label: 'B. 提交“年报 (Annual Return)”的同时，必须提交一份经签署的“偿付能力声明 (Solvency Declaration)”。',
          correct: true,
          penalty: '🎉 零罚款，完美避免合规风险！',
          desc: '正确！合规官必须在公司周年日后 14 天内，在 SSM 系统（MyLLP）提交年报并上传偿付能力声明。这是享有有限责任保护的核心合规对价。'
        }
      ]
    },
    {
      id: 2,
      title: '👤 地雷 2：合规官 (Compliance Officer) 人选空缺',
      situation: '公司原聘请的公司秘书辞职，LLP 是否可以暂时不设置合规官角色长达半年？',
      options: [
        {
          label: 'A. 不可以。必须马上安排在籍的一位合伙人或聘请新秘书担任合规官。由于必须保障该关键职能不出现中断。',
          correct: true,
          penalty: '🎉 完全合规！企业架构健康。',
          desc: '正确！马来西亚 LLP 必须时刻由至少一名合格“合规官”担任关键职责。一旦空缺，必须尽快补上，否则将面临 SSM 发出的行政违规警告甚至罚款。合伙人一员（通常是马来西亚居民）可随时接任。'
        },
        {
          label: 'B. 可以，因为 LLP 的日常交易都是合伙人在做，合规官只是个头衔，不需要实时有人。',
          correct: false,
          penalty: '⚠️ 面临 RM 10,000 行政处罚，且新合同签署可能阻滞。',
          desc: '错误！合规官是 LLP 的法定关键角色，他要对公司的违规行为承担最终甚至刑事责任。一旦该席位空缺，LLP 必须立即安排补缺。'
        }
      ]
    },
    {
      id: 3,
      title: '📁 地雷 3：商业账目与凭证的保存期限',
      situation: '为了给初创办公室腾出空间，LLP 打算把三年前的销售发票、采购单、租约和银行流水付之一炬。这种做法在马来西亚是否合法？',
      options: [
        {
          label: 'A. 合法，只要年度报税已经搞定，旧凭证就不再需要保留。',
          correct: false,
          penalty: '💥 面临最高 RM 50,000 罚款，面临内陆税收局 LHDN 追税纠纷！',
          desc: '错误！不论是普通合伙还是 LLP，根据马来西亚公司法与税法规定，所有的会计原始账目、收据、银行业记账、凭单等必须在当地妥善【安全保存至少 7 年】，以便税务局或公司注册处进行稽查。'
        },
        {
          label: 'B. 不合法。所有的商业基础凭证、收据、往来流水必须自该年度结束起【妥善保存至少 7 年】。',
          correct: true,
          penalty: '🎉 安全合规！无惧税务稽查与随机抽检。',
          desc: '正确！7年的凭证保留期是硬性法律规定。即使公司中途改组，该保留义务依然存续，且可采取电子备份（需原件清晰且防篡改）与纸质共存方式。'
        }
      ]
    }
  ];

  const handleOptionClick = (scenarioId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [scenarioId]: optionIdx }));
    setShowResults(prev => ({ ...prev, [scenarioId]: true }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" id="compliance-officer-checklist-section">
      
      {/* Header Panel */}
      <div className="p-6 border-b border-slate-100 bg-linear-to-r from-red-50/40 to-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-100 rounded-lg text-rose-700">
            <ShieldAlert className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-800 flex items-center gap-1.5">
              合规官排雷大作战 (Compliance Officer Safety Challenge)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              LLP 架构虽然极富性价比，但如果忽视了 SSM 的法定底线，合规官将承担最高个人责任。
              通过下面 3 个核心雷区决策，测试您能否全身而退！
            </p>
          </div>
        </div>
      </div>

      {/* Scenarios lists */}
      <div className="p-6 space-y-6 divide-y divide-slate-100">
        {complianceScenarios.map((scenario, index) => {
          const selectedIdx = selectedAnswers[scenario.id];
          const hasSubmitted = showResults[scenario.id];

          return (
            <div key={scenario.id} className={`pt-6 ${index === 0 ? 'pt-0' : ''}`}>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold font-mono text-white mt-0.5">
                  0{scenario.id}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 font-display">
                    {scenario.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 bg-slate-50 border border-slate-100 p-3 rounded-lg leading-relaxed">
                    {scenario.situation}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {scenario.options.map((option, optIdx) => {
                      const isSelected = selectedIdx === optIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                      
                      if (hasSubmitted) {
                        if (option.correct) {
                          btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                        } else {
                          btnStyle = 'bg-white border-slate-100 text-slate-400 opacity-70';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-50 border-indigo-300 text-indigo-900';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionClick(scenario.id, optIdx)}
                          className={`text-left text-xs p-3.5 rounded-xl border transition-all relative flex flex-col justify-between h-full cursor-pointer group ${btnStyle}`}
                          disabled={hasSubmitted}
                        >
                          <span>{option.label}</span>
                          {!hasSubmitted && (
                            <span className="text-[10px] text-indigo-500 font-medium mt-2 self-end opacity-0 group-hover:opacity-100 transition-opacity">
                              选择该方案
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {hasSubmitted && (
                    <div className={`mt-3.5 rounded-xl p-4 border text-xs leading-relaxed ${
                      scenario.options[selectedIdx].correct 
                        ? 'bg-emerald-50/65 text-emerald-900 border-emerald-150' 
                        : 'bg-rose-50/65 text-rose-900 border-rose-150'
                    }`}>
                      <div className="flex items-start gap-2">
                        {scenario.options[selectedIdx].correct ? (
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-semibold flex items-center gap-1.5">
                            <span>{scenario.options[selectedIdx].correct ? '🟢 回应完美！' : '🔴 触发地雷！'}</span>
                            <span className="font-mono text-[11px] font-bold underline px-1.5 py-0.5 bg-white rounded">
                              {scenario.options[selectedIdx].penalty}
                            </span>
                          </div>
                          <p className="mt-1.5 text-slate-600">
                            {scenario.options[selectedIdx].desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Board */}
      <div className="bg-slate-50 border-t border-slate-100 p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-mono text-slate-500 font-semibold uppercase">
            排雷大作战进度：{Object.keys(selectedAnswers).length} / 3 关
          </span>
        </div>
        {Object.keys(selectedAnswers).length === 3 && (
          <div className="text-[11px] text-emerald-700 bg-emerald-100/50 border border-emerald-200/50 py-1 px-3 rounded-full font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-emerald-500" />
            合规测试通关！您已完全胜任注册合规官的基础把关要求。
          </div>
        )}
      </div>

    </div>
  );
}
