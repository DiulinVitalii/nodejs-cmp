import { database } from '../models/user.model.js';
import { HTTP_STATUS, PATHS } from '../utils/utils.js';

export class UserController {
  req = null;
  res = null;

  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  createUser() {
    this.#readRequestBody((err, data) => {
      if (err) {
        this.#errorHandler(err);
      }

      database.createUser((err) => {
        if (err) {
          this.#errorHandler(err);
        }
        this.res.statusCode = HTTP_STATUS.CREATED;
        this.res.end();

      }, data);
    });
  }

  deleteUser(id) {
    database.deleteUser((err) => {
      if (err) {
        this.#errorHandler(err);
      }

      this.res.statusCode = HTTP_STATUS.NO_CONTENT;
      this.res.end();
    }, id);
  }

  patchUser(id) {
    this.#readRequestBody((err, data) => {
      if (err) {
        this.#errorHandler(err);
      }

      database.patchUser((err) => {
        if (err) {
          this.#errorHandler(err);
        }
        this.res.statusCode = HTTP_STATUS.NO_CONTENT;
        this.res.end();
      }, id, data);
    });
  }

  getUser(id) {
    database.getUser((err, data) => {
      if (err) {
        this.#errorHandler(err);
      }

      const responseData = this.#addHobbyLinks(data);

      this.res.writeHead(HTTP_STATUS.OK, {'Content-Type': 'application/json'});
      this.res.end(JSON.stringify(responseData));
    }, id);
  }

  getUsers() {
    database.getUsers((err, data) => {
      if (err) {
        this.#errorHandler(err);
      }

      const responseData = this.#addHobbyLinks(data);

      this.res.writeHead(HTTP_STATUS.OK, {'Content-Type': 'application/json'});
      this.res.end(JSON.stringify(responseData));
    });
  }

  addHobby(id) {
    this.#readRequestBody((err, data) => {
      if (err) {
        this.#errorHandler(err);
      }

      database.addHobby((err) => {
        if (err) {
          this.#errorHandler(err);
        }

        this.res.statusCode = HTTP_STATUS.CREATED;
        this.res.end();
      }, id, data);
    });
  }

  deleteHobby(id, hobby) {
    database.deleteHobby((err, data) => {
      if (err) {
        this.#errorHandler(err);
      }

      this.res.statusCode = HTTP_STATUS.NO_CONTENT;
      this.res.end();
    }, id, hobby);
  }

  getHobbies(id) {
    database.getHobbies((err, data) => {
      if (err) {
        this.#errorHandler(err);
      }

      this.res.setHeader('Cache-Control', 'public, max-age=3600');
      this.res.writeHead(HTTP_STATUS.OK, {'Content-Type': 'application/json'});
      this.res.end(JSON.stringify(data));
    }, id);
  }

  #addHobbyLinks(data) {
    const host = this.req.headers.host;

    if (Array.isArray(data)) {
      return data.map(u => ({ ...u, links: [{ rel: PATHS.hobbies, href: `http://${host}/users/${u.id}/hobbies` }]  }) );
    }

    data.links = [{ rel: PATHS.hobbies, href: `http://${host}/users/${data.id}/hobbies` }];

    return data;
  }

  #readRequestBody(cb) {
    let data = '';
    this.req.on('data', (chunk) => {
      data += chunk;
    });
    this.req.on('end', () => {
      try {
        cb(null, JSON.parse(data));
      } catch (err) {
        err.code = HTTP_STATUS.BAD_REQUEST;
        cb(err);
      }
    });
  }

  #errorHandler = (err) => {
    console.error('Error:', err);
    this.res.writeHead(err.code || HTTP_STATUS.BAD_REQUEST, { 'Content-Type': 'text/plain' });
    this.res.end(err.message);
  }
}
