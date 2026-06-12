import React from 'react';
import { BookOpen, Scale, Award, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  progressPercentage: number;
  quizScore: { correct: number; total: number; submittedCount: number };
}

export default function Header({ progressPercentage, quizScore }: HeaderProps) {
  return (
    <header className="bg-indigo-900 text-white border-b border-indigo-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Narrative Title */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-750 rounded-lg text-white shadow-md border border-indigo-700 mt-1">
              <Scale className="h-5.5 w-5.5" id="header-logo-icon" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-200 rounded border border-indigo-850 font-bold tracking-wider uppercase">
                  Malaysia Business Law
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-850 font-bold">
                  Interactive Study
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-display font-bold tracking-tight mt-0.5 text-white">
                合伙企业 (Partnership) vs 有限责任合伙 (LLP/PLT)
              </h1>
              <p className="text-[11px] text-indigo-200 transition-all">
                马来西亚企业架构深度互动笔记 & 智能化综合测评
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-end md:self-center">
            {/* Study Progress */}
            <div className="bg-indigo-850 rounded-lg p-2.5 border border-indigo-700/60 flex flex-col items-end min-w-[110px]">
              <span className="text-[9px] uppercase tracking-wider font-mono text-indigo-200 flex items-center gap-1 font-semibold">
                <BookOpen className="h-2.5 w-2.5 text-indigo-300" />
                阅读与学习进度
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-bold font-display text-white">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-indigo-950 h-1 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Quiz Progress */}
            <div className="bg-indigo-850 rounded-lg p-2.5 border border-indigo-700/60 flex flex-col items-end min-w-[110px]">
              <span className="text-[9px] uppercase tracking-wider font-mono text-indigo-200 flex items-center gap-1 font-semibold">
                <Award className="h-2.5 w-2.5 text-emerald-400" />
                自测应答得分
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                {quizScore.submittedCount > 0 ? (
                  <>
                    <span className="text-base font-bold font-display text-emerald-400">
                      {quizScore.correct}
                    </span>
                    <span className="text-[10px] text-indigo-200">/ {quizScore.total} 题</span>
                  </>
                ) : (
                  <span className="text-xs font-semibold text-indigo-200 py-0.5">未开始测试</span>
                )}
              </div>
              <div className="w-full bg-indigo-950 h-1 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${quizScore.total > 0 ? (quizScore.submittedCount / quizScore.total) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
