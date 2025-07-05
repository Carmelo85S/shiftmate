import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { supabase } from './supabaseClient.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const saltRounds = 10;

app.post('/api/register', async (req, res) => {
  const { name, email, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase.from('users').insert([
      {
        name,
        email,
        password_hash: hashedPassword,
        user_type: userType,
      },
    ]).select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error during registration' });
    }

    res.status(201).json({
      message: 'User registered successfully',
      data,
    });

  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isValid = await bcrypt.compare(password, data.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log("Login Successfull")
    res.json({ message: 'Login successful', user: { id: data.id, name: data.name, email: data.email, user_type: data.user_type } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/profile', async (req, res) => {
  const {
    id,
    phone,
    bio,
    location,
    company_name,
    company_website,
    industry,
    skills,
    availability,
    experience_years
  } = req.body;

  console.log("🔍 Received profile update request with body:", req.body);

  if (!id || typeof id !== 'string' || id.trim() === '') {
    console.log("⚠️ Invalid or missing user ID:", id);
    return res.status(400).json({ error: 'Missing or invalid user ID' });
  }

  if (phone && typeof phone !== 'string') {
    console.log("⚠️ Invalid phone:", phone);
    return res.status(400).json({ error: 'Phone must be a string' });
  }

  if (bio && typeof bio !== 'string') {
    console.log("⚠️ Invalid bio:", bio);
    return res.status(400).json({ error: 'Bio must be a string' });
  }

  if (location && typeof location !== 'string') {
    console.log("⚠️ Invalid location:", location);
    return res.status(400).json({ error: 'Location must be a string' });
  }

  if (company_name && typeof company_name !== 'string') {
    console.log("⚠️ Invalid company_name:", company_name);
    return res.status(400).json({ error: 'Company name must be a string' });
  }

  if (company_website && typeof company_website === 'string') {
    try {
      new URL(company_website);
    } catch (err) {
      console.log("⚠️ Invalid company_website URL:", company_website);
      return res.status(400).json({ error: 'Company website must be a valid URL' });
    }
  }

  if (industry && typeof industry !== 'string') {
    console.log("⚠️ Invalid industry:", industry);
    return res.status(400).json({ error: 'Industry must be a string' });
  }

  if (skills && !Array.isArray(skills)) {
    console.log("⚠️ Skills is not an array:", skills);
    return res.status(400).json({ error: 'Skills must be an array' });
  }

  if (availability && typeof availability !== 'string') {
    console.log("⚠️ Invalid availability:", availability);
    return res.status(400).json({ error: 'Availability must be a string' });
  }

  if (experience_years !== undefined && (typeof experience_years !== 'number' || experience_years < 0)) {
    console.log("⚠️ Invalid experience_years:", experience_years);
    return res.status(400).json({ error: 'Experience years must be a positive number' });
  }

  const updateFields = {};
  if (phone) updateFields.phone = phone;
  if (bio) updateFields.bio = bio;
  if (location) updateFields.location = location;
  if (company_name) updateFields.company_name = company_name;
  if (company_website) updateFields.company_website = company_website;
  if (industry) updateFields.industry = industry;
  if (skills) updateFields.skills = skills;
  if (availability) updateFields.availability = availability;
  if (experience_years !== undefined) updateFields.experience_years = experience_years;

  if (Object.keys(updateFields).length === 0) {
    console.log("⚠️ No fields provided for update");
    return res.status(400).json({ error: 'No fields provided for update' });
  }

  console.log("➡️ Updating user:", id);
  console.log("🛠️ Fields to update:", updateFields);

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updateFields)
      .eq('id', id)
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ error: 'Failed updating profile' });
    }

    if (!data || data.length === 0) {
      console.log("⚠️ User not found for ID:", id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("✅ Profile updated successfully for user:", id);
    return res.status(200).json({ message: 'Profile updated successfully', data: data[0] });
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ error: 'Server error while updating profile' });
  }
});

app.get('/api/profile/:id', async (req, res) => {
  const userId = req.params.id;

  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error while fetching profile' });
  }
});

app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;

  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }

    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error while fetching user' });
  }
});

app.get('/api/user/:id/applied-jobs', async (req, res) => {
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
});

app.get('/api/user/:id/jobs', async (req, res) => {
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
});

app.delete('/api/jobs/:id', async (req, res) => {
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
});

app.post('/api/job', async (req, res) => {
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
});

app.get('/api/job', async (req, res) => {
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
});

app.post('/api/apply', async (req, res) => {
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
});

app.get('/api/user/:id/applications', async (req, res) => {
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
});

app.post('/api/applications/cancel', async (req, res) => {
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
});

app.get('/api/tot-post', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch total posts' });
    }

    const totalPosts = data.length;
    res.status(200).json({ totalPosts });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/tot-users', async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });  // head:true per non scaricare righe

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch total users' });
    }

    res.status(200).json({ totalUsers: count });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Search enpoint Main
app.get("/api/search", async (req, res) => {
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
});

//Search endpoint for business dashboard
app.get('/api/search/users', async(req, res) => {
  const { keyword, skills, availability } = req.query;
  if (!keyword && !skills && !availability) {
    return res.status(400).json({ error: 'At least one search parameter is required' });
  }
  try {
    let query = supabase
    .from('users')
    .select('*')
    .eq('user_type', 'worker')

    if (keyword) {
      query = query.ilike("title", `%${keyword}%`);
    }
    
    if (skills) {
      const skillList = Array.isArray(skills) ? skills : skills.split(',');
      for (const skill of skillList) {
        query = query.ilike('skills', `%${skill.trim()}%`);
      }
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
});


//Messages API
app.post('/api/messages', async (req, res) => {
  const { sender_id, job_id, content } = req.body;

  if (!sender_id || !job_id || !content) {
    return res.status(400).json({ error: 'Missing sender_id, job_id or content' });
  }

  try {
    // 1. Get the receiver_id (job owner)
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('user_id')
      .eq('id', job_id)
      .single();

    if (jobError || !job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const receiver_id = job.user_id;

    // 2. Insert message including job_id
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert([{ sender_id, receiver_id, job_id, content }])
      .single();

    if (messageError) {
      throw messageError;
    }

    res.status(201).json({ message: 'Message sent', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.patch('/api/messages/mark-read', async (req, res) => {
  console.log('mark-read called with body:', req.body);
  const { message_id } = req.body;

  if (!message_id) {
    return res.status(400).json({ error: 'Missing message_id' });
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', message_id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message marked as read', data: data[0] });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to mark message as read' });
  }
});

// GET /api/messages/:userId
app.get('/api/messages/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        content,
        created_at,
        job_id,
        is_read,
        job:jobs(title),
        sender:users!fk_sender(id, name, email)
      `)
      .eq('receiver_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    console.log('Messages data:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Fetch inbox messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

//Un read messages count
app.get('/api/messages/unread-count/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const { data, error, count } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('is_read', false);

    if (error) throw error;

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
});



app.listen(3000, () => console.log('Server running on port 3000'));
