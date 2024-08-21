import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section id="footer" className="w-full z-10 bg-black py-20 text-white">
      <div className="w-full flex flex-col items-center gap-6 px-6 md:px-12 lg:px-24">
        <h2 className="font-bold text-lg md:text-xl lg:text-2xl font-poppins text-center">
          Kontak Kami
        </h2>
        <div className="w-full flex flex-col md:flex-row gap-6">
          <Image
            src="/images/hero.jpg"
            alt="Lestari"
            width={200}
            height={200}
            className="w-40 h-auto object-cover rounded-lg hover:scale-105 transition-all self-center md:self-start"
          />
          <div className="w-full flex flex-col px-4 gap-2">
            <div className="w-full flex flex-col">
              <h4 className="font-bold text-base font-poppins">Email</h4>
              <Link
                className="text-sm"
                href="mailto:laporpurwodadi@gmail.com"
                target="_blank"
              >
                laporpurwodadi@gmail.com
              </Link>
            </div>
            <div className="w-full flex flex-col">
              <h4 className="font-bold text-base font-poppins">Telepon</h4>
              <Link
                className="text-sm"
                href="https://wa.me/6282225031574//"
                target="_blank"
              >
                082225031574
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col px-4 gap-2">
            <div className="w-full flex flex-col">
              <h4 className="font-bold text-base font-poppins">Alamat</h4>
              <p className="text-sm">Cepogo, Purwodadi, Tepus, Gunungkidul</p>
            </div>
            <div className="w-full flex flex-col">
              <h4 className="font-bold text-base font-poppins">Website</h4>
              <p className="text-sm">www.laporpurwodadi.site</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
