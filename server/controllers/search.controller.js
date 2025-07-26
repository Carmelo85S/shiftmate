import { supabase } from '../supabaseClient.js'

export const mainSearch = async (req, res) => {
  const { keyword, location, type } = req.query;

  if (!keyword && !location && !type) {
    return res.status(400).json({ error: "At least one search parameter is required" });
  }

  try {
    let query = supabase
      .from("jobs")
      .select(`
        *,
        users (
          company_name
        )
      `);

    if (keyword) {
      query = query.ilike("title", `%${keyword}%`);
    }
    if (location) {
      query = query.ilike("location", `%${location}%`);
    }
    if (type) {
      query = query.eq("employment_type", type);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase search error:", error);
      return res.status(500).json({ error: "Search failed" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Server error during search:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const dashboardSearch = async(req, res) => {
  const { skills, availability } = req.query;
  if (!skills && !availability) {
    return res.status(400).json({ error: 'At least one search parameter is required' });
  }
  try {
    let query = supabase
    .from('users')
    .select('*')
    .eq('user_type', 'worker')
    
    if (skills) {
      const skillList = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
      query = query.contains('skills', skillList);
    }

    
    if (availability) {
      query = query.eq("availability", availability);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase search error:", error);
      return res.status(500).json({ error: "Search failed" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Server error during search:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};