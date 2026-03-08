import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, X, Upload, Check, AlertCircle } from 'lucide-react';
import { Product } from '../types';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    
    if (selectedFile) {
      data.append('image', selectedFile);
    } else if (formData.imageUrl) {
      data.append('imageUrl', formData.imageUrl);
    }

    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        fetchProducts();
        closeModal();
      }
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) fetchProducts();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        imageUrl: product.image_url
      });
      setPreviewUrl(product.image_url);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '', category: '', imageUrl: '' });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Admin Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-blue-600 to-purple-600 rounded-[2.5rem] p-8 md:p-12 mb-12 text-white shadow-2xl shadow-purple-500/20 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex-shrink-0">
            <img 
              src="https://picsum.photos/seed/admin/300/300" 
              alt="Admin" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Admin Profile</h2>
            <p className="text-white/80 font-medium mb-4">Master Curator & Brand Manager</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Total Products</p>
                <p className="text-xl font-black">{products.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Status</p>
                <p className="text-xl font-black">Online</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">Admin Panel</h1>
            <p className="text-gray-500">Manage your store inventory and products.</p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold flex items-center gap-2 shadow-xl shadow-purple-500/20 hover:shadow-blue-500/40 transition-all"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Product</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Category</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Price</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={product.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-black text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-3 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-3 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Product Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price ($)</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                  <input
                    required
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Product Image</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full py-12 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-3 group-hover:border-purple-500 transition-all bg-gray-50">
                          <Upload className="text-gray-400 group-hover:text-purple-500" />
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-purple-500">Upload File</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">OR</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div className="aspect-square rounded-3xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center relative">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="text-center p-6">
                          <AlertCircle className="mx-auto text-gray-200 mb-2" size={32} />
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">No Preview Available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full py-5 bg-black text-white rounded-full font-bold text-lg shadow-2xl shadow-black/20 hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={20} /> {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
