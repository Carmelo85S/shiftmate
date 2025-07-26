import { supabase } from '../supabaseClient.js'

export const postMessage = async (req, res) => {
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
};

export const markReadMessage = async (req, res) => {
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
};

export const getAllMessages = async (req, res) => {
  const { userId } = req.params;
  const { userType } = req.query;

  if (!userId || !['worker', 'business'].includes(userType)) {
    return res.status(400).json({ error: 'Missing or invalid userType' });
  }

  // The deleted flag that applies for this user as a receiver
  const deletedField = userType === 'worker' ? 'deleted_by_worker' : 'deleted_by_business';

  try {
const deletedField = userType === 'worker' ? 'deleted_by_worker' : 'deleted_by_business';

const { data, error } = await supabase
  .from('messages')
  .select(`
    id,
    content,
    created_at,
    job_id,
    is_read,
    sender_id,
    receiver_id,
    deleted_by_worker,
    deleted_by_business,
    job:jobs(title),
    sender:users!fk_sender(id, name, email)
  `)
  .or(`receiver_id.eq.${userId},sender_id.eq.${userId}`)
  .order('created_at', { ascending: false });

if (error) throw error;

const filtered = data.filter((msg) => {
  const isSender = msg.sender_id === userId;
  const isReceiver = msg.receiver_id === userId;

  // Show only if NOT deleted by this user (regardless sender or receiver)
  if ((isSender || isReceiver) && !msg[deletedField]) {
    return true;
  }

  return false;
});

res.status(200).json(filtered);

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  const { userId, userType } = req.body; // Expect both userId and userType in body

  if (!messageId) return res.status(400).json({ error: 'Message ID is required' });
  if (!userId) return res.status(400).json({ error: 'User ID is required' });
  if (!userType || !['business', 'worker'].includes(userType))
    return res.status(400).json({ error: 'Invalid user type' });

  try {
    // Fetch message to know sender and receiver IDs
    const { data: messages, error: fetchError } = await supabase
      .from('messages')
      .select('sender_id, receiver_id, deleted_by_business, deleted_by_worker')
      .eq('id', messageId)
      .single();

    if (fetchError || !messages) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const message = messages;

    let updateData = null;

    const isSender = message.sender_id === userId;
    const isReceiver = message.receiver_id === userId;

    if (!isSender && !isReceiver) {
      return res.status(403).json({ error: 'User not authorized to delete this message' });
    }

    // If user is sender, mark deletion on sender side
    if (isSender) {
      updateData =
        userType === 'business'
          ? { deleted_by_business: true }
          : { deleted_by_worker: true };
    }

    // If user is receiver, mark deletion on receiver side
    else if (isReceiver) {
      updateData =
        userType === 'business'
          ? { deleted_by_business: true }
          : { deleted_by_worker: true };
    }

    if (!updateData) {
      return res.status(400).json({ error: 'Could not determine deletion flag' });
    }

    const { data, error: updateError } = await supabase
      .from('messages')
      .update(updateData)
      .eq('id', messageId)
      .select();

    if (updateError) throw updateError;

    res.status(200).json({ message: 'Message deleted successfully', data: data[0] });
  } catch (error) {
    console.error('Failed to delete message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

export const getUnreadMessage = async (req, res) => {
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
};
