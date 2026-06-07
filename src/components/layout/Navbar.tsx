'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react'; // Import icons
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // State สำหรับเปิด/ปิด Dropdown
    
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ดึง Hook สำหรับแปลภาษา และจัดการ Route
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // ฟังก์ชันสลับภาษา
  const changeLanguage = (nextLocale: string) => {
    // เปลี่ยน URL ไปยังภาษาใหม่ โดยยังคงอยู่ที่ path เดิม
    router.replace(pathname, { locale: nextLocale });
    setIsLangOpen(false);
  };

const navLinks = [
    { name: t('home'), href: '#home' },
    { name: t('about'), href: '#about' },
    { 
      name: t('experience'), 
      href: '#experience',
      subLinks: [
        { name: 'Professional Experience', href: '#professional-experience' },
        { name: 'Featured Projects', href: '#featured-projects' }
      ]
    },
    { name: t('skill'), href: '#skill' },
    { name: t('education'), href: '#education' },
    { name: t('contact'), href: '#contact' },
  ];

  // Logic สำหรับเงาตอนสกรอลล์ และคลิกพื้นที่อื่นเพื่อปิด Dropdown
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-sm transition-shadow duration-300 ${
        isScrolled ? 'shadow-xl shadow-black/5' : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="font-bold text-xl tracking-tight text-neutral-900">
          Khunnapat.
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => (
            <div key={link.name} className="group relative">
              <Link 
                href={link.href} 
                className="relative flex items-center gap-1 py-1 text-neutral-600 transition-colors hover:text-neutral-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-neutral-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
                {link.subLinks && <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />}
              </Link>
              
              {/* Sub-menu Dropdown */}
              {link.subLinks && (
                <div className="absolute left-0 top-full hidden w-48 pt-4 group-hover:block">
                  <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-lg shadow-black/5">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        className="block rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
          {/* ขีดคั่นกลางระหว่าง Menu กับ Language Switcher */}
          <div className="h-4 w-[1px] bg-neutral-300"></div>

          {/* Language Switcher */}
          <div className="relative group" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === 'th' ? 'TH' : 'EN'}</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            
            {/* Lang Dropdown Menu */}
              <div className="absolute right-0 top-full hidden pt-3 group-hover:block">
              <div className="mt-3 w-32 rounded-lg border border-neutral-200 bg-white p-1.5 shadow-lg shadow-black/5">
                <button
                  onClick={() => changeLanguage('en')}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <div className={`h-2.5 w-2.5 rounded-full border border-neutral-400 ${locale === 'en' ? 'bg-neutral-800 border-neutral-800' : 'bg-transparent'}`}></div>
                  English
                </button>

                <button
                  onClick={() => changeLanguage('th')}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <div className={`h-2.5 w-2.5 rounded-full border border-neutral-400 ${locale === 'th' ? 'bg-neutral-800 border-neutral-800' : 'bg-transparent'}`}></div>
                  ไทย
                </button>
                </div>
              </div>
            
          </div>
        </div>

      </div>
    </header>
  );
}