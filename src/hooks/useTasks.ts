import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Task } from '../types/Task';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch tasks for the current user
  const fetchTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add a new task
  const addTask = async (title: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            completed: false,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error adding task:', errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  // Toggle task completion
  const toggleTask = async (id: number) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return { error: 'Task not found' };

      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: !taskToUpdate.completed })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error toggling task:', errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error deleting task:', errorMessage);
      return { error: errorMessage };
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchTasks();

    if (!user) return;

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('tasks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Real-time change received:', payload);

          switch (payload.eventType) {
            case 'INSERT':
              setTasks(prev => [payload.new as Task, ...prev]);
              break;
            case 'UPDATE':
              setTasks(prev =>
                prev.map(task =>
                  task.id === payload.new.id ? payload.new as Task : task
                )
              );
              break;
            case 'DELETE':
              setTasks(prev => prev.filter(task => task.id !== payload.old.id));
              break;
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, fetchTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    refetch: fetchTasks,
  };
};