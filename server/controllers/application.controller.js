import { supabase } from '../supabaseClient.js'

export const getAppliedJobs = async (req, res) => {
  const userID = req.params.id;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!userID || !uuidRegex.test(userID)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  console.log('userID:', userID);

  try {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        job_id,
        jobs (
          id,
          title,
          location,
          industry,
          employment_type,
          salary_min,
          salary_max,
          date_start,
          date_end,
          time_start,
          time_end,
          requirements,
          responsibilities
        )
      `)
      .eq('user_id', userID.toString());

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Failed to fetch jobs' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No applied jobs found for this user' });
    }

    const appliedJobs = data.map(application => application.jobs);

    return res.status(200).json(appliedJobs);
  } catch (err) {
    console.error('Unexpected server error:', err);
    return res.status(500).json({ error: 'Unexpected server error while fetching jobs' });
  }
};

export const getUserJobs = async (req, res) => {
  const userID = req.params.id; 
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!userID || !uuidRegex.test(userID)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  console.log('userID:', userID);

  try {
    const { data, error } = await supabase.from('jobs').select('*').eq('user_id', userID);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const deleteAppliedJobs = async (req, res) => {
  const jobId = req.params.id;

  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) {
      console.error('Delete error:', error);
      return res.status(500).json({ error: 'Failed to delete job' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const applyToJob = async (req, res) => {
  const { user_id, job_id } = req.body;

  if (!user_id || !job_id) {
    return res.status(400).json({ error: 'Missing user_id or job_id' });
  }

  try {
    const { data: existing, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user_id)
      .eq('job_id', job_id)
      .maybeSingle();

    if (error) throw error;

    if (existing) {
      return res.status(409).json({ error: 'Already applied to this job' });
    }

    const { data, error: insertError } = await supabase
      .from('applications')
      .insert([{ user_id, job_id }])
      .select();

    if (insertError) throw insertError;

    res.status(201).json({ message: 'Application submitted', data });
  } catch (err) {
    console.error('Apply error:', err);
    res.status(500).json({ error: 'Failed to apply for job' });
  }
};

export const getUserApplications = async (req, res) => {
  const userID = req.params.id;

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        jobs (
          id,
          title,
          description,
          location,
          industry,
          employment_type,
          salary_min,
          salary_max,
          date_start,
          date_end,
          requirements,
          responsibilities,
          users (
            company_name,
            company_website
          )
        )
      `)
      .eq('user_id', userID);

    if (error) {
      throw error;
    }

    // Flatten company info inside jobs object
    const applications = data.map((app) => {
      return {
        ...app,
        jobs: {
          ...app.jobs,
          company_name: app.jobs.users?.company_name || null,
          company_website: app.jobs.users?.company_website || null,
        },
      };
    });

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

export const cancelUserApplications = async (req, res) => {
  const { user_id, job_id } = req.body;

  if (!user_id || !job_id) {
    return res.status(400).json({ error: 'Missing user_id or job_id' });
  }

  try {
    const { data, error } = await supabase
      .from('applications')
      .delete()
      .eq('user_id', user_id)
      .eq('job_id', job_id);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Application cancelled', data });
  } catch (error) {
    console.error('Cancel application error:', error);
    res.status(500).json({ error: 'Failed to cancel application' });
  }
};
