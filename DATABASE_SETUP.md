# Database Setup Guide

This document provides instructions for setting up the Supabase database to work with this application.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard

## Database Schema

Execute the following SQL commands in your Supabase SQL editor to set up the required tables and policies:

### 1. Create the tasks table

```sql
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Set up Row Level Security (RLS)

```sql
-- Enable RLS on the tasks table
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own tasks
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert tasks for themselves
CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own tasks
CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own tasks
CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Set up automatic updated_at timestamps

```sql
-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in the `.env` file:
   - `VITE_SUPABASE_URL`: Your Supabase project URL (found in Settings > API)
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon/public key (found in Settings > API)

## Authentication Setup

The application uses Supabase Auth with email/password authentication. Users must sign up and confirm their email address before they can access the application.

### Email Confirmation

By default, Supabase requires email confirmation for new users. You can modify this in your Supabase dashboard:
1. Go to Authentication > Settings
2. Under "User Signups", you can toggle "Enable email confirmations"

## Real-time Features

The application uses Supabase's real-time features to sync tasks across multiple browser sessions. This requires no additional setup - it works automatically once the database is configured.

## Testing the Setup

1. Start the development server: `npm run dev`
2. Navigate to `/auth` to create a new account
3. Confirm your email (check your inbox)
4. Sign in and start creating tasks
5. Open another browser tab to see real-time synchronization in action

## Troubleshooting

### Common Issues

1. **Build fails with environment variable errors**:
   - Ensure your `.env` file exists and contains valid Supabase credentials
   - Make sure the variable names start with `VITE_` for Vite to process them

2. **Users can't sign up**:
   - Check that email confirmations are properly configured
   - Verify your Supabase project has email sending enabled

3. **Tasks don't appear or save**:
   - Verify the database schema is set up correctly
   - Check that RLS policies are applied
   - Ensure the user is authenticated

4. **Real-time updates don't work**:
   - Verify that real-time is enabled in your Supabase project settings
   - Check browser console for any WebSocket connection errors