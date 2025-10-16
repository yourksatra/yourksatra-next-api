import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

function readUsers() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
}

export async function GET() {
    try {
        const users = readUsers();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            message: 'Users fetched successfully'
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, email } = await request.json();

        if (!name || !email) {
            return new Response(JSON.stringify({ error: 'Name and Email are required' }), { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                { status: 400 }
            );
        }

        const users = readUsers();
        const newUser = {
            id: Date.now(),
            name,
            email
        };
        users.push(newUser);
        writeUsers(users);

        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
