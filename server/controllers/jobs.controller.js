import { supabase } from '../supabaseClient.js'

export const postedJobs = async (req, res) => {
  const {
    user_id,
    title,
    description,
    location,
    industry,
    employment_type,
    salary_min,
    salary_max,
    requirements,
    responsibilities,
    date_start,
    date_end,
    time_start,
    time_end
  } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ error: "Title, description, and location are required." });
  }

  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert([{
        user_id,
        title,
        description,
        location,
        industry,
        employment_type,
        salary_min,
        salary_max,
        requirements,
        responsibilities,
        date_start,
        date_end,
        time_start,
        time_end,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('Insert error:', error);
      return res.status(500).json({ error: 'Failed to create job' });
    }

    res.status(201).json({ message: 'Job created successfully', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        users (
          company_name
        )
      `);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch jobs' });
    }

    const jobsWithCompany = data.map((job) => ({
      ...job,
      company_name: job.users?.company_name || 'Unknown',
    }));

    res.status(200).json(jobsWithCompany);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};