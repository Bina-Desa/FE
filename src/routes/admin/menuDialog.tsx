import React, { useState } from 'react';
import { X, Edit, Trash2, Camera } from 'lucide-react';

interface Menu {
    id: number;
    namaMenu: string;
    category: string;
    gambar: string;
    id_warung: number;
}

interface MenuDialogProps {
    idWarung: number;
    onClose: () => void;
}

const MenuDialog: React.FC<MenuDialogProps> = ({ idWarung, onClose }) => {
    const [menus, setMenus] = useState<Menu[]>([
        { 
            id: 1, 
            namaMenu: 'Sate Ayam', 
            category: 'Makanan', 
            gambar: '/placeholder-image.jpg', 
            id_warung: 1 
        },
        { 
            id: 2, 
            namaMenu: 'Sate Kambing', 
            category: 'Makanan', 
            gambar: '/placeholder-image.jpg', 
            id_warung: 1 
        },
        { 
            id: 3, 
            namaMenu: 'Bakso Spesial', 
            category: 'Makanan', 
            gambar: '/placeholder-image.jpg', 
            id_warung: 2 
        }
    ].filter(menu => menu.id_warung === idWarung));

    const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleDelete = (id: number) => {
        setMenus(menus.filter(menu => menu.id !== id));
    };

    const handleSave = () => {
        if (currentMenu) {
            if (currentMenu.id === 0) {
                const newMenu = {
                    ...currentMenu,
                    id: menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1,
                    id_warung: idWarung
                };
                setMenus([...menus, newMenu]);
            } else {
                setMenus(menus.map(m =>
                    m.id === currentMenu.id ? currentMenu : m
                ));
            }
            setIsEditDialogOpen(false);
        }
    };

    const openEditDialog = (menu?: Menu) => {
        setCurrentMenu(menu || { 
            id: 0, 
            namaMenu: '', 
            category: '', 
            gambar: '', 
            id_warung: idWarung 
        });
        setIsEditDialogOpen(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Daftar Menu</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => openEditDialog()}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            <Edit size={20} /> Tambah Menu
                        </button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left">ID</th>
                                    <th className="px-4 py-3 text-left">Nama Menu</th>
                                    <th className="px-4 py-3 text-left">Kategori</th>
                                    <th className="px-4 py-3 text-left">Gambar</th>
                                    <th className="px-4 py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menus.map((menu) => (
                                    <tr key={menu.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{menu.id}</td>
                                        <td className="px-4 py-3">{menu.namaMenu}</td>
                                        <td className="px-4 py-3">{menu.category}</td>
                                        <td className="px-4 py-3">
                                            <img 
                                                src={menu.gambar} 
                                                alt={menu.namaMenu} 
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-3 flex justify-center space-x-2">
                                            <button
                                                onClick={() => openEditDialog(menu)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Edit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(menu.id)}
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

                {isEditDialogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    {currentMenu?.id === 0 ? 'Tambah' : 'Edit'} Menu
                                </h2>
                                <button
                                    onClick={() => setIsEditDialogOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <label htmlFor="namaMenu" className="block mb-2">
                                        Nama Menu
                                    </label>
                                    <input
                                        id="namaMenu"
                                        type="text"
                                        value={currentMenu?.namaMenu || ''}
                                        onChange={(e) => setCurrentMenu({
                                            ...currentMenu!,
                                            namaMenu: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2">
                                        Kategori
                                    </label>
                                    <input
                                        id="category"
                                        type="text"
                                        value={currentMenu?.category || ''}
                                        onChange={(e) => setCurrentMenu({
                                            ...currentMenu!,
                                            category: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gambar" className="block mb-2">
                                        Gambar
                                    </label>
                                    <div className="flex items-center gap-4">
                                        {currentMenu?.gambar && (
                                            <img 
                                                src={currentMenu.gambar} 
                                                alt="Menu" 
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                        )}
                                        <button 
                                            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                        >
                                            <Camera size={20} /> Unggah Gambar
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setIsEditDialogOpen(false)}
                                        className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
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
        </div>
    );
};

export default MenuDialog;