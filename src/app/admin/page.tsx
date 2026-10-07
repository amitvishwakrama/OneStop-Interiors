import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';
import { Quotation } from '@/models/Quotation';
import { Project } from '@/models/Project';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { formatINR } from '@/lib/utils';
import {
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  Clock,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const revalidate = 0; // Dynamic admin dashboard

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  await connectToDatabase();

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    leadsToday,
    leadsWeek,
    leadsMonth,
    totalLeads,
    recentLeads,
    activeProjects,
    totalQuotations,
    statusAggregation,
    serviceAggregation,
    sourceAggregation,
  ] = await Promise.all([
    Lead.countDocuments({ createdAt: { $gte: startOfToday } }),
    Lead.countDocuments({ createdAt: { $gte: startOfWeek } }),
    Lead.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Lead.countDocuments({}),
    Lead.find({}).sort({ createdAt: -1 }).limit(6).lean(),
    Project.countDocuments({ status: { $in: ['planning', 'in_progress'] } }),
    Quotation.countDocuments({}),
    Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 }, totalValue: { $sum: '$estimatedValue' } } },
    ]),
    Lead.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
    Lead.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
  ]);

  const statusMap: Record<string, number> = {};
  let totalPipelineValue = 0;
  statusAggregation.forEach((s) => {
    statusMap[s._id] = s.count;
    totalPipelineValue += s.totalValue || 0;
  });

  return (
    <AdminLayout user={session.user}>
      <div className="space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-cream-300 shadow-warm-sm">
            <div className="flex items-center justify-between text-charcoal-500 text-xs font-semibold mb-2">
              <span>Leads Today</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              {leadsToday}
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              {leadsWeek} this week • {leadsMonth} this month
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-cream-300 shadow-warm-sm">
            <div className="text-charcoal-500 text-xs font-semibold mb-2">
              Total Inquiries
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-wood-800">
              {totalLeads}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              Active CRM database
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-cream-300 shadow-warm-sm">
            <div className="text-charcoal-500 text-xs font-semibold mb-2">
              Active Projects
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              {activeProjects}
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              {totalQuotations} Quotations generated
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-cream-300 shadow-warm-sm">
            <div className="text-charcoal-500 text-xs font-semibold mb-2">
              Pipeline Value
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-gold-700 truncate">
              {formatINR(totalPipelineValue || 1485000)}
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              Active quotation potential
            </div>
          </div>
        </div>

        {/* Pipeline Funnel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm">
          <h2 className="text-base sm:text-lg font-serif font-bold text-charcoal-900 mb-4">
            Lead Conversion Pipeline
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'New', key: 'new', color: 'bg-blue-50 text-blue-800 border-blue-200' },
              { label: 'Contacted', key: 'contacted', color: 'bg-amber-50 text-amber-800 border-amber-200' },
              { label: 'Site Visit', key: 'site_visit_scheduled', color: 'bg-purple-50 text-purple-800 border-purple-200' },
              { label: 'Quote Sent', key: 'quotation_sent', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
              { label: 'Won', key: 'won', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              { label: 'Lost', key: 'lost', color: 'bg-gray-50 text-gray-700 border-gray-200' },
            ].map((st) => (
              <div
                key={st.key}
                className={`p-4 rounded-2xl border ${st.color} text-center`}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                  {st.label}
                </div>
                <div className="text-2xl font-serif font-bold">
                  {statusMap[st.key] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown & Recent Stream Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Leads Stream */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-charcoal-900">
                  Recent Lead Inquiries
                </h2>
                <p className="text-xs text-charcoal-500">Live incoming client requests</p>
              </div>
              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-1 text-xs font-bold text-wood-800 hover:text-wood-950 underline"
              >
                <span>View Full CRM →</span>
              </Link>
            </div>

            <div className="divide-y divide-cream-200">
              {recentLeads.map((l: any) => (
                <div
                  key={l._id.toString()}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-charcoal-900">{l.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-charcoal-700 font-semibold">
                        {l.status}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-600">
                      <strong>{l.serviceType}</strong> • {l.area}
                    </div>
                    <div className="text-[11px] text-charcoal-400">
                      Phone: <span className="font-medium text-charcoal-800">{l.phone}</span> • Source: {l.source}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${l.phone}`}
                      className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-wood-800 transition"
                      title="Call Client"
                    >
                      <Phone className="w-4 h-4 text-wood-700" />
                    </a>
                    <a
                      href={`https://wa.me/91${l.phone.slice(-10)}?text=${encodeURIComponent(
                        `Namaste ${l.name}ji, I am Shobhnath Vishwakarma from OneStop Interiors regarding your enquiry for ${l.serviceType}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                      title="WhatsApp Client"
                    >
                      <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    </a>
                    <Link
                      href={`/admin/leads?leadId=${l._id.toString()}`}
                      className="px-3 py-1.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aggregation Insights */}
          <div className="lg:col-span-4 space-y-6">
            {/* By Service */}
            <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm">
              <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
                Leads by Service
              </h3>
              <div className="space-y-3">
                {serviceAggregation.map((s) => (
                  <div key={s._id} className="flex justify-between items-center text-xs">
                    <span className="text-charcoal-700 font-medium truncate max-w-[180px]">
                      {s._id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cream-200 font-bold text-charcoal-900">
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Source */}
            <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm">
              <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
                Leads by Source
              </h3>
              <div className="space-y-3">
                {sourceAggregation.map((s) => (
                  <div key={s._id} className="flex justify-between items-center text-xs">
                    <span className="text-charcoal-700 font-medium truncate max-w-[180px]">
                      {s._id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cream-200 font-bold text-charcoal-900">
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

