import { useTranslations } from 'next-intl';

interface JobExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
  tags: string[];
}

export default function Experience() {
  const t = useTranslations('Experience');
  const jobs = t.raw('jobs') as JobExperience[];

  const featuredProjects = [
    {
      title: "Dog Breed Identification App",
      description: "Built a responsive mobile interface using React Native, integrated with an EfficientNet machine learning model to classify dog breeds.",
      tags: ["React Native", "Machine Learning", "EfficientNet"]
    },
    {
      title: "Bananas Breed Classification Model",
      description: "Collaborated in a team environment to develop an AI model capable of identifying different banana breeds with high accuracy.",
      tags: ["Python", "Computer Vision", "Team Collaboration"]
    }
  ];

  return (
    <section id="experience" className="w-full py-20 border-b border-neutral-100">
      
      {/* Professional Experience Section */}
      <div id="professional-experience" className="mb-24 pt-10">
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-neutral-900">
          {t('prof_exp')}
        </h2>

        <div className="relative ml-4 border-l-2 border-neutral-100 pl-8 md:ml-8 md:pl-12">
          
          {/* ======================================================== */}
          {/* เริ่มส่วนที่วนซ้ำ (Loop) ตามจำนวน Object ใน Array "jobs" */}
          {/* ======================================================== */}
          {jobs.map((job, index) => (
            <div key={index} className="mb-12 relative max-w-4xl">
              
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-8 h-5 w-5 rounded-full border-[3px] border-white bg-neutral-900 shadow-sm md:-left-[57px]" />
              
              {/* Card Content */}
              <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                
                <h3 className="text-2xl font-bold text-neutral-900">{job.role}</h3>
                
                <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm font-medium text-neutral-500">
                  <span className="text-neutral-700">{job.company}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{job.duration}</span>
                </div>
                
                <p className="mt-5 text-base leading-relaxed text-neutral-600">
                  {job.description}
                </p>
                
                {/* Tech Stack Tags Loop */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
          {/* ======================================================== */}
          {/* สิ้นสุดส่วนที่วนซ้ำ */}
          {/* ======================================================== */}

        </div>
      </div>
    </section>
  );
}