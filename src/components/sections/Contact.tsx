import { useTranslations } from 'next-intl';
import { Mail, MapPin, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="w-full py-24 md:py-32">
      
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          {t('section_title')}
        </h2>
        
        <p className="mb-10 text-lg leading-relaxed text-neutral-600">
          {t('section_desc')}
        </p>

        {/* ข้อมูลติดต่อพื้นฐาน */}
        <div className="mb-10 flex flex-col items-center gap-4 text-neutral-600 sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span className="font-medium">{t('email')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">{t('location')}</span>
          </div>
        </div>

        {/* ปุ่ม Action หลัก 2 ปุ่ม */}
        <div className="flex flex-col w-full gap-4 sm:w-auto sm:flex-row">
          {/* ปุ่มส่งอีเมล (ใช้ mailto:) */}
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${t('email')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-8 font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            <Mail className="h-4 w-4" />
            {t('btn_email')}
          </a>

          {/* ปุ่มดาวน์โหลด Resume (ลิงก์ไปหาไฟล์ PDF ใน public folder) */}
          <a
            href="/files/Khunnapat Thubphung Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-8 font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2"
          >
            <FileText className="h-4 w-4" />
            {t('btn_resume')}
          </a>
        </div>

        {/* เส้นคั่นบางๆ */}
        <div className="my-12 w-16 border-t border-neutral-200"></div>

        {/* ช่องทาง Social Links */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/Pemadee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-neutral-900"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a 
            href="https://linkedin.com/in/khunnapat-thubphung-42b7573a8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-[#0A66C2]"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>

      </div>
      
    </section>
  );
}