const fastify = require('fastify'); //Bring in Fastify
//const PORT = process.env.PORT || 1000;
const fs = require("fs");
const { request } = require('http');
const app = fastify({
  logger: true
})
var studentsdata;
// Declare a route
app.get('/', function (request, reply) {
  reply.send("Our first route")
})

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})
const dataPath = "./users.json"

///Get All Records
app.get("/api/users/Get", (request, reply) => {
  fs.readFile("./users.json", "utf8", (err, studentsdata) => {
    if (err) {

      reply.send("File read failed:", err)

    }
    reply.send(studentsdata)
    //console.log("File data:", jsonString);
  })
})
///Add Student
app.post("/api/users/Add", async (request, reply) => {
  fs.readFile("./users.json", "utf8", (err, jsonString) => {
    if (err) {
      reply.send("File read failed:", err)
    }
    studentsdata = JSON.parse(jsonString);
    studentsdata['Students'][request.body.StudentName] = {
      "StudentId": request.body.StudentId,
      "Subject1": request.body.Subject1,
      "Subject2": request.body.Subject2,
      "Subject3": request.body.Subject3,
      "Subject4": request.body.Subject4,
      "Subject5": request.body.Subject5
    }
    //console.log("File data:", studentsdata);
    fs.writeFile("./users.json", JSON.stringify(studentsdata), function (err) {
      if (err) throw err;
      reply.send('Student Added Succesfully!');

    });
  })
})
///Update Student
app.post("/api/users/Update", async (request, reply) => {
  fs.readFile("./users.json", "utf8", (err, jsonString) => {
    if (err) {
      reply.send("File read failed:", err)
    }
    studentsdata = JSON.parse(jsonString);
    studentsdata['Students'][request.body.StudentName] = {
      "Subject1": request.body.Subject1,
      "Subject2": request.body.Subject2,
      "Subject3": request.body.Subject3,
      "Subject4": request.body.Subject4,
      "Subject5": request.body.Subject5
    }
    //console.log("File data:", studentsdata);
    fs.writeFile("./users.json", JSON.stringify(studentsdata), function (err) {
      if (err) throw err;
      reply.send('Student Added Succesfully!');

    });
  })
})
/// Delete Student
app.delete("/api/users/Delete/:StudentId", async (request, reply) => {
  fs.readFile("./users.json", "utf8", (err, jsonString) => {
    if (err) {
      reply.send("File read failed:", err)
    }
    const userId = request.params['StudentId'];
    studentsdata = JSON.parse(jsonString);  
    delete studentsdata.Students[userId]
    fs.writeFile("./users.json", JSON.stringify(studentsdata), function (err) {
      if (err) throw err;
      reply.send('Student Deleted Succesfully!');

    });
})
})
