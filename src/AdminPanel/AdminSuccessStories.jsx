import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AdminSuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  useEffect(() => {
    fetch('https://metrimony-server-ten.vercel.app/success-stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(console.error);
  }, []);

  const openModal = story => {
    setCurrentStory(story);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentStory(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Success Stories</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Male Biodata ID</th>
            <th className="border px-4 py-2">Female Biodata ID</th>
            <th className="border px-4 py-2">View Story</th>
          </tr>
        </thead>
        <tbody>
          {stories.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No success stories found.
              </td>
            </tr>
          )}
          {stories.map(story => (
            <tr key={story._id} className="text-center">
              <td className="border px-4 py-2">{story.selfBiodataId}</td>
              <td className="border px-4 py-2">{story.partnerBiodataId}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => openModal(story)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View Story
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Success Story Modal"
        className="max-w-lg mx-auto mt-24 bg-white p-6 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-xl font-bold mb-4">Success Story</h3>
        {currentStory && (
          <>
            <img
              src={currentStory.image}
              alt="Couple"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p className="mb-4">
              <strong>Biodata IDs:</strong> {currentStory.selfBiodataId} &{' '}
              {currentStory.partnerBiodataId}
            </p>
            <p className="italic text-gray-700">"{currentStory.review}"</p>
          </>
        )}
        <button
          onClick={closeModal}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default AdminSuccessStories;
