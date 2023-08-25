import { prisma } from "~/db.server";
import type { Job } from "@prisma/client";

export async function getJobes() {
    return prisma.job.findMany();
}

export async function createJob(job: Pick<Job, "appliedAt" | "position" | "company" | "website" | "result" | "note" >) {
    return prisma.job.create({data: job});
}