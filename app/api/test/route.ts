import type { NextApiRequest, NextApiResponse } from 'next';
import { exec, spawn } from 'child_process';


function getInputFromUrl(url: string) {
    const inputParam = "input=";
    const startIndex = url.indexOf(inputParam) + inputParam.length; // Find the start index of the input value
    const endIndex = url.indexOf("&", startIndex); // Find the end index (if there is another parameter)

    // If there's no other parameter, take the substring until the end of the URL
    const inputValue = endIndex === -1 ? url.substring(startIndex) : url.substring(startIndex, endIndex);
    
    return inputValue; // Return the extracted input value
}

export const POST = async(req: Request, res: Response)=>{

    const input = getInputFromUrl(req.url);  // User input from frontend
    console.log("GET REQUEST2", input)

    console.log(`Current directory: ${process.cwd()}`); // Use process.cwd() instead of exec('pwd')


  // Execute the C++ program with the input
  const program = spawn('./bin/program', [input]);

  let output = "";
  
  program.stdout.on('data', async (data) => {
    output += data.toString();
    console.log("output1", output)
  });

  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("output2", output)


  program.stderr.on('data', (data) => {
    console.error(`Stderr: ${data}`);
    // Handle stderr if needed
  });

  program.on('error', (error) => {
    console.error(`Error: ${error.message}`);
    // Handle error if needed
  });

  program.on('close', (code) => {
    console.log(`Program exited with code ${code}`);
  });
//   console.log("output", output)
  output = output.slice(0, -2);
  return Response.json({output: output}, {status:200})
};
