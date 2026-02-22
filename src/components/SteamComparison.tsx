"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const rows = [
  ["게임 발견", "알고리즘 추천", "스트리머 라이브 큐레이션"],
  ["스트리머 보상", "없음", "판매 수수료 5-15%"],
  ["수수료", "30%", "15%"],
  ["투명성", "블랙박스", "블록체인 기반 투명"],
];

export default function SteamComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-dark2 py-24" ref={ref}>
      <div className="container px-4">
        <h2 className="section-title mb-10 text-3xl font-bold text-white">
          Steam vs Enter.fun
        </h2>
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <table className="min-w-[680px] w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray">구분</th>
                <th className="px-4 py-3 text-right text-sm text-white/50">Steam</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-mint">Enter.fun</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <motion.tr
                  key={row[0]}
                  className="border-b border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <td className="px-4 py-3 text-sm text-gray">{row[0]}</td>
                  <td className="px-4 py-3 text-right text-sm text-white/80">{row[1]}</td>
                  <td className="px-4 py-3 text-right text-sm text-mint font-semibold">
                    {row[2]}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
