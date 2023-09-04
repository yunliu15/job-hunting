import JobForm from "~/components/JobForm";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";

import invariant from "tiny-invariant";
import { createJob, deleteJob, getJob, updateJob } from "~/models/job.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async({request, params}: LoaderArgs ) => {
    invariant(params.slug, "params.slug is required");
    if (params.slug === "new") {
        return json({job:null});
      }

    const job = await getJob(params.slug);
    if(!job || Object.keys(job).length == 0) {
        throw json({message: `Job ${params.slug} does not exist.`})
    }
    
    return json({job});
}

export const action = async ({request, params}: ActionArgs) => {
    invariant(params.slug, "params.slug is required!");
    const formData = await request.formData();

    const appliedAt = formData.get("appliedAt");
    const position = formData.get("position");
    const company = formData.get("company");
    const website = formData.get("website");
    const result = formData.get("result");
    const note = formData.get("note");
    const intent = formData.get("intent");
    if (intent === "delete") {
        await deleteJob(params.slug);
        return redirect("/jobs");
      }
    
    invariant(typeof appliedAt === "string", "appliedAt must be a string");
    invariant(typeof position === "string", "position must be a string");
    invariant(typeof company === "string", "company must be a string");
    invariant(typeof website === "string", "website must be a string");
    invariant(typeof result === "string", "result must be a string");
    invariant(typeof note === "string", "result must be a string");

    if (params.slug === "new") {
        await createJob({appliedAt, position, company, website, result, note})
      } else {
        await updateJob(params.slug, {appliedAt, position, company, website, result, note})
      }
    return redirect("/jobs")
    
}


export default function NewJob() {
    const {job} = useLoaderData();
    console.log(job)
    
    return (
        <main className="relative min-h-screen bg-white py-4">
            <h2>Add New Job</h2>
            <JobForm job={job} />
        </main>
    )
}