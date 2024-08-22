import Image from "next/image";

const featureItems = [
  {
    imgSrc: "/images/monitoring.png",
    title: "Real-Time Monitoring",
    description:
      "Pantau keanekaragaman hayati secara real-time dengan data yang selalu terbarui dari berbagai sumber terpercaya.",
  },
  {
    imgSrc: "/images/analysis.png",
    title: "Data Analysis",
    description:
      "Lakukan analisis mendalam untuk memahami tren dan pola yang terjadi dalam keanekaragaman hayati, membantu pengambilan keputusan yang lebih baik.",
  },
  {
    imgSrc: "/images/reporting.png",
    title: "Comprehensive Reporting",
    description:
      "Hasilkan laporan komprehensif yang memudahkan Anda untuk membagikan informasi penting kepada pemangku kepentingan.",
  },
  {
    imgSrc: "/images/security.png",
    title: "Keamanan Terjaga",
    description:
      "Data bersifat bebas namun rahasia. Akses data hanya dapat dilakukan dengan legalitas tertentu, menjaga kerahasiaan dan integritas informasi.",
  },
  {
    imgSrc: "/images/recognition.png",
    title: "Penghargaan Kontribusi",
    description:
      "Pengguna yang berkontribusi dalam pendataan akan mendapatkan penghargaan sebagai bentuk apresiasi atas usaha mereka menjaga keanekaragaman hayati.",
  },
  {
    imgSrc: "/images/approved_data.png",
    title: "Data Terjamin",
    description:
      "Hanya pengguna yang telah di-approve yang dapat melakukan pendataan, memastikan bahwa setiap data yang masuk valid dan dapat dipercaya.",
  },
];

export default function Feature() {  
  return (
    <section
      id="visi"
      className="w-full min-h-[80vh] z-10 bg-white py-20 rounded-t-3xl -mb-20 shadow-black shadow-lg drop-shadow-2xl"
    >
      <div className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24">
        <h2 className="text-black font-bold text-lg md:text-xl lg:text-2xl font-poppins text-center">
          Lestari
        </h2>
        <h2 className="md:text-xl text-black text-sm text-center">
          Melestarikan Kehidupan, Mencatat Keanekaragaman, Menjaga Bumi untuk
          Generasi Mendatang.
        </h2>
        <div className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24 my-32">          
          <div className="w-full flex flex-col gap-8 md:flex-row items-center">
            <div className="w-full flex justify-center">
              <Image
                width={400}
                height={300}
                alt="Pantai Selatan Gunungkidul"
                src="/images/hero.jpg"
                className="w-1/11 object-cover rounded-lg hover:scale-105 transition-all"
              />
            </div>
            <div className="w-full flex flex-col gap-2 text-justify">
              <p className="md:text-xl text-black text-sm text-start">
                Lestari hadir sebagai penjaga keberlanjutan dan pencatat
                keanekaragaman hayati dunia. Kami percaya bahwa dengan memahami,
                mencatat, dan melestarikan keanekaragaman hayati, kita bisa
                menjaga keseimbangan alam yang krusial bagi masa depan planet
                kita. Lestari berkomitmen untuk menjadi platform yang mendorong
                kolaborasi, transparansi, dan keberlanjutan dalam melindungi dan
                merawat bumi kita.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featureItems.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-4 pb-4 border border-gray-300 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <Image
                width={400}
                height={300}
                src={item.imgSrc}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-all"
              />
              <div className="w-full flex flex-col gap-2 px-4 text-center">
                <h3 className="text-black font-bold text-lg font-poppins">
                  {item.title}
                </h3>
                <p className="text-black text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>                               
      </div>
    </section>
  );
}
