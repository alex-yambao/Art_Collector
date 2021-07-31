export const BASE_URL = "https://api.harvardartmuseums.org";
export const KEY = "apikey=d09e44c6-3404-41fc-8716-cab1bc77f210";

export async function fetchQueryResultsFromTermAndValue(term, value) {
  try {
    const response = await fetch(
      `${BASE_URL}/object?${KEY}&${term}=${encodeURI(
        value.split("-").join("|")
      )}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchQueryResultsFromURL(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchQueryResults({
  century,
  classification,
  queryString,
}) {
  const url = `${BASE_URL}/object?${KEY}&classification=${classification}&century=${century}&keyword=${queryString}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllCenturies() {
  if (localStorage.getItem("centuries")) {
    return JSON.parse(localStorage.getItem("centuries"));
  }

  const url = `${BASE_URL}/century?${KEY}&size=100&sort=temporalorder`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const records = data.records;

    localStorage.setItem("centuries", JSON.stringify(records));

    return records;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllClassifications() {
  if (localStorage.getItem("classifications")) {
    return JSON.parse(localStorage.getItem("classifications"));
  }

  const url = `${BASE_URL}/classification?${KEY}&size=100&sort=name`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const records = data.records;

    localStorage.setItem("classifications", JSON.stringify(records));

    return records;
  } catch (error) {
    throw error;
  }
}
