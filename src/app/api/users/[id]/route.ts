import { NextRequest } from 'next/server';
import { getUsers, updateUsers } from '../dataStore';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
const isProduction = process.env.VERCEL === '1';

function readUsers() {
  if (isProduction) {
    return getUsers();
  } else {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
}

function writeUsers(users: any) {
  if (isProduction) {
    updateUsers(users);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }
}

export async function GET(req: NextRequest, context: any) {
  const params = await context.params;
  const { id } = params;
  const users = readUsers();
  const user = users.find((u: any) => u.id === Number(id));

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

export async function PUT(req: NextRequest, context: any) {
  const params = await context.params;
  const { id } = params;
  const { name, email } = await req.json();

  const users = readUsers();
  const index = users.findIndex((u: any) => u.id === Number(id));

  if (index === -1) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (name) users[index].name = name;
  if (email) users[index].email = email;

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  writeUsers(users);

  return new Response(JSON.stringify(users[index]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req: NextRequest, context: any) {
  const params = await context.params;
  const { id } = params;

  const users = readUsers();
  const index = users.findIndex((u: any) => u.id === Number(id));

  if (index === -1) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const deletedUser = users.splice(index, 1)[0];
  writeUsers(users);

  return new Response(JSON.stringify(deletedUser), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
