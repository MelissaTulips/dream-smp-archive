import { mount } from '@vue/test-utils';
import UserLoginPage from '@/views/UserLoginPage.vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('UserLoginPage.vue', () => {
  it('logs in the user and fetches user data', async () => {
    const mockSignIn = jest.fn();
    signInWithEmailAndPassword.mockImplementation(mockSignIn);

    const mockGetDoc = jest.fn();
    getDoc.mockImplementation(mockGetDoc);

    const wrapper = mount(UserLoginPage);

    await wrapper.setData({ email: 'shadow@gmail.com', password: 'password123' });

    // Simulate form submission
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockSignIn).toHaveBeenCalledWith(expect.any(Object), 'shadow@gmail.com', 'password123');
    expect(mockGetDoc).toHaveBeenCalledWith(expect.anything());
    expect(wrapper.text()).toContain('Welcome');
  });
});
