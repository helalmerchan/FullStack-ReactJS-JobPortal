import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";


const OnBoarding = () => {
  const {user, isLoaded} = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async(role)=>{
    await user.update({
      unsafeMetadata:{role},
    }).then(()=>{
      navigate(role === "recruiter"? "/post-job": "/jobs")
    }).catch((err)=>{
      console.log("Error updating role: ",err);
    })
  }

  useEffect(()=>{
    if(user?.unsafeMetadata?.role){
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job": "/jobs"
      );
    }
  }, [user])
  
  if(!isLoaded){
    return <BarLoader className="mb-4" width={'100%'} color="#36d7b7"/>
  }


  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className=" gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">I am a...</h2>
      <div className="grid grid-cols-2 mt-16 gap-8 w-full md:px-40">
        <Button 
        onClick={()=>handleRoleSelection("candidate")}
        variant="blue" className="h-28 text-2xl">Candidate</Button>
        <Button 
        onClick={()=>handleRoleSelection("recruiter")}
        variant="destructive" className="h-28 text-2xl">Recruiter</Button>
      </div>
    </div>
  )
}

export default OnBoarding