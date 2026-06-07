import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import ProjectCard from "@/components/sections/ProjectCard";
export default function Home() {
  return (
    // Max-width 6xl คือตัวช่วยให้เนื้อหาไม่ขยายไปชิดขอบจอใหญ่ๆ จัดให้อยู่ตรงกลาง
    <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      
      {/* เรียกใช้ Hero Component */}
      <Hero />
      <About />
      <Experience/>
      <ProjectCard/>
      {/* Sections อื่นๆ สร้างไว้เป็น Dummy รอการตกแต่งเพิ่มและแยกไฟล์ในอนาคต */}
      

      <section id="education" className="min-h-screen py-20 border-b border-neutral-100">
        <h2 className="text-3xl font-bold">Education</h2>
      </section>

      <section id="skill" className="min-h-screen py-20 border-b border-neutral-100">
        <h2 className="text-3xl font-bold">Skills</h2>
      </section>

      

      <section id="contact" className="min-h-[50vh] py-20">
        <h2 className="text-3xl font-bold">Contact</h2>
      </section>
      
    </div>
  );
}