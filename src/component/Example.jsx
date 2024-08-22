import Image from "next/image";

const exampleItems = [
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Harimau Sumatra',
      latinName: 'Panthera tigris sumatrae',
      description: 'Harimau Sumatra adalah subspesies harimau yang hanya ditemukan di pulau Sumatra, Indonesia. Mereka dikenal dengan corak garis-garis hitam yang tebal dan tubuh yang lebih kecil dibandingkan subspesies harimau lainnya.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Orangutan Kalimantan',
      latinName: 'Pongo pygmaeus',
      description: 'Orangutan Kalimantan adalah primata besar yang ditemukan di hutan-hutan Kalimantan, Indonesia. Mereka dikenal dengan warna rambut kemerahan dan kecerdasan yang tinggi.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Komodo',
      latinName: 'Varanus komodoensis',
      description: 'Komodo adalah spesies kadal besar yang ditemukan di pulau-pulau tertentu di Indonesia. Mereka adalah kadal terbesar di dunia dan memiliki gigitan beracun.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Burung Cendrawasih',
      latinName: 'Paradisaea apoda',
      description: 'Burung Cendrawasih, juga dikenal sebagai "Bird of Paradise", adalah burung dengan bulu indah yang ditemukan di Papua. Mereka terkenal dengan tarian kawin yang spektakuler.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Gajah Sumatra',
      latinName: 'Elephas maximus sumatranus',
      description: 'Gajah Sumatra adalah subspesies gajah Asia yang hanya ditemukan di Sumatra. Mereka lebih kecil dibandingkan gajah Asia lainnya dan terancam punah.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Badak Jawa',
      latinName: 'Rhinoceros sondaicus',
      description: 'Badak Jawa adalah salah satu mamalia besar yang paling langka di dunia, hanya ditemukan di Taman Nasional Ujung Kulon, Indonesia. Mereka memiliki satu cula kecil dan hidup di hutan hujan tropis.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Kakatua Jambul Kuning',
      latinName: 'Cacatua galerita',
      description: 'Kakatua Jambul Kuning adalah burung paruh bengkok yang terkenal dengan jambul kuning yang khas. Mereka dapat ditemukan di wilayah timur Indonesia dan dikenal dengan suara mereka yang keras.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Anoa',
      latinName: 'Bubalus depressicornis',
      description: 'Anoa adalah spesies kerbau kecil yang endemik di Sulawesi. Mereka hidup di hutan tropis dan dataran tinggi dan dikenal dengan tubuhnya yang ramping dan tanduk kecil.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Kuskus Beruang',
      latinName: 'Ailurops ursinus',
      description: 'Kuskus Beruang adalah marsupial besar yang ditemukan di Sulawesi dan beberapa pulau sekitarnya. Mereka memiliki bulu tebal dan hidup di pohon, memakan daun dan buah.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Tarsius',
      latinName: 'Tarsius tarsier',
      description: 'Tarsius adalah primata kecil dengan mata besar yang ditemukan di Sulawesi. Mereka adalah hewan nokturnal dan memiliki kemampuan melompat yang luar biasa.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Kakatua Raja',
      latinName: 'Probosciger aterrimus',
      description: 'Kakatua Raja adalah burung besar dengan paruh kuat dan bulu hitam mengkilap. Mereka ditemukan di Papua dan dikenal dengan jambul besar yang dapat ditegakkan.'
  },
  {
      imgSrc: '/images/hero.jpg',
      localName: 'Ikan Arwana Merah',
      latinName: 'Scleropages formosus',
      description: 'Ikan Arwana Merah adalah spesies ikan air tawar yang sangat dihargai karena warna sisiknya yang indah. Mereka ditemukan di perairan Indonesia dan terkenal dalam budaya lokal sebagai simbol keberuntungan.'
  }
];

  
  export default function Example() {
    return (
      <section id="keanekaragaman" className="w-full min-h-[80vh] z-10 bg-white py-20">
    <div
      className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24">
      <h2
        className="text-black font-bold text-lg md:text-xl lg:text-2xl font-poppins text-center">
        Datang dan jatuh cinta dengan satwa
      </h2>
      <div
        className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        
        {exampleItems.map((item,index) => (        
        <div
        key={index}
          className="w-full flex flex-col gap-4 pb-4 border border-gray-300 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300">
          <Image
            src={item.imgSrc}
            alt={item.localName}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-all" />
          <div className="w-full flex flex-col gap-2 px-4">
            <div className="w-full flex flex-col">
            <h3 className="text-black font-bold text-lg font-poppins">
              {item.localName}
            </h3>
            <p className="text-gray-600 text-sm">{item.latinName}</p>
            </div>
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
  