import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

function readUsers() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users: any) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

type Context = { params: { id: string } };

export async function GET(req: NextRequest, context: Context) {
  const users = readUsers();
  const user = users.find((u: any) => u.id === Number(context.params.id));

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const users = readUsers();
  const id = Number(params.id);
  const index = users.findIndex((u: any) => u.id === id);

  if (index === -1) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await req.json();
  
  if (body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  users[index] = { ...users[index], ...body };
  writeUsers(users);

  return new Response(JSON.stringify(users[index]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const users = readUsers();
  const id = Number(params.id);
  const index = users.findIndex((u: any) => u.id === id);

  if (index === -1) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  users.splice(index, 1);
  writeUsers(users);

  return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
