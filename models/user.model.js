import { HTTP_STATUS } from '../utils/utils.js';

class UserModel {
  users = [
    {
      id: 1,
      name: 'Ann',
      email: 'ann@google.com',
      hobbies: ['books', 'sport', 'dancing'],
    },
    {
      id: 2,
      name: 'Ben',
      email: 'ben@google.com',
      hobbies: ['series', 'sport'],
    },
  ];

  createUser(cb, user) {
    try {
      const uniqId = Math.round(Math.random() * 1000);
      this.users.push({ ...user, id: uniqId });
      cb(null);
    } catch (err) {
      err.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      cb(err);
    }
  }

  deleteUser(cb, id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      const error = new Error('Not Found');
      error.code = HTTP_STATUS.NOT_FOUND;
      cb(error);
    } else {
      this.users.splice(index, 1);
      cb(null);
    }
  }

  patchUser(cb, id, data) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      const error = new Error('Not Found');
      error.code = HTTP_STATUS.NOT_FOUND;
      cb(error);
    } else {
      const { id, ...user } = data;
      const patchedUser = { ...this.users[index], ...user};
      this.users.splice(index, 1, patchedUser);
      cb(null);
    }
  };

  getUser(cb, id) {
    try {
      const user = this.users.find(u => u.id === id);
      if (user) {
        delete user.hobbies;
        cb(null, user);
      } else {
        const error = new Error('Not Found');
        error.code = HTTP_STATUS.NOT_FOUND;
        cb(error);
      }
    } catch (err) {
      err.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      cb(err);
    }
  }

  getUsers(cb) {
    try {
      const users = this.users.map(({hobbies, ...user}) => user);
      cb(null, users);
    } catch (err) {
      err.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      cb(err);
    }
  }

  addHobby(cb, id, data) {
    try {
      const index = this.users.findIndex(u => u.id === id);
      if (index !== -1) {
        this.users[index].hobbies.push(data.hobby);
        cb(null);
      } else {
        const error = new Error('Not Found');
        error.code = HTTP_STATUS.NOT_FOUND;
        cb(error);
      }
    } catch (err) {
      err.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      cb(err);
    }
  }

  deleteHobby(cb, id, hobby) {
    try {
      const userIndex = this.users.findIndex(u => u.id === id);
      const hobbyIndex = this.users[userIndex]?.hobbies?.findIndex(h => h === hobby);
      if (userIndex !== -1 && hobbyIndex !== -1) {
        this.users[userIndex].hobbies.splice(hobbyIndex, 1);
        cb(null);
      } else {
        const error = new Error('Not Found');
        error.code = HTTP_STATUS.NOT_FOUND;
        cb(error);
      }
    } catch (err) {
      err.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      cb(err);
    }
  }

  getHobbies(cb, id) {
    try {
      const index = this.users.findIndex(u => u.id === id);
      if (index !== -1) {
        const hobbies = this.users[index].hobbies;
        cb(null, hobbies);
      } else {
        const error = new Error('Not Found');
        error.code = HTTP_STATUS.NOT_FOUND;
        cb(error);
      }
    } catch (err) {
      err.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      cb(err);
    }
  }

  static getInstance() {
    if (!UserModel.instance) {
      UserModel.instance = new UserModel();
    }

    return UserModel.instance;
  }
}

export const database = UserModel.getInstance();

