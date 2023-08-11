  const handler = async (req, res) => {
    console.log("outit")

    if (req.method === "POST") {
      // Code here
      console.log("sinit")
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
  
  export default handler;