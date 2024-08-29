import { Link, useSearchParams } from "react-router-dom"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react"
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react"
import { useEffect, useState } from "react"



const Header = () => {
  const [showSignIn, setShoeSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const {user} = useUser();

  useEffect(()=>{
    if(search.get('sign-in')){
      setShoeSignIn(true);
    }
  }, [search]);

  const handleOverlayHide=(e)=>{
    if(e.target === e.currentTarget){
      setShoeSignIn(false);
      setSearch({});
    }
  }


  return (
    <header>
        <nav className="py-4 flex justify-between items-center">
            <Link><img src="/logo.png" alt="" className="h-20"/></Link>            
        
        
          <div className="flex gap-8">
            <SignedOut>
              <Button variant='outline' onClick={()=>setShoeSignIn(true)}>Login</Button>
            </SignedOut>
            <SignedIn>
                {user?.unsafeMetadata?.role === "recruiter" && <Link to="/post-job">
                  <Button variant='destructive' className="rounded-full">
                    <PenBox size={20} className="mr-2"/> Post a job
                  </Button>
                </Link>}
              <UserButton appearance={{
                  elements:{
                    avatarBox:"w-10 h-10"
                  }
                }}>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15}/>}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Save Jobs"
                    labelIcon={<Heart size={15}/>}
                    href="/saved-jobs"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>          
          </div>
        </nav>
        {showSignIn && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayHide}>
            <SignIn 
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        )}
    </header>
  )
}

export default Header