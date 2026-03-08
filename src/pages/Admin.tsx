import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, X, Upload, Check, AlertCircle } from 'lucide-react';
import { Product } from '../types';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Sample Chocolate',
      price: 4.99,
      description: 'Delicious milk chocolate',
      category: 'Sweet',
      image_url: 'https://via.placeholder.com/150',
    },
  ]);

  const [adminProfile, setAdminProfile] = useState({ profile_pic: 'https://via.placeholder.com/150' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productPreview, setProductPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // --------------------- Handlers ---------------------

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'profile') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      if (type === 'product') setProductPreview(url);
      else setProfilePreview(url);
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
        imageUrl: product.image_url,
      });
      setProductPreview(product.image_url);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '', category: '', imageUrl: '' });
      setProductPreview(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '', category: '', imageUrl: '' });
    setSelectedFile(null);
    setProductPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map(p =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: parseFloat(formData.price), image_url: productPreview || formData.imageUrl }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image_url: productPreview || formData.imageUrl,
      };
      setProducts([...products, newProduct]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleProfilePicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminProfile({ ...adminProfile, profile_pic: profilePreview || formData.imageUrl });
    setIsProfileModalOpen(false);
    setSelectedFile(null);
    setProfilePreview(null);
  };

  // --------------------- JSX ---------------------

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Admin Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-linear-to-r from-blue-600 to-purple-600 rounded-[2.5rem] p-8 md:p-12 mb-12 text-white shadow-2xl shadow-purple-500/20 flex flex-col md:flex-row items-center gap-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex-shrink-0">
              <img src={adminProfile.profile_pic} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => {
                setFormData({ ...formData, imageUrl: adminProfile.profile_pic });
                setProfilePreview(adminProfile.profile_pic);
                setIsProfileModalOpen(true);
              }}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full"
            >
              <Edit2 size={20} />
            </button>
          </div>
          <div className="text-center md:text-left relative">
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

        {/* Admin Panel Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">Admin Panel</h1>
            <p className="text-gray-500">Manage your store inventory and products.</p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-8 py-4 bg-white text-purple-600 border border-purple-100 rounded-full font-bold flex items-center gap-2 shadow-xl shadow-purple-500/20 hover:bg-purple-50 transition-all"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* Products Table */}
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
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={product.image_url} alt="" className="w-full h-full object-cover" />
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
                      <button onClick={() => openModal(product)} className="p-3 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-3 hover:bg-red-50 text-red-600 rounded-xl transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
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
            {/* ...rest of modal remains same, use handleSubmit and productPreview */}
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* ...rest of profile modal remains same, use handleProfilePicSubmit and profilePreview */}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}