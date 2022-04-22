import { GetLocationByPhone } from "./GetLocationByPhone";
import Pool from "./Pool";

async function fixAddresses() {
  const connection = await Pool.connect();
  const selectUsers = `SELECT
                id,
                phone_number
              FROM
                users
              WHERE
                phone_number IS NOT NULL
                AND phone_number <> ''
                AND address_id IS NULL`;
  const insertAddress =
    "insert into addresses (country, state, city) values ($1, $2, $3) returning *";
  const updateUsers =
    "update users set address_id = $1 where id = $2 returning *";

  const { rows } = await connection.query(selectUsers);
  connection.release();
  rows.forEach(async (row) => {
    const address = await GetLocationByPhone({ phoneNumber: row.phone_number });
    if (address.city && address.state && address.country) {
      const addressValues = [address.country, address.state, address.city];
      const loopConnection = await Pool.connect();
      const { rows: insertedAddress } = await loopConnection.query(
        insertAddress,
        addressValues
      );
      const updateValues = [insertedAddress[0].id, row.id];
      const { rows: updatedUsers } = await loopConnection.query(
        updateUsers,
        updateValues
      );
      console.log("update user: ", updatedUsers[0]);
      loopConnection.release();
    }
  });
}
fixAddresses().then(() => console.log("finished"));