import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import useFetch from "@/hooks/use-fetch"
import { addNewCompany } from "@/api/apiCompanies"
import { BarLoader } from "react-spinners"
import { useEffect } from "react"

const schema = z.object({
  name: z.string().min(1, {message: "Company Name is required"}),
  logo: z.any().refine(file => file[0] && (
    file[0].type === "image/png" || file[0].type === "image/jpeg"
  ), {message: "Only images are allowed"})
})

const AddCompanyDrawer = ({fetchCompanies}) => {
  const {
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema)
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    fnAddCompany({
      ...data, 
      logo: data.logo[0],
    })
  }

  useEffect(()=>{
    if(dataAddCompany?.length > 0) fetchCompanies()
  }, [loadingAddCompany])

  return (
    <Drawer>
      <DrawerTrigger>
        <Button type="button" size="sm" variant="secondary">Add Company</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new company</DrawerTitle>
        </DrawerHeader>
        <form className="flex gap-2 p-4 pb-0">
          <Input placeholder="Company Name" {...register("name")}/>
          <Input type="file" accept="image/*" className="file:text-gray-500" {...register("logo")}/>

          <Button type="button" variant="destructive" className="w-40" onClick={handleSubmit(onSubmit)}>Submit</Button>
        </form>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}

        {errorAddCompany?.message && (
          <p className="text-red-500">{errorAddCompany?.message}</p>
        )}
        {loadingAddCompany && (
          <BarLoader className="mb-4" width={'100%'} color="#36d7b7"/>
        )}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary" type="button">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddCompanyDrawer