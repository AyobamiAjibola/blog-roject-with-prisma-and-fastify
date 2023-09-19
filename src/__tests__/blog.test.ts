import app from '../app';

describe('Blog Route Handlers', () => {
  test('POST /blog should create a new blog', async () => {

    const payload = {
      title: 'Test Blog',
      content: 'This is a test blog post.',
      author: 'khalid'
    };
  
    const response = await app.inject({
      method: 'POST',
      url: '/blog',
      headers: {
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify(payload),
    });
  
    expect(response.statusCode).toBe(201);
  
    const responseData = JSON.parse(response.payload);
    expect(responseData.message).toBe('Successfully created a new blog');
    expect(responseData.result.title).toBe(payload.title);
    expect(responseData.result.content).toBe(payload.content);
    expect(responseData.result.author).toBe(payload.author);
  });

  test('GET /blogs should fetch all blogs', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/blogs',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    // Expect a successful response with a 201 status code
    expect(response.statusCode).toBe(200);
    
    const responseData = JSON.parse(response.payload);
    expect(responseData.message).toBe('Successful');
  });

  test('GET /blog/:blogId should get single blog', async () => {

    const response = await app.inject({
      method: 'GET',
      url: '/blog/7',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    expect(response.statusCode).toBe(200);
    
    const responseData = JSON.parse(response.payload);
    expect(responseData.message).toBe('Successful');
  });

  test('PUT /blog/:blogId should update a blog', async () => {

    const payload = {
      content: 'updated from test again and again'
    };

    const response = await app.inject({
      method: 'PUT',
      url: '/blog/7',
      headers: {
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify(payload)
    });
  
    expect(response.statusCode).toBe(200);
    
    const responseData = JSON.parse(response.payload);
    expect(responseData.message).toBe('Successfully updated');
  });

  test('DELETE /blog/:blogId should delete a blog', async () => {

    const response = await app.inject({
      method: 'DELETE',
      url: '/blog/24',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    expect(response.statusCode).toBe(200);
    
    const responseData = JSON.parse(response.payload);
    expect(responseData.message).toBe('Successfully deleted');
  });
  
});