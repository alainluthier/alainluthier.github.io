export function getJSON(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        //console.log(response.json());
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function postJSON(url, data) {
  console.log(data);
  console.log(JSON.stringify(data));
  return fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)})
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        //console.log(response.json());
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}