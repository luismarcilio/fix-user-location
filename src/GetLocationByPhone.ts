import axios from "axios";
import { load } from "cheerio";
import FormData = require("form-data");

interface Address {
  city?: string,
  country?: string,
  state?: string
}

interface Props {
  phoneNumber: string;
}
export async function GetLocationByPhone({
  phoneNumber,
}: Props): Promise<Address> {
  const form = new FormData();
  form.append("phone_number", phoneNumber);

  const response = await axios.post(
    "https://www.comfi.com/abook/reverse",
    form,
    { headers: form.getHeaders() }
  );
  if (response.status !== 200) {
    throw Error(`Axios error: ${response.status}: ${response.statusText}`);
  }
  const $ = load(response.data);
  const country = $(
    "#main > table > tbody > tr:nth-child(2) > td:nth-child(2) > a"
  ).text();
  const [city, state] = $(
    "#main > table > tbody > tr:nth-child(3) > td:nth-child(2) > a"
  )
    .text()
    .split(",")
    .map((item) => item.trim());

  const address:Address = {}
  if(country&&country.length > 0) {
    address.country = country;
  }
  if(state&&state.length > 0) {
    address.state = state;
  }

  if(city&&city.length > 0) {
    address.city = city;
  }
  return address;
}
