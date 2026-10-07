'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Download,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Calendar,
  X,
  Plus,
  CheckCircle2,
  FileText,
  User,
  Trash2,
  Loader2,
} from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';

export function LeadCrmClient({
  initialLeads,
  partners,
}: {
  initialLeads: any[];
  partners: any[];
}) {
  const [leads, setLeads] = useState<any[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Lead update form state
  const [isUpdating, setIsUpdating] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editValue, setEditValue] = useState<number | string>(0);
  const [editPartner, setEditPartner] = useState('');
  const [editFollowUp, setEditFollowUp] = useState('');

  const openLeadDetail = (lead: any) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditValue(lead.estimatedValue || 0);
    setEditPartner(lead.assignedPartnerId?._id || lead.assignedPartnerId || '');
    setEditFollowUp(
      lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : ''
    );
    setNewNote('');
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          estimatedValue: Number(editValue),
          assignedPartnerId: editPartner || null,
          followUpDate: editFollowUp || null,
          newNote: newNote.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to update lead');

      // Update in local state
      setLeads((prev) =>
        prev.map((l) => (l._id === selectedLead._id ? json.lead : l))
      );
      setSelectedLead(json.lead);
      setNewNote('');
    } catch (err: any) {
      alert(err.message || 'Error updating lead');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        if (selectedLead?._id === id) setSelectedLead(null);
      }
    } catch (err) {
      alert('Failed to delete lead');
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const s = search.toLowerCase();
    const matchesSearch =
      !search ||
      l.name?.toLowerCase().includes(s) ||
      l.phone?.includes(s) ||
      l.area?.toLowerCase().includes(s) ||
      l.serviceType?.toLowerCase().includes(s);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      contacted: 'bg-amber-100 text-amber-800 border-amber-200',
      site_visit_scheduled: 'bg-purple-100 text-purple-800 border-purple-200',
      quotation_sent: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      won: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      lost: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Lead CRM Pipeline
          </h1>
          <p className="text-xs text-charcoal-500">
            Manage inquiries, assign partners, update project values, and generate quotations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/leads/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-cream-100 text-charcoal-800 font-semibold text-xs border border-cream-300 shadow-warm-sm transition"
          >
            <Download className="w-4 h-4 text-wood-700" />
            <span>Export to CSV</span>
          </a>

          <Link
            href="/admin/quotations"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-semibold text-xs shadow-warm-sm transition"
          >
            <FileText className="w-4 h-4 text-gold-400" />
            <span>New Quotation</span>
          </Link>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white rounded-2xl p-4 border border-cream-300 shadow-warm-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'new', label: 'New' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'site_visit_scheduled', label: 'Site Visit' },
            { id: 'quotation_sent', label: 'Quote Sent' },
            { id: 'won', label: 'Won' },
            { id: 'lost', label: 'Lost' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === tab.id
                  ? 'bg-wood-800 text-gold-300 shadow-sm'
                  : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-cream-100/80 border-b border-cream-300 text-charcoal-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Client Name & Phone</th>
                <th className="py-3.5 px-4">Service & Area</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Est. Value (INR)</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-charcoal-400">
                    No leads found matching your search.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((l) => (
                  <tr
                    key={l._id}
                    className="hover:bg-cream-50/70 transition cursor-pointer"
                    onClick={() => openLeadDetail(l)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-charcoal-900">{l.name}</div>
                      <div className="text-charcoal-500 font-mono text-[11px]">{l.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-charcoal-800">{l.serviceType}</div>
                      <div className="text-charcoal-500 text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold-600" /> {l.area}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(
                          l.status
                        )}`}
                      >
                        {l.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-charcoal-900">
                      {formatINR(l.estimatedValue || 0)}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500 capitalize">
                      {l.source?.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500 whitespace-nowrap">
                      {formatDate(l.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${l.phone}`}
                          className="p-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-charcoal-700 transition"
                          title="Call Client"
                        >
                          <Phone className="w-3.5 h-3.5 text-wood-700" />
                        </a>
                        <a
                          href={`https://wa.me/91${l.phone.slice(-10)}?text=${encodeURIComponent(
                            `Namaste ${l.name}ji, I am Shobhnath Vishwakarma from OneStop Interiors regarding your enquiry.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        </a>
                        <button
                          onClick={() => openLeadDetail(l)}
                          className="px-2.5 py-1 rounded-lg bg-wood-800 hover:bg-wood-900 text-white font-bold text-[11px]"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail & Update Modal Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-warm-xl border border-cream-300 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-wood-950 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-bold text-cream-50">
                    {selectedLead.name}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(
                      selectedLead.status
                    )}`}
                  >
                    {selectedLead.status}
                  </span>
                </div>
                <p className="text-xs text-cream-300 mt-0.5">
                  Phone: {selectedLead.phone} • Area: {selectedLead.area}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteLead(selectedLead._id)}
                  className="p-2 rounded-xl bg-red-950/70 text-red-300 hover:bg-red-900 transition"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl bg-wood-900 text-cream-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Action Ribbon */}
            <div className="bg-cream-100 p-3 px-6 border-b border-cream-300 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-wood-800 text-white text-xs font-bold shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Call {selectedLead.phone}</span>
                </a>
                <a
                  href={`https://wa.me/91${selectedLead.phone.slice(-10)}?text=${encodeURIComponent(
                    `Namaste ${selectedLead.name}ji, I am Shobhnath Vishwakarma from OneStop Interiors.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <Link
                href={`/admin/quotations?leadId=${selectedLead._id}&name=${encodeURIComponent(
                  selectedLead.name
                )}&phone=${selectedLead.phone}&area=${encodeURIComponent(selectedLead.area)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-white text-xs font-bold shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Create Quotation PDF</span>
              </Link>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Original Message */}
              {selectedLead.message && (
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-charcoal-700 uppercase tracking-wide text-[10px] mb-1">
                    Client Requirements:
                  </div>
                  <p className="text-charcoal-800 italic">{selectedLead.message}</p>
                </div>
              )}

              {/* Status & Value Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-charcoal-700 mb-1">
                    Pipeline Status:
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 font-semibold focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="new">New Inquiry</option>
                    <option value="contacted">Contacted on Call</option>
                    <option value="site_visit_scheduled">Site Visit Scheduled</option>
                    <option value="quotation_sent">Quotation Sent</option>
                    <option value="won">Won (Deal Closed)</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-charcoal-700 mb-1">
                    Estimated Project Value (INR):
                  </label>
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 font-bold focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal-700 mb-1">
                    Assign Trade Partner:
                  </label>
                  <select
                    value={editPartner}
                    onChange={(e) => setEditPartner(e.target.value)}
                    className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 font-semibold focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="">No Partner Assigned</option>
                    {partners.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.trade.toUpperCase()}) - Ph: {p.phone}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-charcoal-700 mb-1">
                    Follow-up Reminder Date:
                  </label>
                  <input
                    type="date"
                    value={editFollowUp}
                    onChange={(e) => setEditFollowUp(e.target.value)}
                    className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 font-semibold focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Add Note */}
              <div>
                <label className="block font-bold text-charcoal-700 mb-1">
                  Add Interaction Note:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Visited site at Kandivali. Plywood sample approved. Quote needed by Friday."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Notes Timeline */}
              <div>
                <h4 className="font-bold text-charcoal-800 uppercase tracking-wider text-[11px] mb-2">
                  Notes Timeline:
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedLead.notes?.map((n: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-cream-50 border border-cream-200"
                    >
                      <div className="flex items-center justify-between text-[10px] text-charcoal-500 mb-1 font-semibold">
                        <span>{n.author}</span>
                        <span>{formatDate(n.createdAt)}</span>
                      </div>
                      <p className="text-charcoal-800">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-cream-100 border-t border-cream-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-600 hover:bg-cream-200"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleUpdateLead}
                disabled={isUpdating}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-wood-800 hover:bg-wood-900 text-white shadow-warm-sm flex items-center gap-1.5 disabled:opacity-60"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

