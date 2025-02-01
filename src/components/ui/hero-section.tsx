import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import HeroVideoDialog from './hero-video-dialog';

const HeroSection = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { margin: '-20% 0px', once: true });

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center top-0"
      style={{
        backgroundImage: "url('/images/header.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen text-white">
        <motion.div className="text-center md:mt-14 mx-4">
          <motion.a
            href="/kuliner"
            className="border-muted-foreground border rounded-full px-4 py-1 text-sm text-zinc-300 mb-5 flex items-center w-max justify-center mx-auto group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
          >
            Temukan berbagai<span className="font-bold ms-1 text-white">Kuliner Khas</span> <IoIosArrowForward className="group-hover:ms-2 transition-all duration-200" />
          </motion.a>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }} className="text-6xl max-sm:text-5xl font-bold mt-6 mb-3 leading-snug">
            Desa Wisata <span className="text-green-500">Kebon Ayu</span>
          </motion.h1>
          <motion.p className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.6 }}>
            Temukan berbagai macam tempat wisata dan kuliner khas
          </motion.p>
          <motion.div className="flex gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.8 }}>
            <Button className="bg-green-500 hover:bg-green-600">
              <a
                href="https://www.google.com/maps/place/Wisata+Kuliner+Kebon+Ayu/@-8.6929835,116.1020709,17z/data=!3m1!4b1!4m6!3m5!1s0x2dcdbddcf92518ef:0xc19d8aa1235a3045!8m2!3d-8.6929888!4d116.1046458!16s%2Fg%2F11p5kz19zy?entry=ttu&g_ep=EgoyMDI0MTAxNS4wIKXMDSoASAFQAw%3D%3D"
                className="flex items-center gap-2"
                target="_blank"
              >
                <IoLocationOutline />
                Google Maps
              </a>
            </Button>
            <Button className="hover:bg-transparent hover:text-white group w-40 " variant={'ghost'} onClick={() => navigate('/tempat-wisata')}>
              Tempat wisata
              <IoIosArrowForward className="group-hover:ms-2 transition-all duration-200" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        ref={videoRef}
        className="bg-white p-2 max-w-6xl h-max mx-auto max-lg:mx-4 shadow-md right-0 left-0 rounded-md mt-10 absolute"
        style={{ top: 'calc(100vh - 90px)', height: '520px' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* <iframe
          className="w-full rounded-sm aspect-video h-full"
          src="https://www.youtube.com/embed/AugA9nZRgsI?si=3pedrqpClRc3w9vZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe> */}

        <div className='relative border-red-500'>
          <HeroVideoDialog videoSrc="https://www.youtube.com/embed/AugA9nZRgsI?si=3pedrqpClRc3w9vZ" thumbnailSrc="/images/thumbniel.jpg" className="h-[500px]" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
