function sol(data){
    if(!['GET', 'POST', 'DELETE', 'CONNECT'].includes(data.method)){
        throw new Error(`Invalid request header: Invalid Method`);
    }
    if(!/^[a-z|\d\.]+$|\*/g.test(data.uri) || data.uri === undefined){
        throw new Error(`Invalid request header: Invalid URI`);
    }
    if(!['HTTP/0.9','HTTP/1.0','HTTP/1.1','HTTP/2.0'].includes(data.version)){
        throw new Error(`Invalid request header: Invalid Version`);
    }
    if(/[<>\\&\'\"]/g.test(data.message) || data.message === undefined){
        throw new Error(`Invalid request header: Invalid Message`);
    }

    return data;
}

console.log(sol({
    method: 'GET',
    uri: '*',
    version: 'HTTP/1.1',
    message: 'adfsas\"dfaf'
  }))