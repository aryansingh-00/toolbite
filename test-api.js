async function test() {
  try {
    const res = await fetch('http://localhost:5173/api/session');
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("BODY:", text);
  } catch(e) {
    console.log("FETCH ERROR:", e.message);
  }
}
test();
