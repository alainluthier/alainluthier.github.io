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
export function deleteJSON(url, id) {
  return fetch(url+'/'+id,{
    method: 'DELETE'})
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function putJSON(url, data) {
  return fetch(url+"/"+data.id,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)})
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}