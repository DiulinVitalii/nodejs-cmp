import http from 'http';
import { HTTP_METHODS, HTTP_STATUS, PATHS } from './utils/utils.js';
import { UserController } from './controllers/user.controller.js';

const server = http.createServer((req, res) => {
  const userController = new UserController(req, res);
  const { method, url } = req;
  const paths = url.split('/').filter(p => !!p);
  const userId = +paths[1];
  const hobby = paths[3];

  if (method === HTTP_METHODS.POST && paths[0] === PATHS.users && paths.length === 1) { // /users
    userController.createUser();
  } else if (method === HTTP_METHODS.DELETE && paths[0] === PATHS.users && paths.length === 2) { // /users/:id
    userController.deleteUser(userId);
  } else if (method === HTTP_METHODS.PATCH && paths[0] === PATHS.users && paths.length === 2) { // /users/:id
    userController.patchUser(userId);
  } else if (method === HTTP_METHODS.GET && paths[0] === PATHS.users && paths.length === 2) { // /users/:id
    userController.getUser(userId);
  } else if (method === HTTP_METHODS.GET && paths[0] === PATHS.users && paths.length === 1) { // /users
    userController.getUsers();
  } else if (method === HTTP_METHODS.POST && paths[0] === PATHS.users && paths[2] === PATHS.hobbies && paths.length === 3) { // /users/:id/hobbies
    userController.addHobby(userId);
  } else if (method === HTTP_METHODS.DELETE && paths[0] === PATHS.users && paths[2] === PATHS.hobbies && paths.length === 4) { // /users/:id/hobbies/:hobby
    userController.deleteHobby(userId, hobby);
  } else if (method === HTTP_METHODS.GET && paths[0] === PATHS.users && paths[2] === PATHS.hobbies && paths.length === 3) { // /users/:id/hobbies
    userController.getHobbies(userId);
  } else {
    res.writeHead(HTTP_STATUS.NOT_FOUND, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});


server.listen('3002', () => {
  console.log(`Server is running on port ${server.address().port}`);
});

