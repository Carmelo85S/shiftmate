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



app.listen(3000, () => console.log('Server running on port 3000'));
