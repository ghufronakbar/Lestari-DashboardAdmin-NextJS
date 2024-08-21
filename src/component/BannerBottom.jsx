import Image from "next/image";

export default function BannerBottom() {
    return (
      <section id="struktur" className="w-full min-h-[80vh] bg-white py-20 z-10">
        <div className="text-center">
          <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Struktur Organisasi Kalurahan</h2>
        </div>
        <div className="flex justify-center mt-12">
          <Image src="/images/hero.jpg" className="w-full md:w-3/4 object-cover rounded-lg hover:scale-105 transition-all" alt="Struktur Organisasi Kalurahan" width={200} height={200} />
        </div>
      </section>
    );
  }
  