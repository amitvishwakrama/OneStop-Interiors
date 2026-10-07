'use client';

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Phone,
  Calculator,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';

export function QuotationGeneratorClient({
  initialQuotations,
  leads,
  prefillLeadId,
  prefillName,
  prefillPhone,
  prefillArea,
}: {
  initialQuotations: any[];
  leads: any[];
  prefillLeadId?: string;
  prefillName?: string;
  prefillPhone?: string;
  prefillArea?: string;
}) {
  const [quotations, setQuotations] = useState<any[]>(initialQuotations);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  // Quotation form state
  const [leadId, setLeadId] = useState(prefillLeadId || '');
  const [clientName, setClientName] = useState(prefillName || '');
  const [clientPhone, setClientPhone] = useState(prefillPhone || '');
  const [clientAddress, setClientAddress] = useState(prefillArea || '');
  const [projectTitle, setProjectTitle] = useState('2BHK Modular Interior Execution');
  const [discount, setDiscount] = useState<number>(0);
  const [gstPercentage, setGstPercentage] = useState<number>(18);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdQuote, setCreatedQuote] = useState<any | null>(null);

  // Line items state
  const [items, setItems] = useState<any[]>([
    {
      service: 'Modular Kitchen',
      description: 'L-Shape Kitchen, IS:710 Marine Ply, Acrylic Shutters, Hettich Tandem Drawers',
      quantity: 110,
      unit: 'sq.ft',
      rate: 1850,
      amount: 203500,
    },
    {
      service: 'Modular Wardrobes',
      description: 'Master Bedroom Sliding Wardrobe, Floor-to-Ceiling, Textured Laminate',
      quantity: 90,
      unit: 'sq.ft',
      rate: 1650,
      amount: 148500,
    },
    {
      service: 'False Ceiling & POP',
      description: 'Gyproc Ceiling with Concealed LED Cove Light Trough in Living & Master',
      quantity: 380,
      unit: 'sq.ft',
      rate: 130,
      amount: 49400,
    },
  ]);

  // Recalculate line amount
  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index][field] = value;
    if (field === 'quantity' || field === 'rate') {
      const q = Number(updated[index].quantity) || 0;
      const r = Number(updated[index].rate) || 0;
      updated[index].amount = Math.round(q * r);
    }
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        service: 'Carpentry & Furniture',
        description: 'Custom Wooden Bed / TV Console Unit',
        quantity: 1,
        unit: 'nos',
        rate: 35000,
        amount: 35000,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
  const taxable = Math.max(0, subtotal - discount);
  const gstAmount = Math.round((taxable * gstPercentage) / 100);
  const grandTotal = taxable + gstAmount;

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Please add at least one line item to the quotation');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: leadId || undefined,
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientAddress: clientAddress.trim(),
          projectTitle: projectTitle.trim(),
          items,
          discount,
          gstPercentage,
          validityDays: 30,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to create quotation');

      setQuotations([json.quotation, ...quotations]);
      setCreatedQuote(json.quotation);
    } catch (err: any) {
      alert(err.message || 'Error generating quotation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Professional Quotation Generator
          </h1>
          <p className="text-xs text-charcoal-500">
            Create itemized quotations with company branding, GST, terms, and export instant branded PDFs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'create'
                ? 'bg-wood-800 text-gold-300 shadow-sm'
                : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-300'
            }`}
          >
            Create Quotation
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'history'
                ? 'bg-wood-800 text-gold-300 shadow-sm'
                : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-300'
            }`}
          >
            Quotation History ({quotations.length})
          </button>
        </div>
      </div>

      {activeTab === 'create' ? (
        <form onSubmit={handleCreateQuotation} className="space-y-8">
          {/* Client Details Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-charcoal-900 border-b border-cream-200 pb-2">
              Client & Project Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal-700 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 font-mono focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">
                  Site Address / Area *
                </label>
                <input
                  type="text"
                  required
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="e.g. Oberoi Woods, Goregaon East"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. 2BHK Turnkey Interior"
                  className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Line Items Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 pb-2">
              <h3 className="text-base font-serif font-bold text-charcoal-900">
                Scope of Work & Itemized Pricing (BOQ)
              </h3>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-white text-xs font-bold transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Line Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-cream-50 border border-cream-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs"
                >
                  <div className="md:col-span-3">
                    <label className="block font-bold text-charcoal-700 mb-1">Service</label>
                    <input
                      type="text"
                      value={item.service}
                      onChange={(e) => handleItemChange(idx, 'service', e.target.value)}
                      className="w-full p-2 bg-white border border-cream-300 rounded-lg text-charcoal-900 font-bold"
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label className="block font-bold text-charcoal-700 mb-1">Specifications & Material</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="w-full p-2 bg-white border border-cream-300 rounded-lg text-charcoal-900"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block font-bold text-charcoal-700 mb-1">Qty</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                      className="w-full p-2 bg-white border border-cream-300 rounded-lg text-charcoal-900 text-right font-bold"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block font-bold text-charcoal-700 mb-1">Unit</label>
                    <select
                      value={item.unit}
                      onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                      className="w-full p-2 bg-white border border-cream-300 rounded-lg text-charcoal-900"
                    >
                      <option value="sq.ft">sq.ft</option>
                      <option value="r.ft">r.ft</option>
                      <option value="nos">nos</option>
                      <option value="points">points</option>
                      <option value="package">package</option>
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block font-bold text-charcoal-700 mb-1">Rate (₹)</label>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(idx, 'rate', Number(e.target.value))}
                      className="w-full p-2 bg-white border border-cream-300 rounded-lg text-charcoal-900 text-right font-bold"
                    />
                  </div>

                  <div className="md:col-span-1 text-right">
                    <label className="block font-bold text-charcoal-700 mb-1">Total</label>
                    <div className="p-2 font-bold text-charcoal-900 truncate">
                      ₹{Number(item.amount || 0).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      disabled={items.length <= 1}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations & Summary Row */}
            <div className="pt-6 border-t border-cream-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-3 text-xs w-full md:w-80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-charcoal-700">Special Discount (₹):</span>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    className="w-32 p-1.5 bg-cream-50 border border-cream-300 rounded-lg text-right font-bold"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-charcoal-700">GST Rate:</span>
                  <select
                    value={gstPercentage}
                    onChange={(e) => setGstPercentage(Number(e.target.value))}
                    className="w-32 p-1.5 bg-cream-50 border border-cream-300 rounded-lg text-charcoal-900 font-bold"
                  >
                    <option value={0}>0% (Exempt / Civil)</option>
                    <option value={18}>18% (Standard GST)</option>
                  </select>
                </div>
              </div>

              {/* Totals Display Box */}
              <div className="bg-wood-950 text-white rounded-2xl p-5 w-full md:w-80 space-y-2 text-xs">
                <div className="flex justify-between text-cream-300">
                  <span>Subtotal:</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold-400">
                    <span>Discount:</span>
                    <span>- {formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-cream-300">
                  <span>GST ({gstPercentage}%):</span>
                  <span>{formatINR(gstAmount)}</span>
                </div>
                <div className="pt-2 border-t border-wood-800 flex justify-between text-base font-bold text-gold-400 font-serif">
                  <span>Grand Total:</span>
                  <span>{formatINR(grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm shadow-warm-md flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating PDF Quotation...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Save & Generate Branded PDF Quotation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Success Banner if quote was generated */}
          {createdQuote && (
            <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-500 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-base">
                    Quotation #{createdQuote.quotationNumber} Generated Successfully!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Grand Total: {formatINR(createdQuote.totalAmount)} for {createdQuote.clientName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`/api/admin/quotations/${createdQuote._id}/pdf`}
                  download
                  className="px-5 py-2.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4 text-gold-400" />
                  <span>Download Branded PDF</span>
                </a>

                <a
                  href={`https://wa.me/91${createdQuote.clientPhone.slice(-10)}?text=${encodeURIComponent(
                    `Namaste ${createdQuote.clientName}ji, please find attached the quotation #${createdQuote.quotationNumber} from OneStop Interiors for your project "${createdQuote.projectTitle}". Total estimate: Rs. ${createdQuote.totalAmount.toLocaleString('en-IN')}. Shobhnath Vishwakarma: 9967302911.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Share via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </form>
      ) : (
        /* Quotation History Tab */
        <div className="bg-white rounded-3xl border border-cream-300 shadow-warm-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-cream-100/80 border-b border-cream-300 text-charcoal-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Quote Number</th>
                  <th className="py-3.5 px-4">Client Name & Phone</th>
                  <th className="py-3.5 px-4">Project Title</th>
                  <th className="py-3.5 px-4">Total Amount (INR)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {quotations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-charcoal-400">
                      No quotations generated yet. Create your first quotation above!
                    </td>
                  </tr>
                ) : (
                  quotations.map((q) => (
                    <tr key={q._id} className="hover:bg-cream-50/70 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-wood-900">
                        {q.quotationNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-charcoal-900">{q.clientName}</div>
                        <div className="text-charcoal-500 text-[11px]">{q.clientPhone}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-charcoal-800">
                        {q.projectTitle}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-charcoal-900">
                        {formatINR(q.totalAmount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-bold uppercase">
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-charcoal-500 whitespace-nowrap">
                        {formatDate(q.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/api/admin/quotations/${q._id}/pdf`}
                            download
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-[11px] shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5 text-gold-400" />
                            <span>Download PDF</span>
                          </a>
                          <a
                            href={`https://wa.me/91${q.clientPhone?.slice(-10)}?text=${encodeURIComponent(
                              `Namaste ${q.clientName}ji, please find your quotation #${q.quotationNumber} for Rs. ${q.totalAmount?.toLocaleString('en-IN')}. Shobhnath Vishwakarma, OneStop Interiors.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            title="Share on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

