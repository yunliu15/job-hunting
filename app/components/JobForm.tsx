import { Job } from "@prisma/client";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
    job?: Job
}

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg";


const JobForm = ({job}: Props) => {
    const [startDate, setStartDate] = useState(new Date());
    const isNewJob = !job;
    const navigation = useNavigation();
    const isProcessing = Boolean(
        navigation.state === "submitting"
    );

    return ( 
        <Form method="post" >
            <DatePicker selected={startDate} onChange={(date) => date && setStartDate(date)} name="appliedAt" />
            <p>
                <label>
                Position:
                <input
                    type="text"
                    name="position"
                    className={inputClassName}
                    defaultValue={job?.position}
                />
                </label>
            </p>
            <p>
                <label>
                Company:
                <input
                    type="text"
                    name="company"
                    className={inputClassName}
                    defaultValue={job?.company}
                />
                </label>
            </p>
            <p>
                <label>
                Website:
                <input
                    type="text"
                    name="website"
                    className={inputClassName}
                    defaultValue={job?.website}
                />
                </label>
            </p>
            <p>
                <label htmlFor="job_result" >Result</label>
                <select name="result" id="job_result" >
                    <option value="Waiting for response">Waiting for response</option>
                    <option value="Scheduled an interview">Scheduled an interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Recieved an offer">Recieved an offer</option>
                </select>
            </p>
            <p>
                <label htmlFor="job_note">Note: </label>
                <br />
                <textarea
                id="job_note"
                name="note"
                className={`${inputClassName} font-mono`}
                defaultValue={job?.note || ""}
                />
            </p>
            <p className="flex justify-end gap-4">
            <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            disabled={isProcessing}
            >
            {
            isNewJob? (isProcessing? "Creating..." : "Create Job")
            : (isProcessing? "Updating..." : "Update Job")
            
            }
            </button>
            </p>
        </Form>
    );
}
 
export default JobForm;