'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Sparkles,
  X,
  Loader2,
  Check,
} from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';

export function ProjectManagerClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [showAddModal, setShowAddModal] = useState(false);

  // New project state
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceType, setServiceType] = useState('Full Home Turnkey Interior');
  const [area, setArea] = useState('');
  const [totalBudget, setTotalBudget] = useState<number | string>(450000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          serviceType,
          area: area.trim(),
          totalBudget: Number(totalBudget),
          advancePaid: Math.round(Number(totalBudget) * 0.5),
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to create project');

      setProjects([json.project, ...projects]);
      setShowAddModal(false);
      setTitle('');
      setClientName('');
      setClientPhone('');
      setArea('');
    } catch (err: any) {
      alert(err.message || 'Error creating project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projectId, status: newStatus }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p._id === projectId ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Project Execution Manager
          </h1>
          <p className="text-xs text-charcoal-500">
            Track active job sites, payment stages (50-40-10), and request Google reviews on handover.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs shadow-warm-sm"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Start New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-3 bg-white rounded-3xl p-12 text-center text-charcoal-400 border border-cream-300">
            No active projects yet. Convert a won lead or click Start New Project above!
          </div>
        ) : (
          projects.map((proj) => {
            const isCompleted = proj.status === 'completed';
            const reviewWhatsAppMessage = `Namaste ${proj.clientName}ji, Thank you for choosing OneStop Interiors! Our master carpentry team completed your project "${proj.title}". We hope you love the craftsmanship. Could you please take 30 seconds to support Shobhnathji by writing a Google Review here: https://g.page/r/onestop-interiors/review. Thank you!`;

            return (
              <div
                key={proj._id}
                className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500">
                      {proj.serviceType}
                    </span>
                    <select
                      value={proj.status}
                      onChange={(e) => updateProjectStatus(proj._id, e.target.value)}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase border bg-cream-50 focus:outline-none"
                    >
                      <option value="planning">Planning</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="on_hold">On Hold</option>
                    </select>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-1">
                    {proj.title}
                  </h3>
                  <div className="text-xs font-semibold text-charcoal-700">
                    Client: {proj.clientName} • Ph: {proj.clientPhone}
                  </div>
                  <div className="text-[11px] text-charcoal-500 flex items-center gap-1 mt-0.5 mb-4">
                    <MapPin className="w-3 h-3 text-gold-600" /> {proj.area}
                  </div>

                  {/* Payment Milestones */}
                  <div className="bg-cream-50 p-3.5 rounded-2xl border border-cream-200 space-y-2 mb-4 text-xs">
                    <div className="flex justify-between font-bold text-charcoal-900 border-b border-cream-200 pb-1">
                      <span>Total Project Budget:</span>
                      <span className="text-wood-800">{formatINR(proj.totalBudget)}</span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      {proj.paymentMilestones?.map((m: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-charcoal-600">
                          <span className="flex items-center gap-1">
                            {m.status === 'paid' ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Clock className="w-3 h-3 text-amber-500" />
                            )}
                            <span>{m.name}</span>
                          </span>
                          <span className="font-semibold text-charcoal-800">
                            {formatINR(m.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-cream-200 space-y-2">
                  {/* Google Review Trigger on Completion */}
                  {isCompleted ? (
                    <a
                      href={`https://wa.me/91${proj.clientPhone.slice(-10)}?text=${encodeURIComponent(
                        reviewWhatsAppMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      <Star className="w-4 h-4 fill-white" />
                      <span>Request Google Review on WhatsApp</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-charcoal-500">
                      <span>Started: {formatDate(proj.startDate || proj.createdAt)}</span>
                      <a
                        href={`https://wa.me/91${proj.clientPhone.slice(-10)}?text=${encodeURIComponent(
                          `Namaste ${proj.clientName}ji, updating you on the work progress today.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold flex items-center gap-1 hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-emerald-600" />
                        <span>Send Update</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Start Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-warm-xl border border-cream-300">
            <div className="flex items-center justify-between mb-4 border-b border-cream-200 pb-2">
              <h3 className="text-base font-serif font-bold text-charcoal-900">
                Start New Project Tracking
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2BHK Turnkey Interior at Runwal Greens"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Ketan Parikh"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Area / Location *</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Mulund West, Mumbai"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Total Agreed Budget (₹) *</label>
                <input
                  type="number"
                  required
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-bold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs shadow-warm-sm"
                >
                  {isSubmitting ? 'Creating Project...' : 'Initialize Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

