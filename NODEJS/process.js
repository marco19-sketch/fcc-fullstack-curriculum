// Gets all environment variables available to the current Node.js process
// console.log(process.env);

// Gets the current Node.js environment mode (like 'development' or 'production')
console.log('node mode', process.env.NODE_ENV)

// Current shell
console.log(process.env.SHELL)

// Gets the system PATH variable where executables are searched for
console.log(process.env.PATH)

// Gets the present working directory from where the process was started
console.log(process.env.PWD); 

// Gets the username of the user running the current process
console.log(process.env.USER);
console.log(process.env.USERNAME);

// Read command-line arguments
console.log(process.argv)

console.log('######################EVENTS######################')

process.on('exit', (code) => {
    console.log(`Process exiting with code: ${code}`);
})

process.on("uncaughtException", err => {
  console.error("Uncaught error:", err.message);
});