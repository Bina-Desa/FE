import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Destination interface
interface Destination {
  id?: number;
  name: string;
  description: string;
  location: string;
  image_url?: string;
}

// Validation schema
const destinationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  location: z.string().min(2, { message: "Location must be at least 2 characters" })
});

const AdminDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<z.infer<typeof destinationSchema>>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: '',
      description: '',
      location: ''
    }
  });

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`https://localhost:3000/api/destinations?page=${page}&perPage=10`);
      setDestinations(response.data.results);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching destinations', error);
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof destinationSchema>) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('location', values.location);

      // Include image if selected
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (imageInput?.files && imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
      }

      if (currentDestination?.id) {
        // Edit existing destination
        await axios.put(`https://localhost:3000/api/destinations/${currentDestination.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new destination
        await axios.post('https://localhost:3000/api/destinations', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      fetchDestinations();
      setIsDialogOpen(false);
      reset();
      setCurrentDestination(null);
    } catch (error) {
      console.error('Error submitting destination', error);
    }
  };

  // Delete destination
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://localhost:3000/api/destinations/${id}`);
      fetchDestinations();
    } catch (error) {
      console.error('Error deleting destination', error);
    }
  };

  // Open dialog for editing
  const handleEdit = (destination: Destination) => {
    setCurrentDestination(destination);
    setValue('name', destination.name);
    setValue('description', destination.description);
    setValue('location', destination.location);
    setIsDialogOpen(true);
  };

  // Open dialog for adding new destination
  const handleAddNew = () => {
    setCurrentDestination(null);
    reset();
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchDestinations();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Destinations Management</h1>
        <button 
          onClick={handleAddNew} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Destination
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {['Name', 'Description', 'Location', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {destinations.map((destination) => (
              <tr key={destination.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{destination.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{destination.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{destination.location}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button 
                    onClick={() => handleEdit(destination)}
                    className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.379-8.379-2.828-2.828z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => destination.id && handleDelete(destination.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Previous
        </button>
        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
        </button>
      </div>

      {/* Dialog Overlay */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  id="description"
                  {...register('description')}
                  className={`mt-1 block w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input 
                  id="location"
                  type="text"
                  {...register('location')}
                  className={`mt-1 block w-full rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input 
                  id="image"
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;
