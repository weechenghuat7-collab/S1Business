import React, { useState } from 'react';
import { HelpCircle, AlertTriangle, CheckCircle2, XCircle, RefreshCw, Trophy, BookMarked, Award, Lightbulb } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizSectionProps {
  onQuizResultUpdate: (score: { correct: number; total: number; submittedCount: number }) => void;
  answers: { [key: number]: string };
  submitted: { [key: number]: boolean };
  onAnswerChange: (questionId: number, value: string) => void;
  onAnswerSubmit: (questionId: number) => void;
  onResetQuiz: () => void;
}

export default function QuizSection({
  onQuizResultUpdate,
  answers,
  submitted,
  onAnswerChange,
  onAnswerSubmit,
  onResetQuiz
}: QuizSectionProps) {
  const [activeHint, setActiveHint] = useState<number | null>(null);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      type: 'single',
      title: '第一部分：单项选择题 (第 1 题)',
      question: '若一家由两位合伙人成立的“合伙企业 (Partnership)”不幸发生破产且欠下银行债务，债权人是否有权查封或拍卖任何一位合伙人名下的私人轿车、房屋或储蓄存款？',
      options: [
        { value: 'A', label: '不可以，因为那是个人名下财产，法律规定与公司是彻底隔离的。' },
        { value: 'B', label: '有权查封，因为普通合伙企业的合伙人承担的是法律层面的“无限连带责任”，个人与企业是绑定关系。' },
        { value: 'C', label: '只能查封用于公司业务的那一辆商务公用车，个人日常生活工具一律不能查封。' }
      ],
      correctAnswer: 'B',
      hint: '普通合伙企业并没有独立的“法律人格”(No separate legal identity)。公司赚就是合伙人赚，公司欠就是合伙人欠。',
      explanation: '【选 B。】普通合伙企业 (Partnership) 不具备独立法人地位，合伙人需承担“无限连带责任”。一旦公司债务资不抵债，债权人可以通过司法途径，向任何一个或全部合伙人连带追索，变卖其房产、私人豪车或冻结个人储蓄账户以清偿公司债务。'
    },
    {
      id: 2,
      type: 'single',
      title: '第一部分：单项选择题 (第 2 题)',
      question: '在马来西亚 LLP (PLT) 有限责任合伙架构下，专门设立了哪一个法定核心角色，负责确保企业严格履行报备义务，并承担不当行为的相关法律行政责任？',
      options: [
        { value: 'A', label: '所有合伙人共同分担这个行政包袱（无特殊核心角色区分）。' },
        { value: 'B', label: '外聘账目核定审计师 (External Auditor)。' },
        { value: 'C', label: '合规官 (Compliance Officer)。' }
      ],
      correctAnswer: 'C',
      hint: '该角色必须是合伙人之一或者是持有准证的合格公司秘书 (Licensed Company Secretary)。',
      explanation: '【选 C。】LLP 必须委任至少一名合规官 (Compliance Officer)。合规官需要保证在规定的周年期限内向 SSM 提交年报、做溶偿证明声明，如有拖延、遗漏，合规官个人可能首当其冲面临刑事或罚款起诉。'
    },
    {
      id: 3,
      type: 'boolean',
      title: '第二部分：判断对错题 (第 3 题)',
      question: '在马来西亚境内注册的 LLP (PLT) 企业必须像私人有限公司 (Sdn Bhd) 一样，每年强制性外聘审计师进行对账和账目审计。',
      options: [
        { value: '是', label: '👍 是的，这是法定账目披露责任。' },
        { value: '否', label: '👎 否，通常无需经历强制性外部审计。' }
      ],
      correctAnswer: '否',
      hint: '这是很多中小型创业者选择 LLP/PLT 而非 Sdn Bhd 的主要资金减负原因之一。',
      explanation: '【判断：否。】LLP 绝大部分情况下享有免除年度强制性审计的政策优待，这与必须年年找外部 Audit 的私人有限公司 (Sdn Bhd) 极不相同，能够为初创公司节省几千马币的年度维护费。除非 LLP 内部合伙协议另有审计强制规定。'
    },
    {
      id: 4,
      type: 'boolean',
      title: '第二部分：判断对错题 (第 4 题)',
      question: '在合伙企业 (Partnership) 面临破产清算变卖财产时，外部债权人（如拖欠的供应商款、银行借贷）的受偿顺序永远优先于合伙人借给本公司的内部贷款。',
      options: [
        { value: '是', label: '👍 确实如此，外部优先。' },
        { value: '否', label: '👎 错误，合伙人更亲近理应先拿回自己的内部贷款。' }
      ],
      correctAnswer: '是',
      hint: '合伙法案中有明确列出清债顺序：先赔外人，再尝内股。',
      explanation: '【判断：是。】根据马来西亚合伙法案 1961（Partnership Act 1961），合伙公司清盘清偿顺位中，外部非合伙债权人享有最高受偿优先级。只有当外部所有债务出清、清零后，内部合伙人垫付的垫底贷款、内部出资的股本金额等才能依次按比分配。'
    },
    {
      id: 5,
      type: 'scenario',
      title: '第三部分：场景模拟深度应用题 (第 5 题)',
      question: '小明和小红成立了一家名为 "Creative Duo" 的普通合伙企业 (Partnership)。半年后，小明在未告知小红的情况下，私下以公司名义签下了一份 50 万马币的高端器材租赁合同，随后小明带着租来的高额财产失踪。小红是否需要为这 50 万马币的债务负责？如果这是 LLP (PLT) 架构，情况会有所不同吗？',
      options: [
        { value: 'A', label: '在 Partnership 下小红必须负连带全责偿还这50万；而在 LLP 架构下，个人资产受到有限责任隔离盾保护，小红私人不为公司债务扛雷。' },
        { value: 'B', label: '在 Partnership 下小红也不需要负责，因为是小明瞒着她自己偷偷签字的，法律认定这纯属个人越权行径。' },
        { value: 'C', label: '不管是哪种架构，小红和小明都已捆绑，两人的私人财产在所有模式下都必须被强制执行拍卖至足额偿还。' }
      ],
      correctAnswer: 'A',
      hint: '在 Partnership 中，合伙人互为公司业务上的默示代理人 (implied agent)；而 LLP 拥有独立人格。',
      explanation: '【选 A。】这是至关重要的差别！① 在普通合伙企业中，合伙人互为法定代理人。小明在正常业务运营框架内签订的 50w 租赁款，属于合伙业务，小红负有 100% 连带担保责任，债权人可以直接要求小红全部承担。② 在 LLP (PLT) 体系下，因为 LLP 是一个独立生存法人，除非小红本人参与担保，否则租赁债务由 PLT 资产来归还。小红拥有“有限责任防弹衣”，外部债权人无权追溯到她的私人房产、私人账户。这是一个真正的“避雷神盾”！'
    }
  ];

  // Dynamically compute the score & pass it back immediately with useEffect-like accuracy
  const completeStats = () => {
    let correct = 0;
    let submittedCount = 0;
    questions.forEach((q) => {
      if (submitted[q.id]) {
        submittedCount++;
        if (answers[q.id] === q.correctAnswer) {
          correct++;
        }
      }
    });
    return { correct, total: questions.length, submittedCount };
  };

  const handleSelectOption = (questionId: number, value: string) => {
    onAnswerChange(questionId, value);
  };

  const handleSubmitQuestion = (questionId: number) => {
    onAnswerSubmit(questionId);
    // After state shifts, recalculate and inform parent container dynamically
    setTimeout(() => {
      onQuizResultUpdate(completeStats());
    }, 50);
  };

  const handleReset = () => {
    onResetQuiz();
    setTimeout(() => {
      onQuizResultUpdate({ correct: 0, total: questions.length, submittedCount: 0 });
    }, 50);
  };

  const stats = completeStats();
  const isAllCompleted = stats.submittedCount === questions.length;
  const earnedScorePercent = isAllCompleted ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div className="space-y-6" id="quiz-challenge-interactive-portal">

      {/* Main header stats banner */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-linear-to-r from-indigo-50/50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2.5 items-center">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-700 shadow-sm">
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-800">
                脑力挑战：随堂自测互动环节
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                实时检测你对马来西亚合伙法案及PLT条例的掌握深度。提交后可立即查看终极解析。
              </p>
            </div>
          </div>

          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all cursor-pointer bg-white"
          >
            <RefreshCw className="h-3 w-3" />
            重做全部测试
          </button>
        </div>

        {/* Global Progress Indicators */}
        <div className="p-4 px-6 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-mono">
          <div className="flex items-center gap-2">
            <span>答题状态:</span>
            <div className="flex gap-1.5">
              {questions.map((q) => {
                const isSub = submitted[q.id];
                const isCorr = answers[q.id] === q.correctAnswer;
                return (
                  <span 
                    key={q.id}
                    className={`inline-block w-6 h-6 rounded-md text-center leading-6 font-bold text-[10px] ${
                      !isSub 
                        ? 'bg-slate-200 text-slate-500' 
                        : isCorr 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-rose-500 text-white'
                    }`}
                  >
                    {q.id}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <span>当前通过率: </span>
            <span className="font-bold font-display text-sm text-indigo-600">
              {stats.submittedCount > 0 ? Math.round((stats.correct / stats.submittedCount) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* Big reward box if all quizzes completed */}
        {isAllCompleted && (
          <div className="bg-emerald-50 border-b border-emerald-100 p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0">
              <Trophy className="h-8 w-8" id="quiz-trophy-victory" />
            </div>
            <div>
              <h4 className="font-display font-bold text-emerald-950 text-sm flex items-center gap-2">
                恭喜通关！测试回答最终得分：{stats.correct} / {stats.total} 🌸
              </h4>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                您的终极答题表现等级为：
                <span className="font-bold underline px-1 py-0.5">
                  {earnedScorePercent >= 80 ? '👑 商业架构战略官' : earnedScorePercent >= 60 ? '👨‍💼 进阶合规官' : '🌱 架构探索学徒'}
                </span>。
                精熟这些法条可以保障您在马来西亚合伙经营中最大化做到：资产安全分离、个税结构理顺、降低清算破产品性惩罚。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Questions Stack */}
      <div className="space-y-6">
        {questions.map((q) => {
          const selectedVal = answers[q.id] || '';
          const isQuestionSubmitted = submitted[q.id];
          const isCorrect = selectedVal === q.correctAnswer;

          return (
            <div 
              key={q.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isQuestionSubmitted 
                  ? isCorrect 
                    ? 'border-emerald-200 ring-1 ring-emerald-100/55' 
                    : 'border-rose-200 ring-1 ring-rose-100/55'
                  : 'border-slate-200 hover:border-slate-350 shadow-xs'
              }`}
            >
              
              {/* Question Header */}
              <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/50">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                    {q.title}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                    {q.question}
                  </h4>
                </div>

                {/* Score icon in card */}
                {isQuestionSubmitted && (
                  <div className="shrink-0 mt-1">
                    {isCorrect ? (
                      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-[10px] font-bold font-mono">正确</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                        <XCircle className="h-4 w-4" />
                        <span className="text-[10px] font-bold font-mono">错误</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Options list */}
              <div className="p-5 space-y-3.5">
                {q.options?.map((opt) => {
                  const isChecked = selectedVal === opt.value;
                  let optStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50/50';

                  if (isQuestionSubmitted) {
                    if (opt.value === q.correctAnswer) {
                      optStyle = 'border-emerald-300 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isChecked) {
                      optStyle = 'border-rose-300 bg-rose-50 text-rose-950';
                    } else {
                      optStyle = 'border-slate-100 bg-white text-slate-400 opacity-60';
                    }
                  } else if (isChecked) {
                    optStyle = 'border-indigo-500 bg-indigo-50/40 text-indigo-950 font-medium';
                  }

                  return (
                    <button
                      key={opt.value}
                      onClick={() => !isQuestionSubmitted && handleSelectOption(q.id, opt.value)}
                      disabled={isQuestionSubmitted}
                      className={`w-full text-left text-xs p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono font-bold text-[11px] ${
                        isChecked 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {opt.value}
                      </span>
                      <span className="leading-relaxed">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Actions Footer */}
              <div className="p-4 px-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                
                {/* Hint mechanism */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveHint(activeHint === q.id ? null : q.id)}
                    className="flex items-center gap-1 text-[11px] font-mono text-indigo-600 hover:text-indigo-800 transition-colors bg-white hover:bg-slate-100 border border-slate-250 px-2 py-1 rounded"
                  >
                    <Lightbulb className="h-3 w-3 text-indigo-500" />
                    {activeHint === q.id ? '隐藏提示' : '查看解题线索'}
                  </button>

                  {activeHint === q.id && (
                    <span className="text-[10px] text-indigo-900 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                      💡 {q.hint}
                    </span>
                  )}
                </div>

                {/* Question submission buttons */}
                {!isQuestionSubmitted ? (
                  <button
                    onClick={() => handleSubmitQuestion(q.id)}
                    disabled={!selectedVal}
                    className={`text-xs px-4 py-1.5 font-bold rounded-lg transition-all ${
                      selectedVal 
                        ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-xs' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    判定及递交回答
                  </button>
                ) : (
                  <div className="text-[10px] text-slate-400 font-mono">
                    已提交回答 • 合准答案：{q.correctAnswer}
                  </div>
                )}

              </div>

              {/* Explanatory detail block shown after submission */}
              {isQuestionSubmitted && (
                <div className={`p-5 px-6 border-t font-sans text-xs leading-relaxed ${
                  isCorrect 
                    ? 'bg-emerald-50/30 border-emerald-100 text-slate-700' 
                    : 'bg-rose-50/30 border-rose-100 text-slate-700'
                }`}>
                  <strong className="font-semibold block text-slate-800 mb-1">
                    📌 独家随堂解析：
                  </strong>
                  <p className="whitespace-pre-wrap leading-relaxed">{q.explanation}</p>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
