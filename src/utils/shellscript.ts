const exec = require('child_process').exec;

const ShellScript = {
    liveDomain: (domain: string) => {
        const myShellScript = exec('sh livedomain.sh '+domain);
        myShellScript.stdout.on('data', (data:any)=>{
            return data
        });
        myShellScript.stderr.on('data', (data:any)=>{
            return data
        });
    },
    sslDomain: (domain: string) => {
        const myShellScript = exec('sh ssldomain.sh '+domain);
        myShellScript.stdout.on('data', (data:any)=>{
            return data
        });
        myShellScript.stderr.on('data', (data:any)=>{
            return data
        });
    },
    addDomain: (domain: string) => {
        const myShellScript = exec('sh adddomain.sh '+domain);
        myShellScript.stdout.on('data', (data:any)=>{
            return data
        });
        myShellScript.stderr.on('data', (data:any)=>{
            return data
        });
    },
    liveSubdomain: (subdomain: string) => {
        const myShellScript = exec('sh livesubdomain.sh '+subdomain);
        myShellScript.stdout.on('data', (data:any)=>{
            return 'success'
        });
        myShellScript.stderr.on('data', (data:any)=>{
            return 'error'
        });
    },
    testss: (domain: string) => {
	console.log('domain----',domain);
        const myShellScript = exec('sh /root/nupins/nupins-script/livedomain.sh '+domain);
        myShellScript.stdout.on('data', (data:any)=>{
            console.log('success data----',data);
            return data
        });
        myShellScript.stderr.on('data', (data:any)=>{
            console.log('error data----',data);
            return data
        });
    }

  }
  export default ShellScript
  
