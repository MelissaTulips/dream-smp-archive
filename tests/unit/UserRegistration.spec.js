import { mount } from '@vue/test-utils';
import UserRegistrationPage from '@/views/UserRegistrationPage.vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('UserRegistrationPage.vue', () => {
  it('registers user and assigns a role', async () => {
    const mockCreateUser = jest.fn();
    createUserWithEmailAndPassword.mockImplementation(mockCreateUser);

    const mockSetDoc = jest.fn();
    setDoc.mockImplementation(mockSetDoc);

    const wrapper = mount(UserRegistrationPage);

    // Simulate user input
    await wrapper.setData({ email: 'shadow@gmail.com', username: 'edgar', password: 'password123' });

    // Simulate form submission
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockCreateUser).toHaveBeenCalledWith(expect.any(Object), 'shadow@gmail.com', 'password123');
    expect(mockSetDoc).toHaveBeenCalledWith(expect.anything(), {
      email: 'shadow@gmail.com',
      username: 'edgar',
      role: 'user', // Expect "user" role for regular email
    });

    // Check if the correct role is assigned for an admin
    const adminEmail = 'm.melisa@gmail.com';
    const adminRole = adminEmail === 'm.melisa@gmail.com' ? 'admin' : 'user';
    expect(mockSetDoc).toHaveBeenCalledWith(expect.anything(), {
      email: adminEmail,
      username: 'edgar',
      role: adminRole,
    });
  });
});
