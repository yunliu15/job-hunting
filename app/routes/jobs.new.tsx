import JobForm from "~/components/JobForm";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";

import invariant from "tiny-invariant";
import { createJob } from "~/models/job.server";


export const action = async ({request}: ActionArgs) => {
    const formData = await request.formData();

    const appliedAt = formData.get("appliedAt");
    const position = formData.get("position");
    const company = formData.get("company");
    const website = formData.get("website");
    const result = formData.get("result");
    const note = formData.get("note");
    
    console.log(appliedAt)
console.log(typeof appliedAt)
    invariant(typeof appliedAt === "string", "appliedAt must be a string");
    invariant(typeof position === "string", "position must be a string");
    invariant(typeof company === "string", "company must be a string");
    invariant(typeof website === "string", "website must be a string");
    invariant(typeof result === "string", "result must be a string");
    invariant(typeof note === "string", "result must be a string");

    await createJob({appliedAt, position, company, website, result, note})
    return redirect("/jobs")
    
}


export default function NewJob() {
    return (
        <main className="relative min-h-screen bg-white py-4">
            <h2>Add New Job</h2>
            <JobForm />
        </main>
    )
}