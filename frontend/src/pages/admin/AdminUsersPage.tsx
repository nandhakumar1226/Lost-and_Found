import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { User } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Search, UserCheck, UserX, Shield, CheckCircle, Edit, Key, X, Mail, Phone, Lock } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  // Edit User Modal State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState<'USER' | 'ADMIN'>('USER');
  const [editActive, setEditActive] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to load admin users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (userId: number) => {
    try {
      await adminApi.toggleUserActive(userId);
      setActionMessage(`User status updated.`);
      fetchUsers();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error('Failed to toggle active status:', err);
    }
  };

  const handleRoleChange = async (userId: number, role: string) => {
    try {
      await adminApi.updateUserRole(userId, role);
      setActionMessage(`User role updated to ${role}.`);
      fetchUsers();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditRole(user.role);
    setEditActive(user.active);
    setNewPassword('');
    setModalError('');
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setModalError('');
    setSubmitting(true);

    try {
      await adminApi.updateUser(editingUser.userId, {
        name: editName.trim(),
        email: editEmail.trim(),
        phone: editPhone.trim(),
        role: editRole,
        active: editActive,
        password: newPassword.trim() || undefined,
      });

      setSubmitting(false);
      setEditingUser(null);
      setActionMessage(`User details & credentials for ${editName} updated successfully.`);
      fetchUsers();
      setTimeout(() => setActionMessage(''), 4000);
    } catch (err: any) {
      setSubmitting(false);
      setModalError(err.response?.data?.message || 'Failed to update user details.');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery)
  );

  if (loading) return <LoadingSpinner message="Loading user directory..." />;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Registered User Registry</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          View & edit registered students and administrators, update contact details, or reset passwords.
        </p>
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {actionMessage}
        </div>
      )}

      {/* Search Input */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">User Details</th>
                <th className="p-3.5">Contact Phone</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.userId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-mono text-slate-400">#{u.userId}</td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{u.email}</p>
                  </td>
                  <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">{u.phone}</td>
                  <td className="p-3.5">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.userId, e.target.value)}
                      className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      u.active ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {u.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(u)}
                      className="btn-secondary text-[11px] px-2.5 py-1 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border-blue-200 dark:border-blue-800"
                      title="Edit Account Details & Password"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit & Reset Pass
                    </button>
                    <button
                      onClick={() => handleToggleActive(u.userId)}
                      className={`btn-secondary text-[11px] px-2.5 py-1 ${
                        u.active ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {u.active ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                      {u.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT USER & RESET PASSWORD MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
                <Shield className="w-5 h-5 text-blue-600" />
                Edit Account & Password (ID: #{editingUser.userId})
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Contact</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as 'USER' | 'ADMIN')}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                  >
                    <option value="USER">USER (Student)</option>
                    <option value="ADMIN">ADMIN (Administrator)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-amber-700" />
                  Override / Reset Password (Optional)
                </label>
                <input
                  type="password"
                  placeholder="Enter new password to override (leave blank to keep current)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  As an administrator, entering a new password here will immediately update the user's login credentials.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={editActive}
                  onChange={(e) => setEditActive(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="activeCheck" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Account is Active (Uncheck to disable access)
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn-secondary text-xs px-4 py-2"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-5 py-2"
                  disabled={submitting}
                >
                  {submitting ? 'Saving Changes...' : 'Save User & Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
