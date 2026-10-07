import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProjectManagerClient } from '@/components/admin/ProjectManagerClient';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  await connectToDatabase();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

  return (
    <AdminLayout user={session.user}>
      <ProjectManagerClient initialProjects={JSON.parse(JSON.stringify(projects))} />
    </AdminLayout>
  );
}

