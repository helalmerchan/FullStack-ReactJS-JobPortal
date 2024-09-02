import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";


const CreatedJobs = () => {
  const {user} = useUser();

  const {
    loading: loadingCreatedJobs,
    data: CreatedJobs,
    fn: fnCreatedJobs
  } = useFetch(getMyJobs , {
    recruiter_id: user.id,
  });

  useEffect(()=>{
    fnCreatedJobs()
  }, []);


  if(loadingCreatedJobs){
    return <BarLoader className="mb-4" width={'100%'} color="#36d7b7"/>
  }

  return (
    <div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CreatedJobs?.length ? (
            CreatedJobs.map((job)=>{
              return <JobCard key={job.id} job={job} 
              onJobSaved={fnCreatedJobs}
              isMyJob
              />
            })
          ) : ( <div>No jobs Found!</div> )}
        </div>
    </div>
  )
}

export default CreatedJobs