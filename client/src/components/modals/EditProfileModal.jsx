import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilLine } from "lucide-react";
import Button from "components/common/BUtton";
import Input from "components/common/Input";
import Modal from "components/common/Modal";
import AvatarUploadForm from "components/form/AvatarUploadForm";
import Error from "components/common/Error";
import { editProfileAction } from "reduxStore/actions/authActions";

const EditProfileModal = ({ user, open, close }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (name.length < 3) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("avatar", avatar);

    await dispatch(editProfileAction(formData));
    setLoading(false);
  };

  if (!user) {
    return;
  }
  return (
    <Modal disabled={loading} open={open} onClose={close}>
      <div className="max-w-screen w-full p-3 md:max-w-md">
        <form
          onSubmit={onSubmit}
          className="h-full flex flex-col justify-between items-center gap-4 max-md:pb-12"
        >
          <h1 className="text-2xl text-white text-center font-bold">
            Edit profile
          </h1>
          {errorMessage && <Error error={errorMessage} />}
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <AvatarUploadForm avatar={avatar} setAvatar={setAvatar} />
            <div className="w-full flex justify-between items-center gap-4">
              <Input
                placeholder="Name..."
                value={name}
                onChange={setName(e.target.value)}
              />
              <PencilLine color="rgb(255 255 255 / 0.1)" />
            </div>
            <div className="w-full flex justify-between items-center gap-4">
              <Input
                placeholder="Bio.."
                value={bio}
                onChange={setBio(e.target.value)}
              />
              <PencilLine color="rgb(255 255 255 / 0.1)" />
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
