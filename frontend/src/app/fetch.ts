export const apiCall: (
  url: string,
  method: string,
  credentials?: RequestCredentials,
  body?: object
) => any = async (url, method, credentials = 'same-origin', body) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: credentials,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    return error;
  }
};

//interface FirstParam { link: string, link2: number }

export default apiCall;
