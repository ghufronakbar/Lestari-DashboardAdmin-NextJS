import Image from "next/image";

const featureItems = [
  {
    imgSrc: "/images/hero.jpg",
    title: "Pengaduan Online 24 Jam",
    description:
      "Status pengaduan yang dapat dipantau secara real-time oleh pelapor.",
  },
  {
    imgSrc: "/images/hero.jpg",
    title: "Akses Mudah",
    description:
      "Formulir pengaduan yang mudah diakses dengan fitur upload foto untuk melampirkan bukti.",
  },
  // Add more items here...
];

export default function Feature() {
  return (
    <section
      id="visi"
      className="w-full min-h-[80vh] z-10 bg-white py-20 rounded-t-3xl -mb-20 shadow-black shadow-lg drop-shadow-2xl"
    >
      <div className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24">
        <h2 className="text-black font-bold text-lg md:text-xl lg:text-2xl md:text-xl lg:text-2xl font-poppins text-center">
          Lapor Purwodadi
        </h2>
        <h2 className="md:text-xl text-black text-sm text-center">
          Lapor Purwodadi adalah platform online yang memudahkan masyarakat
          Kalurahan Purwodadi untuk menyampaikan aspirasi, keluhan, dan saran
          kepada pemerintah setempat.
        </h2>
        <p></p>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featureItems.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-4 pb-4 border border-gray-300 rounded-lg overflow-hidden"
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
              <div
                className="absolute bottom-0 left-0 w-full bg-white opacity-0 transition-opacity duration-300 hidden"
                id="moreInfo"
              >
                <p className="text-black text-sm">
                  More detailed information about Pantai Siung
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24">
          <p></p>
          <h2 className="text-black font-bold font-regular text-sm md:text-xl lg:text-2xl font-poppins text-center">
            Tatacara Pengaduan
          </h2>
          <h2 className="md:text-xl text-black text-sm text-center">
            Langkah-langkah yang harus diikuti saat ingin menyampaikan keluhan
            atau ketidakpuasan terkait suatu layanan atau tindakan. Tujuannya
            yaitu untuk mendapatkan solusi atas masalah yang dialami dan
            meningkatkan kualitas pelayanan.
          </h2>
          <p></p>
          <Image
            width={400}
            height={300}
            src="/images/hero.jpg"
            alt="Gambar Tatacara"
            className="w-full md:w-3/4 lg:px-1/14"
          />
        </div>
        <p></p>
        <p></p>
        <div className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24 md:px-12 lg:px-24">
          <h2 className="text-black font-bold text-lg md:text-xl lg:text-2xl md:text-xl lg:text-2xl font-poppins text-center">
            Surga Tersembunyi di Pantai Selatan Gunungkidul
          </h2>
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
              <p>
                Dusun Purwodadi, sebuah permata tersembunyi di pesisir selatan
                Gunungkidul, menawarkan pesona alam yang luar biasa. Dengan
                garis pantai yang menawan, tebing-tebing karang yang gagah, dan
                hamparan pasir putih yang lembut, Purwodadi adalah surga bagi
                para pecinta alam dan petualang.
              </p>
              <p>
                Purwodadi juga merupakan destinasi wisata edukasi yang menarik.
                Dengan beragam ekosistem yang ada, desa ini menjadi laboratorium
                alam yang sempurna untuk mempelajari keanekaragaman hayati dan
                pentingnya menjaga kelestarian lingkungan.
              </p>
              <p>
                Masyarakat Purwodadi memiliki semangat gotong royong yang tinggi
                dan menjunjung tinggi nilai-nilai adat istiadat. Potensi ekonomi
                desa pun terus dikembangkan, antara lain melalui sektor
                pertanian, perikanan, dan pariwisata yang berkelanjutan.
              </p>
              <p>
                Datanglah ke Purwodadi dan rasakan sendiri pengalaman yang tak
                terlupakan. Jelajahi keindahan alamnya, belajar tentang warisan
                budaya yang kaya, dan nikmati keramahan masyarakatnya. Purwodadi
                adalah tempat yang tepat untuk melepas penat dan mencari
                ketenangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
