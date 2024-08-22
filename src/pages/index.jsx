import Head from "next/head";
import Navbar from "@/component/Navbar";
import Hero from "@/component/Hero";
import Feature from "@/component/Feature";
import BannerBottom from "@/component/BannerBottom";
import Footer from "@/component/Footer";
import Example from "@/component/Example";
import HowTo from "@/component/HowTo";



export default function Home() {
  return (
    <>
    <Head>
      <title>Lestari</title>
      <meta name="Data Satwa Liar" content="Pendataan Data Satwa" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
    <div className="bg-hero bg-cover bg-center bg-fixed flex flex-col">
      <Navbar />
      <Hero />
      <Feature />
      <Example />
      <HowTo/>
      <BannerBottom />
      <Footer />
    </div>
      
    </main>
    </>
  );
}
