class Request {
    constructor(method, uri, version, message){
        Object.assign(this, {method, uri, version, message})
        this.response = undefined;
        this.fulfilled = false;
    }
}