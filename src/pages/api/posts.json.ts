// src/pages/api/[postId].json.ts
import type { APIRoute } from 'astro';
import type { PostResponse, PostUpdate } from '../../types/post';

const API_BASE_URL = 'http://localhost:3000/api/v1/post';

// GET - Retrieve a single post
export const GET: APIRoute = async ({ params }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${params.postId}`);
    const post: PostResponse = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
      status: 500,
    });
  }
};

// PATCH - Edit a post
export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const postData: PostUpdate = await request.json();

    if (!params.postId) {
      throw Error('post id is undefined');
    }

    postData.id = params.postId; // Ensure the postId is set correctly

    const response = await fetch(`${API_BASE_URL}/${params.postId}`, {
      method: 'PATCH',
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
    return new Response(JSON.stringify({ error: 'Failed to update post' }), {
      status: 500,
    });
  }
};

// DELETE - Delete a post
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${params.postId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to delete post' }), {
        status: response.status,
      });
    }

    return new Response(JSON.stringify({ message: 'Post deleted' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), {
      status: 500,
    });
  }
};
