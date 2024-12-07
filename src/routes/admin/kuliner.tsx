import React, { useState } from 'react';
import { Trash2, Edit, Plus, X } from 'lucide-react';
import MenuDialog from './menuDialog';

interface Warung {
    id: number;
    namaWarung: string;
    deskripsi: string;
}

const AdminKulinerPage: React.FC = () => {
    const [warungs, setWarungs] = useState<Warung[]>([
        { id: 1, namaWarung: 'Warung Sate Pak Raden', deskripsi: 'Sate terbaik di kota' },
        { id: 2, namaWarung: 'Bakso Mas Joko', deskripsi: 'Bakso legendaris dengan bumbu rahasia' }
    ]);
    const [currentWarung, setCurrentWarung] = useState<Warung | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedWarungId, setSelectedWarungId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setWarungs(warungs.filter(warung => warung.id !== id));
    };

    const handleSave = () => {
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
            setIsDialogOpen(false);
        }
    };

    const openEditDialog = (warung?: Warung) => {
        setCurrentWarung(warung || { id: 0, namaWarung: '', deskripsi: '' });
        setIsDialogOpen(true);
    };

    const handleLihatMenu = (id: number) => {
        setSelectedWarungId(id);
    };

    const closeMenuDialog = () => {
        setSelectedWarungId(null);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Kuliner</h1>
                <button
                    onClick={() => openEditDialog()}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    <Plus size={20} /> Tambah Kuliner
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                                        onClick={() => openEditDialog(warung)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(warung.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                    <button
                                        onClick={() => handleLihatMenu(warung.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                                    >
                                      Lihat Menu
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Existing Warung Edit Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-semibold">
                            {currentWarung?.id === 0 ? 'Tambah' : 'Edit'} Warung
                        </h2>
                        <button
                            onClick={() => setIsDialogOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <div>
                            <label htmlFor="namaWarung" className="block mb-2">
                                Nama Warung
                            </label>
                            <input
                                id="namaWarung"
                                type="text"
                                value={currentWarung?.namaWarung || ''}
                                onChange={(e) => setCurrentWarung({
                                    ...currentWarung!,
                                    namaWarung: e.target.value
                                })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="deskripsi" className="block mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                id="deskripsi"
                                value={currentWarung?.deskripsi || ''}
                                onChange={(e) => setCurrentWarung({
                                    ...currentWarung!,
                                    deskripsi: e.target.value
                                })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsDialogOpen(false)}
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

        {/* Menu Dialog */}
        {selectedWarungId && (
            <MenuDialog 
                idWarung={selectedWarungId} 
                onClose={closeMenuDialog} 
            />
        )}
    </div>
);
};

export default AdminKulinerPage;
