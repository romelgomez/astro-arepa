// src/pages/api/posts.json.ts
import type { APIRoute } from 'astro';
import type { PostCreate, PostResponse } from '../../types/post';

const API_BASE_URL = 'http://localhost:3000/api/v1/post';

// GET - Retrieve all posts
export const GET: APIRoute = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const posts: PostResponse[] = await response.json();

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
    });
  }
};

// POST - Create a new post
export const POST: APIRoute = async ({ request }) => {
  try {
    const postData: PostCreate = await request.json();
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const result: PostResponse = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create post' }), {
      status: 500,
    });
  }
};
