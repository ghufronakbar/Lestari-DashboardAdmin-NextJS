export default function Hero() {
  const scrollJelajahi = () => {
    const element = document.getElementById('visi');
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  }
  return (
    <section
    id="hero"
    className="w-full min-h-screen relative ">
    <div className="mx-auto flex flex-col items-center relative justify-center">
      <div
        className="flex flex-col gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  items-center self-center">
        <h1
          className="text-white font-bold text-3xl md:text-5xl font-poppins text-center">
          Kalurahan Purwodadi
        </h1>
        <p
          className="text-white font-normal text-xs md:text-sm font-poppins max-w-md text-center">
          &quot; Kalurahan Purwodadi adalah salah satu desa di Indonesia yang memiliki potensi besar.
          Dengan kekayaan alam dan budaya yang unik, Purwodadi menawarkan pengalaman yang menarik bagi
          pengunjung.&quot;
        </p>
        <button
          className="text-white font-semibold py-2 px-4 rounded bg-primary font-poppins text-center hover:bg-secondary transition-all duration-300"
          href="#visi" onClick={scrollJelajahi}>
          Jelajahi
        </button>
      </div>
    </div>
  </section>
  );
}
