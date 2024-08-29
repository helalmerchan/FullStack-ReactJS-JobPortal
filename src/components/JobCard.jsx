import { useUser } from "@clerk/clerk-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"


const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () =>{},
}) => {
    const {user} = useUser()
  return (
    <Card>
        <CardHeader >
            <CardTitle className="flex justify-between font-bold">
                {job.title}
                {!isMyJob && (<Trash2Icon fill="red" size={18} className="text-red-300 cursor-pointer"/>)}
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
            <div className="flex justify-between">
                {job.company && (<img src={job.company.logo_url} className="h-6"/>)}
                <div className="flex gap-2 items-center ">
                    <MapPinIcon size={15}/> {job.location}
                </div>
            </div><hr />
            {job.description}            
        </CardContent>
        <CardFooter className="flex gap-2">
            <Link to={`/job/${job.id}`} className="flex-1">
                <Button variant="secondary" className="w-full text-lg">Job Details..</Button>
            </Link>

            <Heart size={20} stroke="red" className="cursor-pointer" fill="red"/>
        </CardFooter>
    </Card>
  )
}

export default JobCard