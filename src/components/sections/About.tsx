'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function About() {
  const t = useTranslations('About');

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    }
  };

  const richText = {
    highlight: (chunks: React.ReactNode) => (
        <span className="font-semibold text-neutral-600">
        {chunks}
        </span>
    ),
   };

  return (
    <section id="about" className="min-h-screen py-20 border-b border-neutral-100">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-12 text-neutral-900">
          {t('heading')}
        </motion.h2>

        {/* นำ Grid ออก และใช้ max-w-6xl เพื่อจำกัดไม่ให้บรรทัดยาวทะลุขอบจอจนอ่านยาก */}
        <motion.div 
          variants={fadeUp} 
          className="font-light max-w-6xl space-y-6 text-xl text-neutral-600 leading-relaxed text-justify"
        >
        <p>{t.rich('p1', richText)}</p>
        <p>{t.rich('p2', richText)}</p>
        <p>{t.rich('p3', richText)}</p>
 
          
          <blockquote className="mt-10 border-l-4 border-neutral-900 pl-6 py-2 italic text-xl text-neutral-800 font-medium">
            "{t('p4')}"
          </blockquote>
        </motion.div>

      </motion.div>
    </section>
  );
}