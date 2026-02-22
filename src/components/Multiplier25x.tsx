"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const rows = [
  { name: "총 시청자", large: "50,000명", small: "50,000명" },
  { name: "평균 시청시간", large: "8분", small: "25분" },
  { name: "채팅 참여율", large: "2%", small: "35%" },
  { name: "게임 언급 반응률", large: "0.5%", small: "12%" },
  { name: "예상 전환율", large: "0.1%", small: "2.5%" },
  { name: "예상 구매자", large: "50명", small: "1,250명" },
];

export default function Multiplier25x() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-dark2 py-24" ref={ref}>
      <div className="container px-4">
        <p className="section-title text-3xl font-bold text-white">
          소형 스트리머 100명 = 25배 전환율
        </p>
        <p className="mt-3 text-gray">
          동일 비용 0,000 투자 시 성과 비교
        </p>
        <div className="mt-8 max-w-3xl overflow-x-auto mx-auto">
          <table className="min-w-[720px] w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray">지표</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray">
                  대형 1명 (0,000)
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold text-mint">
                  소형 100명 (00x100)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <motion.tr
                  key={row.name}
                  className={`border-b border-white/10 ${index === rows.length - 1 ? "font-bold" : ""}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <td className="px-4 py-3 text-sm text-gray">{row.name}</td>
                  <td className="px-4 py-3 text-right text-sm text-white">{row.large}</td>
                  <td className="px-4 py-3 text-right text-sm text-mint">{row.small}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 text-center">
          <p className="text-5xl font-extrabold text-mint">
            25x <span className="font-semibold text-gray">더 높은 전환율</span>
          </p>
        </div>
      </div>
    </section>
  );
}
