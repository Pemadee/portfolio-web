'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Maximize2, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { X } from 'lucide-react';
// ประกาศ Type สำหรับข้อมูล Media และ Project
interface MediaItem {
  type: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  media: MediaItem[];
}

// ========================================================
// คอมโพเนนต์ย่อย: สำหรับจัดการ Card 1 ใบ (เพื่อแยก State สไลด์ไม่ให้ตีกัน)
// ========================================================
const SingleProjectCard = ({ project }: { project: Project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State สำหรับควบคุม Modal
  const videoRef = useRef<HTMLVideoElement>(null); // ตัวอ้างอิงถึงวิดีโอเพื่อสั่ง Play/Pause

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % project.media.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + project.media.length) % project.media.length);

  const currentMedia = project.media[currentIndex];

  // Logic: เล่นวิดีโออัตโนมัติเมื่อเลื่อนจอมาถึง (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // โผล่เข้ามาในจอเกิน 50% ให้เล่น
            videoRef.current?.play().catch(() => console.log("Autoplay blocked by browser"));
          } else {
            // เลื่อนออกนอกจอให้หยุด (ประหยัดแบตเตอรี่)
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
  }, [currentIndex]); 

  // Logic: ล็อกไม่ให้เว็บด้านหลัง Scroll ได้เวลาเปิด Modal
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      
      <div className="group relative mb-6 flex h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-100 sm:h-72">
        
        {/* รูปภาพ (คลิกที่รูปเพื่อเปิด Modal) */}
        {currentMedia.type === 'image' && (
          <Image
            src={currentMedia.url}
            alt={project.title}
            fill
            className="cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-w-7xl) 50vw, 100vw"
            priority={currentIndex === 0}
            onClick={() => setIsModalOpen(true)}
          />
        )}

        {/* วิดีโอ (ตัด Overlay ทิ้ง และใส่ controls ให้กดเปิดเสียงเองได้) */}
        {currentMedia.type === 'video' && (
          <video
            ref={videoRef}
            src={currentMedia.url}
            muted // ปิดเสียงเป็นค่า Default ตามที่คุณต้องการ
            loop
            playsInline
            controls // ให้ User กด Unmute หรือกรอวิดีโอได้เอง
            className="h-full w-full object-cover"
          />
        )}

        {/* ปุ่มไอคอนขยายเต็มจอ */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="absolute left-3 top-3 z-10 rounded-full bg-black/60 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/80 group-hover:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {project.media.length > 1 && (
          <>
            <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium tracking-widest text-white backdrop-blur-sm">
              {currentIndex + 1} / {project.media.length}
            </div>
            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-2 z-10 rounded-full bg-white/80 p-1.5 text-neutral-800 opacity-0 shadow-sm backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-2 z-10 rounded-full bg-white/80 p-1.5 text-neutral-800 opacity-0 shadow-sm backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100">
              <ChevronRight className="h-3 w-5" />
            </button>
          </>
        )}
      </div>

      <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
      <p className="mt-3 flex-grow leading-relaxed text-neutral-600">{project.description}</p>
      
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
            {tag}
          </span>
        ))}
      </div>

      {/* ==================== FULLSCREEN MODAL LIGHTBOX ==================== */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setIsModalOpen(false)} // คลิกที่ว่างๆ เพื่อปิด
        >
          {/* ปุ่ม X ปิด Modal */}
          <button className="absolute right-4 top-4 z-[110] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>

          {/* กล่องแสดงเนื้อหา (ใส่ stopPropagation เพื่อไม่ให้คลิกรูปแล้ว Modal ปิด) */}
          <div className="relative flex h-full w-full max-w-6xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {currentMedia.type === 'image' ? (
              <Image src={currentMedia.url} alt={project.title} fill className="object-contain" sizes="100vw" priority />
            ) : (
              // ใน Modal จะปล่อยให้เล่นพร้อมเสียง (หรือ User ปรับเองผ่าน controls)
              <video src={currentMedia.url} controls autoPlay className="h-full w-full object-contain" />
            )}

            {project.media.length > 1 && (
              <>
                <button onClick={prevSlide} className="absolute left-0 z-10 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 sm:-left-12">
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button onClick={nextSlide} className="absolute right-0 z-10 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 sm:-right-12">
                  <ChevronRight className="h-8 w-8" />
                </button>
                <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[110] text-sm tracking-widest text-white/70">
                  {currentIndex + 1} / {project.media.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================================
// คอมโพเนนต์หลัก: ตัว Section ที่ครอบ Card ทั้งหมด
// ========================================================
export default function ProjectCard() {
  const t = useTranslations('Projects');
  const featuredProjects = t.raw('items') as Project[];

  return (
    <section id="featured-projects" className="w-full border-b border-neutral-100 py-20">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-neutral-900">
        {t('section_title')}
      </h2>
      
      {/* 2 ฝั่ง Grid (1 คอลัมน์บนมือถือ, 2 คอลัมน์บน Desktop) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <SingleProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}