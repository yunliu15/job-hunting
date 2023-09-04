import { prisma } from "~/db.server";
import { Prisma, type Job } from "@prisma/client";

export async function getJobes(sort = "appliedAt") {
    return prisma.job.findMany(
        {
            orderBy: {
                [sort]: Prisma.SortOrder.desc
            }
        }
    );
}

export async function createJob(job: Pick<Job, "appliedAt" | "position" | "company" | "website" | "result" | "note" >) {
    return prisma.job.create({data: job});
}

export async function getJob(id: string) {
    return prisma.job.findUnique({where: {id}})
}

export async function deleteJob(id: string) {
    return prisma.job.delete({where: {id}})
}

export async function updateJob(id: string, job:Pick<Job, "appliedAt" | "position" | "company" | "website" | "result" | "note" >) {
    return prisma.job.update({data: job, where: {id}})
}