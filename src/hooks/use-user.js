import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserObjByUserId(userId) {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}

export const getUserProfile = (uid) => {
  let promise = new Promise(function (resolve, reject) {
    db.collection('userProfile')
      .doc(uid)
      .get()
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const updateProfile = (uid, data) => {
  let promise = new Promise(function (resolve, reject) {
    db.collection('userProfile')
      .doc(uid)
      .update(data)
      .then(() => {
        resolve('Profile updated successfully');
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const getAllUsers = () => {
  let promise = new Promise(function (resolve, reject) {
    db.collection('userProfile')
      .get()
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};
