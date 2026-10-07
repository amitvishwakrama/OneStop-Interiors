'use client';

import React, { useState } from 'react';
import {
  Settings,
  Calculator,
  Award,
  Phone,
  CheckCircle2,
  Loader2,
  Save,
  Sparkles,
} from 'lucide-react';

export function ContentManagerClient({
  initialSettings,
  initialRates,
}: {
  initialSettings: any;
  initialRates: any[];
}) {
  const [activeTab, setActiveTab] = useState<'rates' | 'trust' | 'contact'>('rates');

  // Rates state
  const [rates, setRates] = useState<any[]>(initialRates);

  // Settings state
  const [trustStrip, setTrustStrip] = useState({
    yearsExperience: initialSettings.trustStrip?.yearsExperience || 25,
    projectsCompleted: initialSettings.trustStrip?.projectsCompleted || 550,
    happyClients: initialSettings.trustStrip?.happyClients || 480,
    warrantyYears: initialSettings.trustStrip?.warrantyYears || 5,
  });

  const [contactInfo, setContactInfo] = useState({
    primaryPhone: initialSettings.primaryPhone || '9967302911',
    secondaryPhone: initialSettings.secondaryPhone || '7039821535',
    whatsappNumber: initialSettings.whatsappNumber || '9967302911',
    email: initialSettings.email || 'amitvishwa1950@gmail.com',
    address:
      initialSettings.address ||
      'Laxman Nagar, Kurar Village, Malad East, Mumbai - 400097',
    googleReviewUrl:
      initialSettings.googleReviewUrl || 'https://g.page/r/onestop-interiors/review',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleRateChange = (index: number, field: string, value: number) => {
    const updated = [...rates];
    updated[index][field] = value;
    setRates(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            trustStrip,
            ...contactInfo,
          },
          rates,
        }),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      alert(err.message || 'Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Content, Rates & Site Settings
          </h1>
          <p className="text-xs text-charcoal-500">
            Edit live cost estimator rates, homepage trust counters, and company contact details.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs shadow-warm-sm disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-gold-400" /> Save All Changes
            </>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings and Estimator Rates updated successfully across the live site!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cream-300 pb-2">
        <button
          onClick={() => setActiveTab('rates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'rates'
              ? 'bg-wood-800 text-gold-300 shadow-sm'
              : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-300'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Cost Estimator Rates ({rates.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('trust')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'trust'
              ? 'bg-wood-800 text-gold-300 shadow-sm'
              : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Trust Counters & Warranty</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'contact'
              ? 'bg-wood-800 text-gold-300 shadow-sm'
              : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-300'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contact & Address Info</span>
        </button>
      </div>

      {/* Tab 1: Estimator Rates */}
      {activeTab === 'rates' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-6">
          <h3 className="text-base font-serif font-bold text-charcoal-900 border-b border-cream-200 pb-2">
            Base Rates per Sq. Ft. / Unit (in INR)
          </h3>

          <div className="space-y-6">
            {rates.map((r, idx) => (
              <div
                key={r.serviceType}
                className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-charcoal-900">
                    {r.serviceName}
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cream-200 text-charcoal-700 font-mono">
                    Unit: {r.unit}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-charcoal-700 mb-1">
                      Basic Tier Rate (₹/{r.unit})
                    </label>
                    <input
                      type="number"
                      value={r.basicRate}
                      onChange={(e) =>
                        handleRateChange(idx, 'basicRate', Number(e.target.value))
                      }
                      className="w-full p-2 bg-white border border-cream-300 rounded-xl font-bold"
                    />
                    <div className="text-[10px] text-charcoal-500 mt-1 truncate">
                      {r.basicLabel}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-charcoal-700 mb-1">
                      Standard Tier Rate (₹/{r.unit})
                    </label>
                    <input
                      type="number"
                      value={r.standardRate}
                      onChange={(e) =>
                        handleRateChange(idx, 'standardRate', Number(e.target.value))
                      }
                      className="w-full p-2 bg-white border border-cream-300 rounded-xl font-bold text-wood-800"
                    />
                    <div className="text-[10px] text-charcoal-500 mt-1 truncate">
                      {r.standardLabel}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-charcoal-700 mb-1">
                      Premium Tier Rate (₹/{r.unit})
                    </label>
                    <input
                      type="number"
                      value={r.premiumRate}
                      onChange={(e) =>
                        handleRateChange(idx, 'premiumRate', Number(e.target.value))
                      }
                      className="w-full p-2 bg-white border border-cream-300 rounded-xl font-bold text-gold-700"
                    />
                    <div className="text-[10px] text-charcoal-500 mt-1 truncate">
                      {r.premiumLabel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Trust Strip Counters */}
      {activeTab === 'trust' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-6">
          <h3 className="text-base font-serif font-bold text-charcoal-900 border-b border-cream-200 pb-2">
            Homepage Trust Strip Numbers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                Years Experience Counter
              </label>
              <input
                type="number"
                value={trustStrip.yearsExperience}
                onChange={(e) =>
                  setTrustStrip({ ...trustStrip, yearsExperience: Number(e.target.value) })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-bold text-lg text-wood-800"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                Completed Projects Counter
              </label>
              <input
                type="number"
                value={trustStrip.projectsCompleted}
                onChange={(e) =>
                  setTrustStrip({
                    ...trustStrip,
                    projectsCompleted: Number(e.target.value),
                  })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-bold text-lg text-wood-800"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                Happy Families Counter
              </label>
              <input
                type="number"
                value={trustStrip.happyClients}
                onChange={(e) =>
                  setTrustStrip({ ...trustStrip, happyClients: Number(e.target.value) })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-bold text-lg text-wood-800"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                Warranty Period (Years)
              </label>
              <input
                type="number"
                value={trustStrip.warrantyYears}
                onChange={(e) =>
                  setTrustStrip({ ...trustStrip, warrantyYears: Number(e.target.value) })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-bold text-lg text-gold-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Contact & Address */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-6">
          <h3 className="text-base font-serif font-bold text-charcoal-900 border-b border-cream-200 pb-2">
            Company Contact Numbers & Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                Primary Phone Number *
              </label>
              <input
                type="text"
                value={contactInfo.primaryPhone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, primaryPhone: e.target.value })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                Secondary Phone Number
              </label>
              <input
                type="text"
                value={contactInfo.secondaryPhone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, secondaryPhone: e.target.value })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                WhatsApp Business Number (with 91 prefix)
              </label>
              <input
                type="text"
                value={contactInfo.whatsappNumber}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, whatsappNumber: e.target.value })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-charcoal-700 mb-1">
                Workshop / Business Address *
              </label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, address: e.target.value })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-charcoal-700 mb-1">
                Google Review Link
              </label>
              <input
                type="url"
                value={contactInfo.googleReviewUrl}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, googleReviewUrl: e.target.value })
                }
                className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

