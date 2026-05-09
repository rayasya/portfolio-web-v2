"use server";

import { db } from "@/db";
import { projects, certificates, contacts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─── PROJECTS ───────────────────────────────────────

export async function getProjects() {
  return await db.select().from(projects).orderBy(projects.createdAt);
}

export async function addProject(data: {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}) {
  await db.insert(projects).values(data);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProject(
  id: number,
  data: {
    title: string;
    description: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
  },
) {
  await db.update(projects).set(data).where(eq(projects.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── CERTIFICATES ────────────────────────────────────

export async function getCertificates() {
  return await db.select().from(certificates).orderBy(certificates.createdAt);
}

export async function addCertificate(data: {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  type?: string;
}) {
  await db.insert(certificates).values(data);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateCertificate(
  id: number,
  data: {
    title: string;
    issuer: string;
    year: string;
    credentialUrl?: string;
    type?: string;
  },
) {
  await db.update(certificates).set(data).where(eq(certificates.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteCertificate(id: number) {
  await db.delete(certificates).where(eq(certificates.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── CONTACTS ────────────────────────────────────────

export async function getContacts() {
  return await db.select().from(contacts).orderBy(contacts.createdAt);
}

export async function addContact(data: {
  name: string;
  email: string;
  message: string;
}) {
  await db.insert(contacts).values(data);
  revalidatePath("/admin");
}

export async function markContactRead(id: number) {
  await db.update(contacts).set({ isRead: true }).where(eq(contacts.id, id));
  revalidatePath("/admin");
}
