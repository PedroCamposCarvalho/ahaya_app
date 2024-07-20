import api from '../../services/api';

export async function findBySsn(ssn: string): Promise<boolean | undefined> {
  try {
    const response = await api.get(`/users/findBySsn?ssn=${ssn}`, {
      timeout: 10000,
    });

    if (response.data.id) {
      return true;
    }
    return false;
  } catch (error) {
    return undefined;
  }
}

export async function findByEmail(email: string): Promise<boolean | undefined> {
  try {
    const response = await api.get(`/users/findByEmail?email=${email}`, {
      timeout: 10000,
    });

    if (response.data.id) {
      return true;
    }
    return false;
  } catch (error) {
    return undefined;
  }
}
