import * as http from "http";
module Server {
  const hostname: string = "127.0.0.1"; // localhost
  const port: number = 3000;

  const monthStrings = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const server: http.Server = http.createServer(
    (request: http.IncomingMessage, response: http.ServerResponse) => {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
      let url: URL = new URL(
        request.url || "",
        `http://${request.headers.host}`
      );
      routing(response, url);
      response.end();
    }
  );

  function routing(response: http.ServerResponse, url: URL): void {
    let dateString: string;
    switch (url.pathname) {
      case "/":
        response.write("Hello World");
        break;
      case "/dateConverter":
        dateString = convertDate(url.searchParams.get("date"));
        response.write(dateString);
        break;
      case "/countDays":
        let days: string = countDays(url.searchParams.get("date"));
        response.write(days);
        break;
      default:
        response.statusCode = 404;
    }
  }

  function countDays(dateString: string): string {
    let date: Date = new Date(dateString);
    let currentDate: Date = new Date();

    let differenz: number = date.getTime() - currentDate.getTime();
    let days: number = Math.round(Math.abs(differenz / 1000 / 60 / 60 / 24));
    if (differenz < 0) {
      return `${days} Days in the past`;
    }
    return `${days} Days still to go`;

  }

  function convertDate(dateString: string): string {
    let date: Date = new Date(dateString);
    return `Month: ${monthStrings[date.getMonth()]
      }, Day: ${date.getDate()}, Year: ${date.getFullYear()}`;
  }

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}
