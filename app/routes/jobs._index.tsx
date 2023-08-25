import { LoaderArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getJobes } from "~/models/job.server"

export const loader = async ({request}: LoaderArgs ) => {
    return json({jobs: await getJobes() })
}

export default function JobsRoute() {
    const {jobs} = useLoaderData<typeof loader>();
    return (
        <main className="relative min-h-screen bg-white py-4">
            <h1 className="my-6 text-center text-5xl">Jobs Applied</h1>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Applied At</th>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Website</th>
                    <th>Result</th>
                </tr>
                {
                    jobs.map((job) => {
                        return (
                            <tr>
                                <td>{job.id}</td>
                                <td>{job.appliedAt}</td>
                                <td>{job.position}</td>
                                <td>{job.company}</td>
                                <td>{job.result} </td>
                            </tr>
                        )
                    })
                }
            </table>
        </main>
    )
}