import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

// Destination Type Definition
interface Destination {
    id: number;
    name: string;
    category: string;
    location: {
        latitude: string;
        longitude: string;
        gmaps: string;
    };
    shortDeskripsi: string;
    longDeskripsi: string;
    image: string[];
    fasilitas: string[];
}

const DestinationsPage: React.FC = () => {
    const [destinations, setDestinations] = useState<Destination[]>([
        {
            id: 1,
            name: 'Kebon Ayu',
            category: 'Wisata Kuliner',
            location: {
                latitude: '-8.123',
                longitude: '112.456',
                gmaps: 'https://goo.gl/maps/example'
            },
            shortDeskripsi: 'Pantai menakjubkan dengan pasir putih',
            longDeskripsi: 'Pantai yang sangat indah dengan pemandangan sunset yang memukau',
            image: [
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg'
            ],
            fasilitas: ['Parkir', 'Warung Makan', 'Toilet']
        },
        {
            id: 2,
            name: 'Golden Melon',
            category: 'Wisata Alam',
            location: {
                latitude: '-8.123',
                longitude: '112.456',
                gmaps: 'https://goo.gl/maps/example'
            },
            shortDeskripsi: 'Pantai menakjubkan dengan pasir putih',
            longDeskripsi: 'Pantai yang sangat indah dengan pemandangan sunset yang memukau',
            image: [
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg'
            ],
            fasilitas: ['Parkir', 'Warung Makan', 'Toilet']
        },
        {
            id: 3,
            name: 'Jembatan Gantung',
            category: 'Wisata Alam',
            location: {
                latitude: '-8.123',
                longitude: '112.456',
                gmaps: 'https://goo.gl/maps/example'
            },
            shortDeskripsi: 'Pantai menakjubkan dengan pasir putih',
            longDeskripsi: 'Pantai yang sangat indah dengan pemandangan sunset yang memukau',
            image: [
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg'
            ],
            fasilitas: ['Parkir', 'Warung Makan', 'Toilet']
        }
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);

    const handleAddDestination = () => {
        setCurrentDestination(null);
        setIsDialogOpen(true);
    };

    const handleEditDestination = (destination: Destination) => {
        setCurrentDestination(destination);
        setIsDialogOpen(true);
    };

    const handleSaveDestination = (destination: Destination) => {
        if (currentDestination) {
            setDestinations(destinations.map(d =>
                d.id === destination.id ? destination : d
            ));
        } else {
            setDestinations([
                ...destinations,
                { ...destination, id: destinations.length + 1 }
            ]);
        }
        setIsDialogOpen(false);
    };

    const handleDeleteDestination = (id: number) => {
        setDestinations(destinations.filter(d => d.id !== id));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Destinations</h1>
                <button
                    onClick={handleAddDestination}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <Plus className="mr-2" /> Tambah Destinasi
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">ID</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Kategori</th>
                            <th className="p-3">Gambar</th>
                            <th className="p-3">Lokasi</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {destinations.map((destination) => (
                            <tr key={destination.id} className="border-b">
                                <td className="p-3">{destination.id}</td>
                                <td className="p-3">{destination.name}</td>
                                <td className="p-3">{destination.category}</td>
                                <td className="p-3">
                                    {/* <img
                                        src={destination.image[0] || 'https://via.placeholder.com/100'}
                                        alt={destination.name}
                                        className="w-16 h-16 object-cover rounded"
                                    /> */}
                                    <a href="#" style={{ color: 'blue', textDecoration: 'none' }}>
                                        <p>lihat gambar</p>
                                    </a>

                                </td>
                                <td className="p-3">
                                    {destination.location.latitude}, {destination.location.longitude}
                                </td>
                                <td className="p-3">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditDestination(destination)}
                                            className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDestination(destination.id)}
                                            className="p-2 text-red-500 hover:bg-red-100 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <Transition appear show={isDialogOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setIsDialogOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            {currentDestination ? 'Edit Destinasi' : 'Tambah Destinasi Baru'}
                                        </Dialog.Title>
                                        <button
                                            onClick={() => setIsDialogOpen(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <DestinationForm
                                        destination={currentDestination}
                                        onSave={handleSaveDestination}
                                        onCancel={() => setIsDialogOpen(false)}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

// Tambahan untuk DestinationForm
const DestinationForm: React.FC<{
    destination?: Destination | null;
    onSave: (destination: Destination) => void;
    onCancel: () => void;
}> = ({ destination, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Destination>(destination || {
        id: 0,
        name: '',
        category: '',
        location: {
            latitude: '',
            longitude: '',
            gmaps: ''
        },
        shortDeskripsi: '',
        longDeskripsi: '',
        image: [],
        fasilitas: ['', '', '', '']
    });
    const [uploadedImages, setUploadedImages] = useState<FileList | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');

        if (section === 'location') {
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setUploadedImages(files);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Konversi file gambar ke URL atau proses upload
        const imageUrls = uploadedImages
            ? Array.from(uploadedImages).map(file => URL.createObjectURL(file))
            : formData.image;

        onSave({
            ...formData,
            image: imageUrls
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Destinasi"
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Kategori"
                    className="border p-2 rounded"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Upload Gambar</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Google Maps Link</label>
                    <input
                        name="location.gmaps"
                        value={formData.location.gmaps}
                        onChange={handleChange}
                        placeholder="https://maps.google.com/"
                        className="border p-2 rounded w-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    name="location.latitude"
                    value={formData.location.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="location.longitude"
                    value={formData.location.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    className="border p-2 rounded"
                    required
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};


export default DestinationsPage;