import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;
    setIsScrolled(scrollPosition > screenHeight * 0.8);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Tentang Kami', href: '#visi' },
    { label: 'Wisata', href: '#wisata' },
    { label: 'Struktur', href: '#struktur' },
    { label: 'Kontak', href: '#footer' },
  ];

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full max-w-full px-4 py-1 rounded-none shadow-md lg:px-8 lg:py-2 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white text-black border-white/80'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          onClick={() => scrollToSection('#hero')}
          className="mr-4 flex items-center gap-2 py-1.5 font-sans text-base font-medium leading-relaxed antialiased cursor-pointer"
        >
          <Image src="/images/hero.jpg" alt="Logo" width={48} height={48} className="w-auto h-12" />
          <span className="hidden lg:inline-block font-poppins text-xl font-bold">Kalurahan Purwodadi</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navItems.map((item) => (
                <li
                  key={item.href}
                  className="block p-1 font-sans text-sm antialiased font-normal leading-normal cursor-pointer"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-x-1">
            <div
              onClick={() => window.location.href = '/pengaduan'}
              className="hidden select-none rounded-lg bg-primary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block hover:bg-secondary duration-300 cursor-pointer"
            >
              Registrasi
            </div>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className='absolute top-0 left-0 z-30 lg:hidden w-screen h-screen' onClick={closeMobileMenu}>
          <div
            className={`fixed inset-0 z-40 bg-white border-t h-fit border-gray-200 lg:hidden transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <ul className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <li
                  key={item.href}
                  className="block p-1 text-black font-sans text-sm antialiased font-normal leading-normal cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMobileMenu();
                    scrollToSection(item.href);
                  }}
                >
                  {item.label}
                </li>
              ))}
              <li
                className="block p-1 font-sans text-sm antialiased font-normal text-black leading-normal cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  closeMobileMenu();
                  window.location.href = '/pengaduan';
                }}
              >
                Pengaduan
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
