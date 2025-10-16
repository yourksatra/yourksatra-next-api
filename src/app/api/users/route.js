import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
const isProduction = process.env.VERCEL === '1';

let memoryUsers = [
    { id: 1, name: 'Bagas', email: 'bagas@example.com' },
    { id: 2, name: 'Test', email: 'test@example.com' },
];

function readUsers() {
    if (isProduction) {
        return memoryUsers;
    } else {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
}

function writeUsers(users) {
    if (isProduction) {
        memoryUsers = users;
    } else {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
    }
}

export async function GET() {
    try {
        const users = readUsers();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { name, email } = await request.json();

        if (!name || !email) {
            return new Response(
                JSON.stringify({ error: 'Name and Email are required' }),
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                { status: 400 }
            );
        }

        const users = readUsers();
        let newId = 1;
        if (users.length > 0) {
            const maxId = Math.max(...users.map(u => u.id));
            newId = maxId + 1;
        }

        const newUser = {
            id: newId,
            name,
            email,
        };
        users.push(newUser);
        writeUsers(users);

        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
        });
    }
}
