import supabaseClient from "@/utils/supabase";

export async function getJobs(token, {location, company_id, searchQuery}){
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

    if(location){
        query = query.eq("location",location);
    }
    
    if(company_id){
        query = query.eq("company_id",company_id);
    }
    
    if(searchQuery){
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const {data, error} = await query;

    if(error){
        console.error(`Error fetching jobs:`, error);
        return null;
    }

    return data;

}

export async function savedJob(token, {alreadySaved}, saveData){
    const supabase = await supabaseClient(token);

   

   if(alreadySaved){
    let query = supabase.from("jobs").select("*, company:companies(name,logo_url), saved:saved_jobs(id)");
   }

    const {data, error} = await query;

    if(error){
        console.error(`Error fetching jobs:`, error);
        return null;
    }

    return data;

}