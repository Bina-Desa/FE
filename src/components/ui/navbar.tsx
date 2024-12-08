import { FaRoute } from 'react-icons/fa';
import { MdOutlineEventNote } from 'react-icons/md';
import { PiBowlFood, PiWarningCircle } from 'react-icons/pi';
import { RiMenu3Line } from 'react-icons/ri';
import { TbHome, TbMapSearch } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './sheet.tsx';

export default function Navbar() {
  return (
    <header className="border-b py-2 w-full fixed bg-white top-0 z-20">
      <nav className="flex max-w-6xl mx-auto px-3  justify-between items-center">
        <div className="logo">
          <a href="/">
            <img src="/images/logo.jpeg" alt="Logo Kebon Ayu" className="w-14" />
          </a>
        </div>
        <div className="menu max-md:hidden">
          <ul className="flex gap-10 text-md items-center">
            <li>
              <NavLink to={'/'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                  <TbHome />
                  Beranda
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/peta'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                  <TbMapSearch /> Peta Wisata
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/tempat-wisata'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                  <FaRoute /> Tempat Wisata
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/kuliner'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                  <PiBowlFood /> Kuliner Khas
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/acara'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                  <MdOutlineEventNote /> Acara
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/tentang'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                  <PiWarningCircle />
                  Tentang
                </div>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <RiMenu3Line className="w-6 h-6 hover:text-green-500 focus:text-green-500" />
            </SheetTrigger>
            <SheetContent>
              <ul className="flex gap-8 text-md flex-col">
                <li>
                  <SheetClose asChild>
                    <NavLink to={'/'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                      <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                        <TbHome />
                        Beranda
                      </div>
                    </NavLink>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <NavLink to={'/peta'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                      <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                        <TbMapSearch /> Peta
                      </div>
                    </NavLink>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <NavLink to={'/tempat-wisata'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                      <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                        <FaRoute /> Tempat Wisata
                      </div>
                    </NavLink>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <NavLink to={'/kuliner'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                      <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                        <PiBowlFood /> Kuliner Khas
                      </div>
                    </NavLink>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <NavLink to={'/acara'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                      <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                        <MdOutlineEventNote /> Acara
                      </div>
                    </NavLink>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <NavLink to={'/tentang'} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active text-green-500' : 'text-zinc-400')}>
                      <div className="flex items-center gap-2 hover:text-green-500 text-[0.95rem]">
                        <PiWarningCircle /> Acara
                      </div>
                    </NavLink>
                  </SheetClose>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
