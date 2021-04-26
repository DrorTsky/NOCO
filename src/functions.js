export function convertUnixTimeStamp(stamp) {
  let t = new Date(parseInt(stamp) * 1000);
  // let date = t.format("dd.mm.yyyy hh:MM:ss");
  let minutes =
    parseInt(t.getMinutes()) < 10 ? "0" + t.getMinutes() : t.getMinutes();
  return (
    t.getDate() +
    "/" +
    t.getMonth() +
    "/" +
    t.getFullYear() +
    " " +
    t.getHours() +
    ":" +
    minutes
  );
}
