import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';

// ประกาศ Interface ตามโครงสร้าง JSON
interface EducationItem {
  degree: string;
  university: string;
  duration: string;
  honors: string;
  gpa: string;
  description: string;
}

export default function Education() {
  const t = useTranslations('Education');
  const items = t.raw('items') as EducationItem[];

  return (
    <section id="education" className="w-full border-b border-neutral-100 py-20">
      
      <div className="mb-12 pt-10">
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-neutral-900">
          {t('section_title')}
        </h2>

        {/* Timeline Container */}
        <div className="relative ml-4 border-l-2 border-neutral-100 pl-8 md:ml-8 md:pl-12">
          
          {items.map((item, index) => (
            <div key={index} className="relative mb-12 max-w-4xl">
              
              {/* Timeline Dot (ใส่ไอคอนหมวกรับปริญญาเพื่อความแตกต่างจาก Experience) */}
              <div className="absolute -left-[49px] top-6 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-neutral-900 shadow-sm md:-left-[65px]">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              
              {/* Card Content */}
              <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                
                <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                  {item.degree}
                </h3>
                
                <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm font-medium text-neutral-500">
                  <span className="text-neutral-700">{item.university}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{item.duration}</span>
                </div>
                
                {/* Badges: โชว์ผลการเรียนเด่นๆ ทันทีที่เหลือบมอง */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    🏆 {item.honors}
                  </span>
                  <span className="rounded-md bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    {item.gpa}
                  </span>
                </div>
                
                <p className="mt-5 text-base leading-relaxed text-neutral-600">
                  {item.description}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}