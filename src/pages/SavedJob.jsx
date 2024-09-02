import { getSavedJobs } from "@/api/apiJobs"
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";


const SavedJob = () => {
  const {isLoaded} = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs
  } = useFetch(getSavedJobs);

    
  useEffect(() => {
    if(isLoaded) fnSavedJobs();  
  }, [isLoaded]);

  if(!isLoaded || loadingSavedJobs){
    return <BarLoader className="mb-4" width={'100%'} color="#36d7b7"/>
  }

  return (
    <div>
      <h2 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Saved Jobs</h2>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((sjob)=>{
              return (
              <JobCard 
              key={sjob.id} 
              job={sjob.job} 
              savedInit={true}
              onJobSaved={fnSavedJobs}
              />)
            })
          ) : ( <div>No saved jobs Found!</div> )}
        </div>
      )}
    </div>
  )
}

export default SavedJob