const main = async() => {
    console.log("hello");
}

main()
.then(() => {
    console.log("successfully exited");
    process.exit(0);
    
})
.catch(err => {
    console.log('error occur:', err);
    process.exit(0);
})