import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(req) {
  try {
    const body = await req.json();
    const input = JSON.stringify(body);

    const pythonFile = spawn('python', ['src/app/api/mlexps.py']);

    let output = '';
    let errorOutput = '';

    pythonFile.stdin.write(input);
    pythonFile.stdin.end();

    return new Promise((resolve) => {
      pythonFile.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonFile.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonFile.on('close', (code) => {
        if (code !== 0 || errorOutput) {
          console.error("Python Error:", errorOutput);
          resolve(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
        } else {
          try {
            const jsonOutput = JSON.parse(output);
            resolve(NextResponse.json(jsonOutput));
          } catch (err) {
            console.error("Failed to parse retrieved data:", err);
            resolve(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
          }
        }
      });
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
