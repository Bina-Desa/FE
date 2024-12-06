import React, { useState } from 'react';
import { Trash2, Edit, Plus, X, Image } from 'lucide-react';

interface Warung {
    id: number;
    namaWarung: string;
    deskripsi: string;
}

interface Menu {
    id: number;
    namaMenu: string;
    category: string;
    gambar: string;
    warungId: number;
}

const AdminKulinerPage: React.FC = () => {
    const [warungs, setWarungs] = useState<Warung[]>([
        { id: 1, namaWarung: 'Warung Sate Pak Raden', deskripsi: 'Sate terbaik di kota' },
        { id: 2, namaWarung: 'Bakso Mas Joko', deskripsi: 'Bakso legendaris dengan bumbu rahasia' }
    ]);

    const [menus, setMenus] = useState<Menu[]>([
        { id: 1, namaMenu: 'Sate Ayam', category: 'Makanan', gambar: 'sate.jpg', warungId: 1 },
        { id: 2, namaMenu: 'Bakso Spesial', category: 'Makanan', gambar: 'bakso.jpg', warungId: 2 }
    ]);

    const [currentWarung, setCurrentWarung] = useState<Warung | null>(null);
    const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
    const [isWarungDialogOpen, setIsWarungDialogOpen] = useState(false);
    const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
    const [selectedWarungMenus, setSelectedWarungMenus] = useState<Menu[]>([]);

    const handleWarungDelete = (id: number) => {
        setWarungs(warungs.filter(warung => warung.id !== id));
        // Also remove associated menus
        setMenus(menus.filter(menu => menu.warungId !== id));
    };

    const handleWarungSave = () => {
        if (currentWarung) {
            if (currentWarung.id === 0) {
                const newWarung = {
                    ...currentWarung,
                    id: warungs.length > 0 ? Math.max(...warungs.map(w => w.id)) + 1 : 1
                };
                setWarungs([...warungs, newWarung]);
            } else {
                setWarungs(warungs.map(w =>
                    w.id === currentWarung.id ? currentWarung : w
                ));
            }
            setIsWarungDialogOpen(false);
        }
    };

    const openWarungEditDialog = (warung?: Warung) => {
        setCurrentWarung(warung || { id: 0, namaWarung: '', deskripsi: '' });
        setIsWarungDialogOpen(true);
    };

    const handleMenuSave = () => {
        if (currentMenu) {
            if (currentMenu.id === 0) {
                const newMenu = {
                    ...currentMenu,
                    id: menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1,
                    warungId: currentWarung!.id
                };
                setMenus([...menus, newMenu]);
            } else {
                setMenus(menus.map(m =>
                    m.id === currentMenu.id ? currentMenu : m
                ));
            }
            setIsMenuDialogOpen(false);
        }
    };

    const handleMenuDelete = (id: number) => {
        setMenus(menus.filter(menu => menu.id !== id));
        setSelectedWarungMenus(selectedWarungMenus.filter(menu => menu.id !== id));
    };

    const openMenuDialog = (warung: Warung) => {
        setCurrentWarung(warung);
        const filteredMenus = menus.filter(menu => menu.warungId === warung.id);
        setSelectedWarungMenus(filteredMenus);
        setIsMenuDialogOpen(true);
    };

    const openMenuEditDialog = (menu?: Menu) => {
        setCurrentMenu(menu || { 
            id: 0, 
            namaMenu: '', 
            category: '', 
            gambar: '',
            warungId: currentWarung!.id 
        });
    };

    // Render methods remain the same as previous code, with added methods for menu management

    return (
        <div className="container mx-auto p-6">
            {/* ... Previous Warung table code ... */}
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Nama Warung</th>
                            <th className="px-4 py-3 text-left">Deskripsi</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warungs.map((warung) => (
                            <tr key={warung.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{warung.id}</td>
                                <td className="px-4 py-3">{warung.namaWarung}</td>
                                <td className="px-4 py-3">{warung.deskripsi}</td>
                                <td className="px-4 py-3 flex justify-center space-x-2">
                                    <button
                                        onClick={() => openWarungEditDialog(warung)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleWarungDelete(warung.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                    <button
                                        onClick={() => openMenuDialog(warung)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                                    >
                                        Menu
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Warung Edit Dialog - Previous code remains the same */}

            {/* Menu Management Dialog */}
            {isMenuDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">
                                Menu untuk {currentWarung?.namaWarung}
                            </h2>
                            <button
                                onClick={() => setIsMenuDialogOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4">
                            <button
                                onClick={() => {
                                    openMenuEditDialog();
                                }}
                                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
                            >
                                <Plus size={20} /> Tambah Menu
                            </button>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left">ID</th>
                                            <th className="px-4 py-3 text-left">Nama Makanan</th>
                                            <th className="px-4 py-3 text-left">Kategori</th>
                                            <th className="px-4 py-3 text-left">Gambar</th>
                                            <th className="px-4 py-3 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedWarungMenus.map((menu) => (
                                            <tr key={menu.id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-3">{menu.id}</td>
                                                <td className="px-4 py-3">{menu.namaMenu}</td>
                                                <td className="px-4 py-3">{menu.category}</td>
                                                <td className="px-4 py-3">
                                                    <Image size={24} className="text-gray-500" />
                                                </td>
                                                <td className="px-4 py-3 flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setCurrentMenu(menu);
                                                        }}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleMenuDelete(menu.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Menu Edit Dialog */}
            {currentMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">
                                {currentMenu.id === 0 ? 'Tambah' : 'Edit'} Menu
                            </h2>
                            <button
                                onClick={() => {
                                    setCurrentMenu(null);
                                    setIsMenuDialogOpen(true);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label htmlFor="namaMenu" className="block mb-2">
                                    Nama Makanan
                                </label>
                                <input
                                    id="namaMenu"
                                    type="text"
                                    value={currentMenu.namaMenu}
                                    onChange={(e) => setCurrentMenu({
                                        ...currentMenu,
                                        namaMenu: e.target.value
                                    })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2">
                                    Kategori
                                </label>
                                <select
                                    id="category"
                                    value={currentMenu.category}
                                    onChange={(e) => setCurrentMenu({
                                        ...currentMenu,
                                        category: e.target.value
                                    })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="Makanan">Makanan</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Cemilan">Cemilan</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="gambar" className="block mb-2">
                                    Gambar
                                </label>
                                <input
                                    id="gambar"
                                    type="file"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setCurrentMenu(null);
                                        setIsMenuDialogOpen(true);
                                    }}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleMenuSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminKulinerPage;