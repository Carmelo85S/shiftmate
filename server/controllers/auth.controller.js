import bcrypt from 'bcrypt';
import { supabase } from '../supabaseClient.js';

const saltRounds = 10;

export const register = async (req, res) => {
  const { name, email, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { data, error } = await supabase.from('users').insert([
      { name, email, password_hash: hashedPassword, user_type: userType },
    ]).select();

    if (error) throw error;

    res.status(201).json({ message: 'User registered successfully', data });
  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  try {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
    if (error || !data) return res.status(401).json({ error: 'Invalid email or password' });

    const isValid = await bcrypt.compare(password, data.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });

    res.json({ message: 'Login successful', user: { id: data.id, name: data.name, email: data.email, user_type: data.user_type } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
