import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import ProjectCard from "@/components/sections/ProjectCard";
import Skill from "@/components/sections/Skill";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
export default function Home() {
  return (
    // Max-width 6xl คือตัวช่วยให้เนื้อหาไม่ขยายไปชิดขอบจอใหญ่ๆ จัดให้อยู่ตรงกลาง
    <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <Hero />
      <About />
      <Experience/>
      <ProjectCard/>
      <Skill/>
      <Education/>
      <Contact/>
    </div>
  );
}