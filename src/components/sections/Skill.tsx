import { useTranslations } from 'next-intl';
import { 
  Terminal, 
  LayoutTemplate, 
  Database, 
  BrainCircuit, 
  Cloud, 
  PenTool, 
  Globe 
} from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export default function Skill() {
  const t = useTranslations('Skill');
  const categories = t.raw('categories') as SkillCategory[];

  // ฟังก์ชันจับคู่ Icon ตาม id
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming': return <Terminal className="h-5 w-5" />;
      case 'frontend': return <LayoutTemplate className="h-5 w-5" />;
      case 'backend': return <Database className="h-5 w-5" />;
      case 'data_ai': return <BrainCircuit className="h-5 w-5" />;
      case 'devops_tools': return <Cloud className="h-5 w-5" />;
      case 'design_office': return <PenTool className="h-5 w-5" />;
      case 'languages': return <Globe className="h-5 w-5" />;
      default: return <Terminal className="h-5 w-5" />;
    }
  };

  // ฟังก์ชันกำหนดขนาดของกล่อง (Col-span / Row-span) เพื่อต่อจิ๊กซอว์
  const getBentoClass = (id: string) => {
    switch (id) {
      case 'programming':
        return 'md:col-span-2 lg:col-span-2 lg:row-span-1'; // กว้าง 2 ช่อง
      case 'backend':
        return 'col-span-1 lg:row-span-2'; // สูง 2 ช่อง (Tall Box)
      case 'design_office':
        return 'md:col-span-2 lg:col-span-1 lg:row-span-1'; // กว้าง 2 ช่องบนจอ Tablet
      case 'languages':
        return 'md:col-span-2 lg:col-span-1 lg:row-span-1'; // กว้าง 2 ช่องบนจอ Tablet
      default:
        return 'col-span-1 lg:col-span-1 lg:row-span-1'; // ขนาดปกติ 1x1
    }
  };

  return (
    <section id="skill" className="w-full border-b border-neutral-100 py-20">
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          {t('section_title')}
        </h2>
        <p className="mt-4 text-neutral-600">
          {t('section_desc')}
        </p>
      </div>
      
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {categories.map((category) => (
          <div 
            key={category.id} 
            // ดึง Class ขนาดกล่องมาต่อเข้ากับ Class สไตล์หลัก และใช้ h-full เพื่อให้กล่องที่กิน 2 แถวขยายเต็มพื้นที่
            className={`group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8 ${getBentoClass(category.id)}`}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                {getCategoryIcon(category.id)}
              </div>
              <h3 className="text-xl font-semibold leading-tight text-neutral-900">
                {category.title}
              </h3>
            </div>
            
            {/* Tag Container */}
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="rounded-lg bg-neutral-100/80 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}