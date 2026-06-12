import React, { useState } from 'react';
import { Coins, PiggyBank, Info, Lightbulb, Users } from 'lucide-react';

const quickProfits = [100000, 250000, 500000, 750000, 1000000, 1500000];

export default function TaxCalculator() {
  const [profit, setProfit] = useState<number>(250000); // Default RM 250k
  const [numPartners, setNumPartners] = useState<number>(2); // Default 2 partners

  // Calculated Progressive Personal income tax in Malaysia (YA 2024/2025/2026 guidelines)
  const calculateIndividualTax = (income: number): number => {
    if (income <= 5000) return 0;
    
    let tax = 0;
    let remaining = income - 5000;

    // Malaysia Progressive Tax Bands:
    const bands = [
      { limit: 15000, rate: 0.01 }, // Up to 20,000
      { limit: 15000, rate: 0.03 }, // Up to 35,000
      { limit: 15000, rate: 0.06 }, // Up to 50,000
      { limit: 20000, rate: 0.11 }, // Up to 70,000
      { limit: 30000, rate: 0.19 }, // Up to 100,000
      { limit: 150000, rate: 0.24 }, // Up to 250,000
      { limit: 150000, rate: 0.25 }, // Up to 400,000
      { limit: 200000, rate: 0.26 }, // Up to 600,000
      { limit: 1400000, rate: 0.28 }, // Up to 2,000,000
      { limit: Infinity, rate: 0.30 }
    ];

    for (let i = 0; i < bands.length; i++) {
      const band = bands[i];
      if (remaining <= band.limit) {
        tax += remaining * band.rate;
        break;
      } else {
        tax += band.limit * band.rate;
        remaining -= band.limit;
      }
    }
    return tax;
  };

  // Calculated LLP corporate tax rate in Malaysia (SME status: first 150k @ 15%, next 450k @ 17%, excess @ 24%)
  const calculateLlpTax = (p: number): number => {
    if (p <= 0) return 0;
    if (p <= 150000) {
      return p * 0.15;
    } else if (p <= 600000) {
      return (150000 * 0.15) + ((p - 150000) * 0.17);
    } else {
      return (150000 * 0.15) + (450000 * 0.17) + ((p - 600000) * 0.24);
    }
  };

  const individualShareOfProfit = profit / numPartners;
  const singlePartnerTax = calculateIndividualTax(individualShareOfProfit);
  const totalPartnershipTax = singlePartnerTax * numPartners;

  const totalLlpTax = calculateLlpTax(profit);
  const taxSavings = totalPartnershipTax - totalLlpTax;

  const getRecommendation = () => {
    if (taxSavings > 0) {
      return {
        type: 'save',
        title: '极为推荐转换为 LLP 架构（具有显著税务空间与法制屏障）',
        desc: `在您当前的年利润 RM ${profit.toLocaleString()} 实数测算中，转换为 LLP (PLT) 可以帮你们合伙人整体【节省约 RM ${Math.abs(Math.round(taxSavings)).toLocaleString()} 的所得税税负】！此外，合伙利润分配给合伙人时是 Single-Tier 免税。这不仅省去了高额个税，还同时构建了个人资产护城河、隔离无限连带债务风险！`
      };
    } else {
      return {
        type: 'neutral',
        title: '税差不明显，但出于「资产安全」战略及「永久延续」考虑，仍建议升级',
        desc: `虽然计算出的纯税差偏低（约 RM ${Math.abs(Math.round(taxSavings)).toLocaleString()}），但 Partnership 需要承担「连带家产清盘」的无限民事责任。建议及早成立 LLP (PLT) 以在法律上筑造有限责任护城河，让个人存款和家庭汽车、房产在重灾或债务危机下获得绝对安全保护。`
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs" id="tax-savings-calculator-section">
      
      {/* Header Block */}
      <div className="p-4 border-b border-slate-150 bg-slate-55">
        <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <Coins className="h-4.5 w-4.5 text-amber-500" />
          马来西亚税收智算器 (Tax Conversion Simulator)
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          根据马来西亚最新内陆税税率 (LHDN)，测算在不同业务盈余下，合伙制分配
          与 有限责任合伙(LLP) 单一税制下的合并所得税，评估最佳合规临界升级点。
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: Parameters Inputs */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Profit parameter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold font-mono text-slate-550 uppercase tracking-wider flex items-center gap-1">
                年可纳税利润总额 (Annual profit):
              </label>
              <span className="text-base font-bold font-mono text-indigo-900">
                RM {profit.toLocaleString()}
              </span>
            </div>
            
            {/* Slider */}
            <input
              type="range"
              min="10000"
              max="1500000"
              step="10000"
              value={profit}
              onChange={(e) => setProfit(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-105 rounded appearance-none cursor-pointer accent-indigo-600 focus:outline-hidden"
            />
            
            {/* Quick Profit Selectors */}
            <div className="grid grid-cols-3 gap-1 mt-1.5">
              {quickProfits.map((v) => (
                <button
                  key={v}
                  onClick={() => setProfit(v)}
                  className={`text-[9px] font-mono py-1 rounded border transition-all cursor-pointer ${
                    profit === v 
                      ? 'bg-indigo-900 text-white font-bold border-indigo-950 shadow-3xs' 
                      : 'bg-slate-50 text-slate-650 border-slate-200 hover:bg-slate-105'
                  }`}
                >
                  RM {v >= 100000 ? `${v / 1000}k` : v.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Partners parameter */}
          <div className="bg-slate-50/60 rounded-lg p-3 border border-slate-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold font-mono text-slate-550 uppercase tracking-wider flex items-center gap-1">
                <Users className="h-3 w-3 text-slate-400" />
                合伙人数 (Num of Partners):
              </span>
              <span className="text-xs font-bold font-mono text-slate-700">
                {numPartners} 人 (均分)
              </span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setNumPartners(num)}
                  className={`flex-1 text-[11px] py-1 rounded border transition-all cursor-pointer font-semibold ${
                    numPartners === num
                      ? 'bg-amber-600 text-white font-bold border-amber-700 shadow-3xs'
                      : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-105'
                  }`}
                >
                  {num} 人
                </button>
              ))}
            </div>
          </div>

          {/* Educational Note in Widget */}
          <div className="text-[10px] text-slate-550 leading-relaxed bg-slate-50/50 rounded-lg p-2.5 border border-slate-150 flex gap-2">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <b>税务底层知识：</b> Partnership 利润直接分给合伙人，计入个人年度其它总所得，极易推升至个税高阶档次。而 LLP 为独立法人集中纳税，首 15k-60w 利润享 15%-17% 小微企专享低税，且派发给合伙人时<b>单层免税</b>。
            </div>
          </div>

        </div>

        {/* Right Side: Calculated visualization */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Main comparison card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Partnership tax box */}
            <div className="bg-slate-50/60 rounded-lg p-3 border border-slate-200 shadow-3xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-wider font-bold text-slate-550 uppercase">
                  普通合伙 (Partnership) 合并个税
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  分配给各自合伙人后分别缴个税：
                </p>
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-mono text-slate-400">合并总税：</span>
                <p className="text-base font-bold font-mono text-amber-750">
                  RM {Math.round(totalPartnershipTax).toLocaleString()}
                </p>
                <p className="text-[9px] font-mono text-slate-500 leading-snug mt-0.5">
                  每人分得 RM {Math.round(individualShareOfProfit).toLocaleString()} 利润<br />
                  个税：RM {Math.round(singlePartnerTax).toLocaleString()}
                </p>
              </div>
            </div>

            {/* LLP tax box */}
            <div className="bg-indigo-950 text-white rounded-lg p-3 border border-indigo-900 shadow-3xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-wider font-bold text-indigo-305 uppercase">
                  有限合伙 (LLP/PLT) 集中企业税
                </span>
                <p className="text-[10px] text-indigo-200/80 mt-0.5 leading-snug">
                  作为独立法人主体享小微优惠：
                </p>
              </div>
              <div className="mt-3">
                <span className="text-[10px] text-indigo-300/80 font-mono">合并总税：</span>
                <p className="text-base font-bold font-mono text-emerald-400">
                  RM {Math.round(totalLlpTax).toLocaleString()}
                </p>
                <p className="text-[9px] text-indigo-300 font-mono leading-snug mt-0.5">
                  首 RM 150k @ 15% <br />
                  次 RM 450k @ 17% | 余额 @ 24%
                </p>
              </div>
            </div>

          </div>

          {/* Tax difference section */}
          <div className="rounded-lg border border-slate-150 p-3 bg-slate-50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded shrink-0 ${
                taxSavings > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-105 text-slate-650'
              }`}>
                <PiggyBank className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-[9px] font-mono text-slate-500 uppercase font-bold">
                  {taxSavings > 0 ? '预估升级节税率(Tax Savings):' : '个税拆分税差偏低:'}
                </h4>
                <p className={`text-base font-bold font-mono ${
                  taxSavings > 0 ? 'text-emerald-700' : 'text-slate-700'
                }`}>
                  RM {Math.abs(Math.round(taxSavings)).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[9px] font-mono text-slate-400 font-bold">降税幅度比例</span>
              <p className={`text-base font-bold font-mono ${
                taxSavings > 0 ? 'text-emerald-700' : 'text-slate-650'
              }`}>
                {totalPartnershipTax > 0 
                  ? `${Math.abs(Math.round((taxSavings / totalPartnershipTax) * 100))}%`
                  : '0%'}
              </p>
            </div>
          </div>

          {/* Smart recommendation widget */}
          <div className={`rounded-lg p-3 border text-[11px] leading-relaxed ${
            rec.type === 'save' 
              ? 'bg-emerald-50/60 text-emerald-800 border-emerald-150'
              : rec.type === 'neutral'
                ? 'bg-slate-50 text-slate-705 border-slate-200'
                : 'bg-amber-50/60 text-amber-805 border-amber-150'
          }`}>
            <div className="flex items-start gap-1.5">
              <Lightbulb className={`h-4 w-4 shrink-0 mt-0.5 ${
                rec.type === 'save' ? 'text-emerald-600' : 'text-amber-600'
              }`} />
              <div>
                <strong className="block font-bold mb-0.5 font-display text-xs">{rec.title}</strong>
                <span className="text-slate-650 leading-relaxed">{rec.desc}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
