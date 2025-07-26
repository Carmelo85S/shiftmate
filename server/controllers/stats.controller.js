import { supabase } from '../supabaseClient.js'

export const statsTotPost = async (req, res) => {
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
};

export const statsTotUser = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch total users' });
    }

    res.status(200).json({ totalUsers: count });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};