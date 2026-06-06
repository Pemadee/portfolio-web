'use client';

import { useTranslations,useLocale } from 'next-intl';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Component ย่อยสำหรับทำ Typewriter (ตัวอักษรโผล่มาทันทีแบบไม่มี Fade)
const TypewriterText = ({ text, delay }: { text: string; delay: number }) => (
  <motion.span
    initial="hidden"
    animate="visible"
    variants={{
      visible: { transition: { staggerChildren: 0.03, delayChildren: delay } },
    }}
  >
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0 } }, // duration: 0 คือโผล่มาทันที
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.span>
);

const BlinkingCursor = ({ delay }: { delay: number }) => {
  const locale = useLocale();

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0, 1, 1],
      }}
      transition={{
        opacity: {
          delay,
          duration: 1,
          repeat: Infinity,
          times: [0, 0.49, 0.5, 1],
        },
      }}
      className={`inline-block w-[4px] bg-neutral-900 ml-1 align-baseline -translate-y-[-0.2em] ${
        locale === 'en' ? 'h-[0.93em]' : 'h-[1.17em]'
      }`}
    />
  );
};

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();


  return (
    <section id="home" className="flex min-h-[80vh] items-center border-b border-neutral-100 py-20 overflow-hidden">
      <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
        
        {/* คอลัมน์ซ้าย: ข้อความและปุ่ม */}
        <div className="flex flex-col justify-center">
          
          <h1 className="text-4xl font-light tracking-tight sm:text-6xl">
            <TypewriterText text={t('greeting')} delay={0} /> <br /> 
            <TypewriterText text={t('iam') + ' '} delay={0.3} /> 
            <span className="font-bold text-neutral-900">
              <TypewriterText text={t('first_name')} delay={0.6} />
              {locale === 'en' ? <br /> : ' '}
              <TypewriterText text={t('last_name')} delay={0.9} />
              <BlinkingCursor delay={0.9}/> {/* <-- นำ Cursor มาวางต่อท้ายชื่อตรงนี้ */}
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-neutral-600">
            <TypewriterText text={t('role')} delay={1.2} />
          </p>
          
          {/* แถวปุ่ม: โผล่ขึ้นมาตอนพิมพ์เสร็จ (ดีเลย์ 1.6 วินาที) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button className="rounded-md border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
              {t('explore_btn')}
            </button>
            <a 
              href="https://github.com/Pemadee" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 rounded-md bg-[#24292e] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#24292e]/90 transition-colors"
            >
              <FaGithub className="text-lg" />
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 rounded-md bg-[#0077b5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0077b5]/90 transition-colors"
            >
              <FaLinkedin className="text-lg" />
              LinkedIn
            </a>
          </motion.div>
        </div>

        {/* คอลัมน์ขวา: รูปภาพโปรไฟล์ (Block Reveal Effect) */}
        <div className="flex justify-center md:justify-end">
          {/* หุ้มด้วย relative และกำหนดขนาดให้เป๊ะเพื่อครอบ Block Reveal */}
          <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full sm:h-80 sm:w-80">
            
            {/* บล็อกสีดำที่วิ่งมาปาด (Block Reveal) */}
            <motion.div
              className="absolute inset-0 z-10 bg-neutral-900"
              initial={{ left: 0, width: "0%" }}
              animate={{ left: ["0%", "0%", "100%"], width: ["0%", "100%", "0%"] }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            />
            
            {/* ตัวรูปภาพ: ซ่อนไว้ตอนแรก และเปิดเผยตอนที่บล็อกดำมาบังมิด (ดีเลย์ 0.9s) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.01, delay: 0.9 }}
              className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-500 shadow-inner"
            >
              <span>my pic</span>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}