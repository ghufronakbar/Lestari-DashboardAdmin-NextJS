import Image from "next/image";

const keyPointItems = [
    {
      imgSrc: "/images/hero.jpg",
      title: "Pantai Siung",
      description: "Pantai Siung, Gunungkidul, menawarkan tebing karang eksotis, pasir putih, dan ombak besar.",
    },
    {
      imgSrc: "/images/hero.jpg",      
      title: "Pantai Timang",
      description: "Pantai Timang: Sensasi naik kereta gantung ke pulau kecil, tebing karang dramatis.",
    },
    {
      imgSrc: "/images/hero.jpg",      
      title: "Pantai Nglambor",
      description: "Pantai Nglambor: Surga snorkeling, dengan terumbu karang yang indah.",
    },
    {
      imgSrc: "/images/hero.jpg",          
      title: "Goa Ndilem",
      description: "Goa Ndilem: Sebuah permata tersembunyi di Gunungkidul yang menawarkan petualangan menarik bagi para penjelajah gua.",
    },
    {
      imgSrc: "/images/hero.jpg",      
      title: "Pantai Banyu Tibo",
      description: "Pantai Banyu Tibo adalah sebuah permata tersembunyi di Gunungkidul yang menawarkan keindahan alam yang unik.",
    },
    {
      imgSrc: "/images/hero.jpg",      
      title: "Pantai Jogan",
      description: "Pantai Jogan adalah destinasi yang sempurna bagi Anda yang ingin menikmati keindahan alam yang unik dan menyegarkan.",
    },
    {
      imgSrc: "/images/hero.jpg",      
      title: "Pantai Ngetun",
      description: "Hidden gem di Gunungkidul yang menawarkan keindahan alam yang masih sangat alami.",
    },
    {
      imgSrc: "/images/hero.jpg",            
      title: "Bukit Pengilon",
      description: "Destinasi wisata populer di Gunungkidul yang menawarkan panorama alam yang menakjubkan dari bukit.",
    },
  ];
  
  export default function KeyPoint() {
    return (
      <section id="wisata" className="w-full min-h-[80vh] z-10 bg-white py-20">
    <div
      className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24">
      <h2
        className="text-black font-bold text-lg md:text-xl lg:text-2xl font-poppins text-center">
        Datang dan jatuh cinta dengan wisata
      </h2>
      <div
        className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        
        {keyPointItems.map((item,index) => (        
        <div
        key={index}
          className="w-full flex flex-col gap-4 pb-4 border border-gray-300 rounded-lg overflow-hidden">
          <Image
            src={item.imgSrc}
            alt={item.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-all" />
          <div className="w-full flex flex-col gap-2 px-4">
            <h3 className="text-black font-bold text-lg font-poppins">
              {item.title}
            </h3>
            <p className="text-black text-sm">
              {item.description}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-white opacity-0 transition-opacity duration-300 hidden" id="moreInfo">
            <p className="text-black text-sm">
              More detailed information about Pantai Siung
            </p>
          </div>
        </div>
        ))}


      </div>
    </div>
  </section>
    );
  }
  