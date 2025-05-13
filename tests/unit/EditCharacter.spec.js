import { mount } from '@vue/test-utils';
import EditCharacterPage from '@/views/EditCharacterPage.vue';
import { updateDoc, doc } from 'firebase/firestore';

jest.mock('firebase/firestore');

describe('EditCharacterPage.vue', () => {
  it('updates character details', async () => {
    const mockUpdateDoc = jest.fn();
    updateDoc.mockImplementation(mockUpdateDoc);

    // Mock initial character data
    const characterData = {
      id: '1',
      name: 'Old Name',
      description: 'Old Description',
      imageUrl: 'oldimage.jpg',
    };

    // Mount the component
    const wrapper = mount(EditCharacterPage, {
      data() {
        return {
          character: characterData,
        };
      },
    });

    // Modify character data
    await wrapper.setData({
      character: { ...characterData, name: 'New Name', description: 'New Description' },
    });

    // Simulate form submission
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockUpdateDoc).toHaveBeenCalledWith(expect.anything(), {
      name: 'New Name',
      description: 'New Description',
      imageUrl: 'oldimage.jpg',
    });
  });
});
