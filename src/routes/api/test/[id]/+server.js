import { loadPyodide } from 'pyodide';
import { Base64 } from 'js-base64';

async function runCode(code) {
  let pyodide = await loadPyodide({indexURL: "node_modules/pyodide"});
  pyodide.runPythonAsync(`
  inputs = [11149, 'e']
  def input(prompt=''):
    return inputs.pop(0)
  `);
  try {
    pyodide.runPython(`
        import io
        import sys
        sys.stdout = io.StringIO()
        sys.stderr = io.StringIO()
    `);

    await pyodide.runPythonAsync(code);
    let output = pyodide.runPython("sys.stdout.getvalue()");
    let error1 = pyodide.runPython("sys.stderr.getvalue()");
    if(error1){
      console.log(`⚠️  ERROR CODE 1️⃣`)
      console.log(`${error1}`)
      return error1
    }
    if(output){
      console.log(`✅ CODE RUN SUCCESFUL ✅`)
      console.log(`${output}`)
      return output
    }
    }catch (error2) {
    console.log(` ⚠️  ERROR CODE 2️⃣`);
    console.log(`${error2}`)
    return error2
    }
}

export async function GET({ params }) {
  let code = Base64.decode(params.id)
  let result = await runCode(code);
  return new Response(JSON.stringify({input:params.id,code:code,result:result}), { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } });
}