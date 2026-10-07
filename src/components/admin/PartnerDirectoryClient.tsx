'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Phone,
  MessageSquare,
  Star,
  MapPin,
  CheckCircle2,
  X,
  Loader2,
  Filter,
} from 'lucide-react';

export function PartnerDirectoryClient({ initialPartners }: { initialPartners: any[] }) {
  const [partners, setPartners] = useState<any[]>(initialPartners);
  const [tradeFilter, setTradeFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New partner state
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('electrician');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(5);
  const [areas, setAreas] = useState('Malad, Kandivali, Borivali');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          trade,
          phone: phone.trim(),
          rating: Number(rating),
          serviceAreas: areas.split(',').map((a) => a.trim()),
          notes: notes.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to add partner');

      setPartners([...partners, json.partner]);
      setShowAddModal(false);
      setName('');
      setPhone('');
      setNotes('');
    } catch (err: any) {
      alert(err.message || 'Error saving partner');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPartners = partners.filter(
    (p) => tradeFilter === 'all' || p.trade === tradeFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Trade Partner Directory
          </h1>
          <p className="text-xs text-charcoal-500">
            Electricians, plumbers, painters, tile & POP specialists working under our contractor supervision.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs shadow-warm-sm"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Add New Trade Partner</span>
        </button>
      </div>

      {/* Trade Filter Tabs */}
      <div className="bg-white rounded-2xl p-3 border border-cream-300 shadow-warm-sm flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Trades' },
          { id: 'electrician', label: 'Electricians' },
          { id: 'plumber', label: 'Plumbers' },
          { id: 'painter', label: 'Painters' },
          { id: 'pop_false_ceiling', label: 'POP / Ceilings' },
          { id: 'tiles_flooring', label: 'Tile & Marble' },
          { id: 'civil', label: 'Civil Repair' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTradeFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              tradeFilter === tab.id
                ? 'bg-wood-800 text-gold-300 shadow-sm'
                : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cream-200 text-charcoal-800 text-[10px] font-bold uppercase tracking-wider">
                  {p.trade.replace(/_/g, ' ')}
                </span>
                <span className="flex items-center gap-1 text-gold-600 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-gold-500" />
                  <span>{p.rating} / 5</span>
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-1">
                {p.name}
              </h3>

              <div className="text-xs text-charcoal-600 font-mono font-medium mb-3">
                Ph: {p.phone}
              </div>

              <div className="space-y-1.5 text-xs text-charcoal-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span className="line-clamp-1">
                    Areas: {p.serviceAreas?.join(', ') || 'Mumbai & Thane'}
                  </span>
                </div>
                {p.notes && (
                  <p className="text-[11px] text-charcoal-500 italic pt-1 border-t border-cream-200 mt-2">
                    &quot;{p.notes}&quot;
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-200 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {p.availability || 'Available'}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${p.phone}`}
                  className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-charcoal-700"
                  title="Call Partner"
                >
                  <Phone className="w-3.5 h-3.5 text-wood-800" />
                </a>
                <a
                  href={`https://wa.me/91${p.phone.slice(-10)}?text=${encodeURIComponent(
                    `Namaste ${p.name}ji, Shobhnath Vishwakarma here. I have an interior site requirement for your trade.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                  title="WhatsApp Partner"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-600" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-warm-xl border border-cream-300">
            <div className="flex items-center justify-between mb-4 border-b border-cream-200 pb-2">
              <h3 className="text-base font-serif font-bold text-charcoal-900">
                Add Trade Partner
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPartner} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-charcoal-700 mb-1">
                  Partner Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Trade *</label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-bold"
                >
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="painter">Painter</option>
                  <option value="pop_false_ceiling">POP / False Ceiling</option>
                  <option value="tiles_flooring">Tiles & Marble</option>
                  <option value="civil">Civil Masonry</option>
                  <option value="fabrication">Safety Grills / Fabrication</option>
                  <option value="glass_aluminium">Glass & Aluminium</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Service Areas</label>
                <input
                  type="text"
                  value={areas}
                  onChange={(e) => setAreas(e.target.value)}
                  placeholder="e.g. Malad, Kandivali, Thane"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Specialty Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Master in concealed DB dressing and profile lights"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs shadow-warm-sm"
                >
                  {isSubmitting ? 'Saving Partner...' : 'Save Trade Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

