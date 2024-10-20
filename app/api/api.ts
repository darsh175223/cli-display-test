import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { NextResponse } from 'next/server';

// export function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { input } = req.body;  // User input from frontend
//     console.log("Atleast the api worked")
//   // Execute the C++ program with the input
//   exec(`./bin/program ${input}`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error: ${error.message}`);
//       return res.status(500).json({ error: error.message });
//     }
//     if (stderr) {
//       console.error(`Stderr: ${stderr}`);
//       return res.status(500).json({ error: stderr });
//     }

//     // Send the C++ program's output back to the frontend
//     res.status(200).json({ output: stdout });
//   });
// }

export async function GET() {
    return NextResponse.json({
        hello:"world",
    });
}

export async function POST(request : Request) {
    const data = await request.json()
    return NextResponse.json({
        data
    });
}