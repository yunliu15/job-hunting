import { LoaderArgs, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { getJobes } from "~/models/job.server"

export const loader = async ({request}: LoaderArgs ) => {
    return json({jobs: await getJobes() })
}

const tableCellClass = "px-4 py-2"
export default function JobsRoute() {
    const {jobs} = useLoaderData<typeof loader>();
    return (
        <main className="relative min-h-screen bg-white py-4 text-center">
            <h1 className="my-6 text-center text-5xl">Jobs Applied</h1>
            <Link to="new" className="py-2 px-4 bg-pink-600 text-white rounded hover:bg-pink-800" >Add New Job</Link>
            <table className="my-4 mx-auto">
                <tr>
                    
                    <th className={tableCellClass}>Applied At</th>
                    <th className={tableCellClass}>Position</th>
                    <th className={tableCellClass}>Company</th>
                    <th className={tableCellClass}>Website</th>
                    <th className={tableCellClass}>Result</th>
                    <th></th>
                </tr>
                {
                    jobs.map((job) => {
                        return (
                            <tr key={job.id} className="even:bg-gray-200 odd:bg-white" >
                               
                                <td className={tableCellClass}>{job.appliedAt}</td>
                                <td className={tableCellClass}>{job.position}</td>
                                <td className={tableCellClass}>{job.company}</td>
                                <td className={tableCellClass}>{job.website}</td>
                                <td className={tableCellClass}>{job.result} </td>
                                <td className={tableCellClass}><Link to={`/jobs/${job.id}`} >Edit</Link> </td>
                            </tr>
                        )
                    })
                }
            </table>
        </main>
    )
}