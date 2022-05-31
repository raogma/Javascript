export async function sendRequest(url, method, bodyData) {
    let options = {};
    if (method === 'post') {
        options = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        };
    }
    try {
        let response = await fetch(url, options);
        if (response.status !== 200) throw new Error(response.message);
        let data = await response.json();
    } catch (e) {
        alert(e.message);
    }
}