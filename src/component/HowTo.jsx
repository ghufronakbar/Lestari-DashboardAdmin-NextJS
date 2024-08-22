import Image from "next/image";
import { useState } from "react";

function HowTo() {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <>
    <section id="tatacara" className="w-full min-h-[80vh] z-10 bg-white py-20">
    <div className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24 z-10 bg-white">
      <h2 className="text-black font-bold font-regular text-sm md:text-xl lg:text-2xl font-poppins text-center">
        Tatacara Penggunaan Aplikasi
      </h2>
      <div className="w-full flex flex-col xl:flex-row gap-6">
        <Image
          width={400}
          height={300}
          src={imageHowTo}
          alt="Gambar Tatacara"
          className="w-full h-auto object-cover hover:scale-105 transition-all rounded-lg cursor-pointer"
          onClick={() => setIsVisible(true)}
        />
        <div className="w-full grid grid-cols-2 gap-6">
          {howToItems.map((item, index) => (
            <div key={index} className="w-full flex flex-col text-start">
              <h3 className="text-xs md:text-sm lg:text-base text-black font-semibold">
                {index + 1 + ". "}
                {item.title}
              </h3>
              <p className="text-xs md:text-sm lg:text-base text-black">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
      <ModalImage isVisible={isVisible} onClose={() => setIsVisible(false)}/>
    </>
  );
}

const ModalImage = ({isVisible, onClose}) => {
    return (
        <div className={`${isVisible ? 'block' : 'hidden'} bg-black bg-opacity-60 w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300`} onClick={onClose} >
            <Image
                width={400}
                height={300}
                src={imageHowTo}
                alt="Gambar Tatacara"
                className="w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] h-auto object-cover hover:scale-105 transition-all rounded-lg cursor-pointer"
            />
        </div>
    )
}

const howToItems = [
  {
    id: 1,
    title: "Download Aplikasi",
    description:
      "Unduh aplikasi Lestari dari Google Play Store dan instal di perangkat Anda.",
  },
  {
    id: 2,
    title: "Pendaftaran Akun",
    description:
      "Setelah aplikasi terpasang, buka aplikasi dan lakukan pendaftaran dengan mengisi data yang diperlukan. Pastikan untuk menggunakan alamat email yang valid.",
  },
  {
    id: 3,
    title: "Verifikasi Email",
    description:
      "Cek email Anda secara berkala untuk mengetahui apakah Anda mendapatkan status kredibilitas. Status ini penting untuk mengakses fitur-fitur tertentu di aplikasi.",
  },
  {
    id: 4,
    title: "Login ke Aplikasi",
    description:
      "Setelah mendapatkan kredibilitas, login ke aplikasi menggunakan email dan password yang sudah Anda daftarkan.",
  },
  {
    id: 5,
    title: "Pendataan Satwa",
    description:
      "Mulailah melakukan pendataan satwa dengan mengisi formulir yang tersedia di aplikasi. Data yang telah diinput tidak dapat diedit setelah lebih dari 7 hari sejak tanggal input.",
  },
  {
    id: 6,
    title: "Melihat Data Satwa",
    description:
      "Data satwa yang telah Anda input akan tersimpan di akun Anda. Anda dapat melihat kembali data-data tersebut kapan saja melalui aplikasi.",
  },
  {
    id: 7,
    title: "Request Data",
    description:
      "Baik user terdaftar maupun guest dapat melakukan request data satwa. Isi formulir permohonan dengan menyertakan alasan atau kepentingan, serta lampiran surat legalitas jika diperlukan.",
  },
  {
    id: 8,
    title: "Cek Berkala",
    description:
      "Pastikan untuk cek aplikasi secara berkala untuk mengetahui status request data Anda atau update terbaru mengenai kredibilitas akun.",
  },
];

const imageHowTo = '/images/hero.jpg';

export default HowTo;